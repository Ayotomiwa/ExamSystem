import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {Box, Button, Typography, Zoom} from "@mui/material";
import {Description, Edit, ListAlt, Pause, PlayArrow, Replay, Save} from "@mui/icons-material";
import CdTimer from "../../components/CdTimer";
import ExamForm from "./ExamForm";
import Notes from "../../components/Notes";
import SideBar from "../../components/SideBar";
import ExamInfo from "./ExamInfo";
import useFullScreen from "../../hooks/useFullScreen";
import {Link} from "react-router-dom";
import "./TimerPage.css"
import ConfirmModal from "../../components/ConfirmModal";


dayjs.extend(duration);
dayjs.extend(localizedFormat);


const TimerPage = ({form, setForm, timerMode, setTimerMode, tempForm, setTempForm}) => {

    const [showLogs, setShowLogs] = useState(false);
    const [sHour, sMinute] = form.startTime.split(":").map(Number);
    const [eHour, eMinute] = form.endTime.split(":").map(Number);
    const startTime = dayjs().set("hour", sHour).set("minute", sMinute)
    const endTime = dayjs().set("hour", eHour).set("minute", eMinute);
    const [showForm, setShowForm] = useState(true);
    const [showButtons, setShowButtons] = useState(false);
    const [play, setPlay] = useState(true);
    const [showRules, setShowRules] = useState(false);
    const [totalPausedDuration, setTotalPausedDuration] = useState(dayjs.duration(0));
    const [lastPauseTime, setLastPauseTime] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isFullScreen, toggleFullScreen] = useFullScreen();
    const fullScreenContainerRef = useRef(null);
    const [adjustedEndTime, setAdjustedEndTime] = useState(endTime);
    const [adjustedStartTime, setAdjustedStartTime] = useState(startTime);
    const [isRotated, setIsRotated] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [examLogsSaved, setExamLogsSaved] = useState(false);
    const [pauseStartTime, setPauseStartTime] = useState(null);
    const [showSideBar, setShowSideBar] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const[databaseModalOpen, setDatabaseModalOpen] = useState(false);
    const [modalStage, setModalStage] = useState(0);
    const [startTimeUpdated, setStartTimeUpdated] = useState(false);
    const [endTimeUpdated, setEndTimeUpdated] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);


    useEffect(() => {
        setAdjustedEndTime(endTime);
        setAdjustedStartTime(startTime);
        console.log("useEffect + Timer page 1");
    }, [form.startTime, form.durationHrs, form.durationMins, isStarted]);


    useEffect(() => {
        console.log("useEffect + Timer page 2");
        setForm({...form, endTime: adjustedEndTime.format("HH:mm")});
    }, [form.endTime]);


    function handleSaveToDatabase() {
        if (!isStarted || !timeUp) {
            console.log("Exam not started or not ended")
            return;
        }
        setModalOpen(true);
    }

    function saveToDatabase() {

        const actualDuration = dayjs.duration(adjustedEndTime.diff(startTime));
        const actualDurationFormatted = `${Math.floor(actualDuration.asHours())}:${actualDuration.minutes().toString().padStart(2, '0')}`;


        console.log(form.startTime);
        console.log(form.endTime);

        fetch(`https://lsbu-ex-timer.herokuapp.com/api/exam-logs/create`, {
        //     fetch(`http://localhost:8080/api/exam-logs/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                startTime: form.startTime,
                endTime: form.endTime,
                /*actualDuration: actualDurationFormatted,*/
                // pausedTime: pausedDurationFormatted,
                venue: form.venue,
                // submittedDate: dayjs().format("YYYY-MM-DD"),
                studentsNo: form.noOfStudents,
                message: form.notes.map((note) => note.text).join('\n'),
                moduleName: form.moduleName,
                moduleCode: form.moduleCode,
            }),
        })
            .then((res) => {
                if(res.ok) {
                    setSaveMessage("Exam saved successfully");
                    resetTimerPage();
                }
                else{
                    setSaveMessage("An error occurred while saving the exam. Please try again.");
                    throw new Error(`Server error: ${res.status}`);
                }
                return res.json()
            })
            .catch((err) => {
                console.error(err);
                setSaveMessage("An error occurred while saving the exam. Please try again.");
            });
    }

    function handleSaveModalYes() {
        console.log("Modal stage YES: " + modalStage)
        if (modalStage === 0) {
            setModalOpen(false);
            setShowLogs(true);
            setModalStage((prevState) => prevState + 1);
        } else if (modalStage === 1) {
            setModalOpen(false);
            saveToDatabase();
            setDatabaseModalOpen(true);
            setModalStage(0);
        }
    }

    function handleSaveModalNo() {
        console.log("Modal stage: NO" + modalStage)
        if (modalStage === 0) {
            setModalStage((prevState) => prevState + 1);
            setModalOpen(true);
        } else if (modalStage === 1) {
            setModalOpen(false);
            setModalStage(0);
        }
    }


    const handleCancel = () => {
        setShowSideBar(false);
        closeSideBar()
    };


    const closeSideBar = () => {
        setShowForm(false);
        setShowLogs(false);
        setShowRules(false);
    }


    function handleTimerButtons(event) {
        if (event.currentTarget.id === "Logs") {
            if (showForm) {
                setShowForm(false);
            }
            if (showRules) {
                setShowRules(false);
            }
            setShowLogs(!showLogs);
        } else if (event.currentTarget.id === "Edit Form") {
            if (showLogs) {
                setShowLogs(false);
            }
            if (showRules) {
                setShowRules(false);
            }
            setShowForm(!showForm);
        } else if (event.currentTarget.id === "Rules") {
            if (showLogs) {
                setShowLogs(false);
            } else if (showForm) {
                setShowForm(false);
            }
            setShowRules(!showRules);
        }

    }


    function togglePause() {
        if (dayjs().isBefore(startTime)) {
            return;
        }
        setPlay(!play);
        if (play) {
            setForm({
                ...form,
                endTime: adjustedEndTime.format("HH:mm")
            });
        }
    }


    function resetTimerPage() {
        setForm({
            moduleName: "N/A",
            moduleCode: "N/A",
            venue: "",
            noOfStudents: "",
            examType: "NORMAL",
            startTime: "",
            endTime: "",
            durationHrs: "",
            durationMins: "",
            notes: [],
            restrictedMinutes: "30",
        });
        setTempForm({
            startTime: "",
            durationHrs: "",
            durationMins: "",
            restrictedMinutes: "30"
        })
        setIsStarted(false);
        setPlay(true);
        setLastPauseTime(null);
        setTotalPausedDuration(dayjs.duration(0));
    }

    const handleMouseDown = () => {
        setIsRotated(true);
    };

    const handleMouseUp = () => {
        setIsRotated(false);
    };


    const fullScreenContainerStyle = {
        minHeight: "100vh",
        backgroundColor: isFullScreen ? "white" : "",
    };


    return (
        <div ref={fullScreenContainerRef} style={fullScreenContainerStyle}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                minHeight: "100vh",
            }}>
                <Box sx={{display: "flex", flexDirection: "column", flex: 1}}>
                    <Box sx={{p: 3}}>
                        <Typography className="moduleName" variant="h4" sx={{fontWeight:"bold"}} >
                            Module Name: {form.moduleName}
                        </Typography>
                        <Typography className="moduleCode" variant="h4" sx={{fontWeight:"bold"}}>
                            Module Code: {form.moduleCode}
                        </Typography>
                    </Box>
                    <Box sx={{display:"grid", placeItems:"center", minHeight:"120px", flex:1, p:"16px", overflowWrap: "break-word"}}>
                        <ExamInfo startTime={startTime} endTime={adjustedEndTime}
                                  restrictedMinutes={form.restrictedMinutes} isPaused={!play}/>
                    </Box>
                    <Box sx={{display: "grid", placeItems: "center", ml: "10px", height: "100%"}}>
                        <Box
                            sx={{
                                mt: "30px",
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "white",
                                border: "10px solid black",
                                p: "30px",
                                pb: "0px",
                                pt: "0px",
                                borderRadius: "25px"
                            }}
                        >
                            <CdTimer startTime={adjustedStartTime}
                                     endTime={adjustedEndTime}
                                     setAdjustedEndTime={setAdjustedEndTime}
                                     isPaused={!play}
                                     isStarted={isStarted}
                                     setTimeUp={setTimeUp}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: "10px",
                                gap: 3,
                                // border: "1px solid #e75480"
                            }}
                        >

                            <Button
                                variant="contained"
                                onClick={() => resetTimerPage()}
                                style={{color: "green", borderColor: "white", backgroundColor:"white", height: "36px"}}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                            >
                                <Replay
                                    style={{
                                        transition: 'transform 0.3s ease-in-out',
                                        transform: `rotate(${isRotated ? '-360deg' : '0'})`,
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transformOrigin: 'center',
                                        margin: '-12px 0 0 -12px',
                                    }}
                                />

                            </Button>
                            <Button
                                // variant={play ? "outlined" : "contained"}
                                variant="contained"
                                onClick={() => togglePause()}
                                style={{
                                    color: play ? "#584595" : "white",
                                    borderColor: "white",
                                    backgroundColor: play ? "white" : "#584595"
                                }}
                            >
                                {play ? <Pause/> : <PlayArrow/>}

                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleSaveToDatabase()}
                                style={{
                                    color: "black",
                                    borderColor: "black",
                                    backgroundColor: "white"
                                }}
                            >
                                <Save/>

                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setShowButtons(!showButtons)}
                                style={{
                                    color: showButtons ? "white" : "#e75480",
                                    borderColor: "white",
                                    backgroundColor: showButtons ? "#e75480" : "white"
                                }}
                            >
                                <Edit/>
                                {/*Edit*/}
                            </Button>
                        </Box>
                        <Zoom in={showButtons}>
                            <Box sx={{
                                position: 'static',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                mt: "10px",
                                gap: 3,
                            }}>

                                <Button
                                    variant={showRules ? "contained" : "outlined"}
                                    style={{
                                        color: showRules ? "white" : "#e75480",
                                        borderColor: "#e75480",
                                        backgroundColor: showRules ? "#e75480" : "transparent"
                                    }}
                                    startIcon={<ListAlt/>}
                                    onClick={() => setShowRules(!showRules)}
                                >
                                    Rules
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{
                                        color: showLogs ? "white" : "#e75480",
                                        borderColor: "#e75480",
                                        backgroundColor: showLogs ? "#e75480" : "transparent"
                                    }}
                                    startIcon={<Description/>}
                                    onClick={(event) => handleTimerButtons(event)}
                                    id="Logs">
                                    Logs
                                </Button>
                                <Button
                                    variant="outlined"
                                    style={{
                                        color: showForm ? "white" : "#e75480",
                                        borderColor: "#e75480",
                                        backgroundColor: showForm ? "#e75480" : "transparent"
                                    }}
                                    startIcon={<Edit/>}
                                    onClick={(event) => handleTimerButtons(event)}
                                    id="Edit Form"
                                >
                                    Form
                                </Button>
                            </Box>
                        </Zoom>
                        <Box sx={{
                            mt: "50px",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'content',
                            // border: "1px solid blue",
                            alignItems: 'center',
                        }}>
                            <Typography variant="h4">
                                Start Time:<strong>{startTime.format("HH:mm")}</strong>
                            </Typography>

                            <Typography variant="h4" sx={{ml: "100px"}}>
                                End Time:<strong>{adjustedEndTime.format("HH:mm")}</strong>
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Link
                            component="button"
                            variant="body1"
                            underline="hover"
                            color="primary"
                            onClick={() => toggleFullScreen(fullScreenContainerRef.current)}
                        >
                            {isFullScreen ? 'Exit Super Screen' : 'Super Screen'}
                        </Link>
                        <Link
                            component="button"
                            variant="body1"
                            underline="hover"
                            color="primary"
                            onClick={() => setTimerMode((prev) => !prev)}
                        >
                            {isFullScreen ? "" : (timerMode ? 'Timer Mode' : 'Exit Timer Mode')}
                        </Link>
                    </Box>
                </Box>
                {showForm && (
                    <SideBar onCancel={handleCancel} name="Form">
                        <ExamForm form={form}
                                  setForm={setForm}
                                  setShowForm={setShowForm}
                                  setShowRules={setShowRules}
                                  setIsStarted={setIsStarted}
                                  tempForm={tempForm}
                                  setTempForm={setTempForm}

                        />
                    </SideBar>)}

                {showLogs && (
                    <SideBar onCancel={handleCancel} name="Logs">
                        <Notes form={form} setForm={setForm}/>
                    </SideBar>)}
                {showRules && (
                    <SideBar onCancel={handleCancel} name="Rules & Regulations">
                        <Notes form={form} setForm={setForm}/>
                    </SideBar>)}
            </Box>
            <ConfirmModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleYes={handleSaveModalYes}
                handleNo={handleSaveModalNo}
                title={modalStage === 0 ? 'Input Logs' : 'Save Exam?'}
                content={
                    modalStage === 0
                    ? 'Before you save, do you want to add logs?'
                    : `Save "${form.moduleName}" exam to the database? \n
                       The Exam Timer will be cleared \n`
                }
                showYesAndNo={true}
            />
            <ConfirmModal
                open={databaseModalOpen}
                handleClose={() => setDatabaseModalOpen(false)}
                title={'Save Exam to Database'}
                content={
                saveMessage
            }

            />
        </div>
    )
};

export default TimerPage;