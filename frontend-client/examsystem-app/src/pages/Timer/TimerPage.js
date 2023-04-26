import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from 'dayjs-plugin-utc';
import {Box, Button, Collapse, IconButton, Tooltip, Typography} from "@mui/material";
import {Close, Description, Edit, ListAlt, More, Pause, PlayArrow, Replay} from "@mui/icons-material";
import CdTimer from "../../components/CdTimer";
import ExamForm from "./ExamForm";
import Notes from "../../components/Notes";
import SideBar from "../../components/SideBar";
import ExamInfo from "./ExamInfo";
import useFullScreen from "../../hooks/useFullScreen";
import {Link} from "react-router-dom";



dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(utc);


const TimerPage = ({form, setForm, timerMode, setTimerMode, tempForm, setTempForm}) => {

        const [showLogs, setShowLogs] = useState(false);
        const [hour, minute] = form.startTime.split(":").map(Number);
        const startTime = dayjs().set("hour", hour).set("minute", minute).utc().local();
        const examDuration = dayjs.duration({hours: parseInt(form.durationHrs), minutes: parseInt(form.durationMins)});
        const endTime = startTime.clone().add(examDuration.asMilliseconds(), 'milliseconds');
        const [showForm, setShowForm] = useState(true);
        const [showButtons, setShowButtons] = useState(false);
        const [play, setPlay] = useState(true);
        const [showRules, setShowRules] = useState(false);
        const [totalPausedDuration, setTotalPausedDuration] = useState(dayjs.duration());
        const [lastPauseTime, setLastPauseTime] = useState(null);
        const [isStarted, setIsStarted] = useState(false);
        const [isFullScreen, toggleFullScreen] = useFullScreen();
        const fullScreenContainerRef = useRef(null);
        const [adjustedEndTime, setAdjustedEndTime] = useState(endTime);



    function handleSave() {

    }

    const fullScreenContainerStyle = {
        display: isFullScreen ? 'grid' : 'unset',
        placeItems: isFullScreen ? 'stretch' : 'unset',
        flex:1,
        backgroundColor: "white",

    };


    useEffect(() => {
        const newAdjustedEndTime = endTime.clone().add(totalPausedDuration, 'milliseconds');
        setAdjustedEndTime(newAdjustedEndTime);
    }, [totalPausedDuration, form]);

    function handleTimerButtons(event) {
        if (event.currentTarget.id === "Logs") {
            if (showForm) {
                setShowForm(false);
            }
            setShowLogs(!showLogs);
        } else if (event.currentTarget.id === "Edit Form") {
            if (showLogs) {
                setShowLogs(false);
            }
            setShowForm(!showForm);
        }
    }

   // useEffect(() => {
   //     setShowLayoutComponents(false);
   // },[]);


    function togglePause() {
        if (dayjs().isBefore(startTime)) {
            return;
        }
        setPlay(!play);
        if (play) {
            setLastPauseTime(dayjs());
        } else {
            const pauseDuration = dayjs.duration(dayjs().diff(lastPauseTime));
            setTotalPausedDuration(totalPausedDuration.add(pauseDuration));
            setLastPauseTime(null);
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
            durationHrs: "",
            durationMins: "",
            notes: [],
            restrictedMinutes: "",
        });
        setTempForm({
            startTime: "",
            durationHrs: "",
            durationMins: "",
            restrictedMinutes: ""
        })
        setIsStarted(false);
        setPlay(true);
        setLastPauseTime(null);
    }


    return (
        <div ref={fullScreenContainerRef} style={fullScreenContainerStyle}>
        <Box className="timer-page-container" sx={{
            display: "flex",
            flexDirection: "row",
            // border: "1px solid #e75480"
        }}>
            <Box className="timer-page" sx={{display:"flex", flexDirection:"column", flex:1}}>
                <Box sx={{p: 3}}>
                    <Typography className="moduleName" variant="h4" component="h1">
                        Module Name: {form.moduleName}
                    </Typography>
                    <Typography className="moduleCode" variant="h4" component="h2">
                        Module Code: {form.moduleCode}
                    </Typography>
                </Box>
                <ExamInfo startTime={startTime} endTime={adjustedEndTime} restrictedMinutes={30}/>
                <Box sx={{display:"grid", placeItems:"center", mt:"40px",height:"100%"}}>
                        <Box
                            sx={{
                                backgroundColor:"white",
                                border: "10px solid black",
                                boxSizing: "border-box",
                                p:"30px"
                            }}
                        >
                            <CdTimer startTime={startTime}
                                     endTime={adjustedEndTime}
                                     isPaused={!play}
                                     totalPausedDuration={totalPausedDuration}
                                     isStarted={isStarted}
                            />
                        </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt:"20px",
                            gap: 3,
                            // border: "1px solid #e75480"
                        }}
                    >

                        <Button
                            variant={`outlined`}
                            onClick={() => resetTimerPage()}
                            style={{color:"black", borderColor:"black"}}
                        >
                            <Replay/>
                            {/*Clear*/}
                        </Button>
                        <Button
                            variant={play ? "outlined": "contained" }
                            onClick={() => togglePause()}
                            style={{
                                color: play ?  "#584595" : "white",
                                borderColor: "#584595",
                                backgroundColor: play ? "transparent": "#584595"
                            }}
                        >
                            {play ? <Pause/> : <PlayArrow/>}
                            {/*{play ? 'Pause' : 'Play'}*/}
                        </Button>
                        <Button
                            variant={`outlined`}
                            onClick={() => setShowButtons(!showButtons)}
                            style={{
                                color: showButtons ? "white" : "#e75480",
                                borderColor: "#e75480",
                                backgroundColor: showButtons ? "#e75480" : "transparent"
                            }}
                        >
                            <Edit/>
                            {/*Edit*/}
                        </Button>
                    </Box>
                    <Collapse in={showButtons}>
                        <Box sx={{
                            position: 'static',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mt:"50px",
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
                                Edit Form
                            </Button>
                        </Box>
                    </Collapse>

                    <Box sx={{position:"absolute", left:"50px", mt:"50px"}}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: "1px solid #e75480"
                    }}>
                        <Tooltip title="Additional actions">
                            <IconButton
                                onClick={() => setShowButtons(!showButtons)}
                                variant="contained"
                                sx={{
                                    color: "#e75480",
                                    borderColor: "#e75480",
                                    borderRadius: "100px",
                                }}>
                                {showButtons ? <Close/> : <Edit/>}
                            </IconButton>
                        </Tooltip>

                        <Collapse in={showButtons}>
                            <Box sx={{
                                position: 'relative',
                                // right: 24,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
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
                                    Edit Form
                                </Button>
                            </Box>
                        </Collapse>
                    </Box>
                    </Box>
                        <Box sx={{
                            mt:"150px",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'start',
                        gap:20}}>
                            <Typography variant="h4">
                                        Start Time:<strong>{startTime.format("HH:mm")}</strong>
                                    </Typography>

                                    <Typography variant="h4">
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
                            {isFullScreen ? "" : (timerMode? 'Timer Mode' : 'Exit Timer Mode')}
                        </Link>
                    </Box>
            </Box>
                {showForm && (
                    <SideBar name="Form">
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
                    <SideBar name="Logs">
                        <Notes form={form} setForm={setForm}/>
                    </SideBar>)}
            {showRules && (
                <SideBar name="Rules & Regulations">
                    <Notes form={form} setForm={setForm}/>
                </SideBar>)}
        </Box>
        </div>
            )
            };

            export default TimerPage;