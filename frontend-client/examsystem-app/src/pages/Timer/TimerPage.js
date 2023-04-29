import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {Box, Button, Collapse, Zoom, Grow, IconButton, Tooltip, Typography} from "@mui/material";
import {Close, Description, Edit, ListAlt, More, Pause, PlayArrow, Replay} from "@mui/icons-material";
import CdTimer from "../../components/CdTimer";
import ExamForm from "./ExamForm";
import Notes from "../../components/Notes";
import SideBar from "../../components/SideBar";
import ExamInfo from "./ExamInfo";
import useFullScreen from "../../hooks/useFullScreen";
import {Link} from "react-router-dom";
import "./TimerPage.css"



dayjs.extend(duration);
dayjs.extend(localizedFormat);



const TimerPage = ({form, setForm, timerMode, setTimerMode, tempForm, setTempForm}) => {

        const [showLogs, setShowLogs] = useState(false);
        const [hour, minute] = form.startTime.split(":").map(Number);
        const startTime = dayjs().set("hour", hour).set("minute", minute)
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
        const [isRotated, setIsRotated] = useState(false);
        const [sideBarOpen, setSideBarOpen] = useState(false);



    function handleSave() {

    }

    const fullScreenContainerStyle = {
        minHeight: "100vh",
        minWidth: "70vw",
        backgroundColor: "white",
        border:"1px solid red",
    };


    useEffect(() => {
        const newAdjustedEndTime = endTime.clone().add(totalPausedDuration, 'milliseconds');
        setAdjustedEndTime(newAdjustedEndTime);
    }, [totalPausedDuration, form]);


    useEffect(() =>{




    },[showRules, showLogs, showForm])




    function handleTimerButtons(event) {
        if (event.currentTarget.id === "Logs") {
            if (showForm) {
                setShowForm(false);
            }
            setShowLogs(!showLogs);
            return;
        } else if (event.currentTarget.id === "Edit Form") {
            if (showLogs) {
                setShowLogs(false);
            }
            setShowForm(!showForm);
            return;
        }
        else if (event.currentTarget.id === "Edit Form") {
            if (showLogs) {
                setShowLogs(false);
            }
            else if (showForm){
                setShowForm(false);
            }
            setShowForm(!showForm);
            return;
        }

    }

 

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
    const handleMouseDown = () => {
        setIsRotated(true);
      };
    
      const handleMouseUp = () => {
        setIsRotated(false);
      };


    return (
        <div ref={fullScreenContainerRef} style={fullScreenContainerStyle}>
        <Box className="timer-page-container" sx={{
            display: "flex",
            flexDirection: "row",
            border:"1px solid green",
            minHeight:"100vh",
        
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
                <Box sx={{display:"grid", placeItems:"center", mt:"40px", ml:"10px", height:"100%"}}>
                        <Box
                            sx={{
                                mt:"50px",
                                display: 'flex',
                                justifyContent:"center",
                                alignItems:"center",
                                backgroundColor:"white",
                                border: "10px solid black",
                                boxSizing: "border-box",
                                p:"30px",
                                minWidth:"60vw"
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
                            border: "1px solid #e75480"
                        }}
                    >

                            <Button
                                variant={`outlined`}
                                onClick={() => resetTimerPage()}
                                style={{ color: 'black', borderColor: 'black', height: "35px"}}
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
                            variant={play ? "outlined": "contained" }
                            onClick={() => togglePause()}
                            style={{
                                color: play ?  "#584595" : "white",
                                borderColor: "#584595",
                                backgroundColor: play ? "transparent": "#584595"
                            }}
                        >
                            {play ? <Pause/> : <PlayArrow/>}
                        
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
                    <Zoom in={showButtons}>
                        <Box sx={{
                            position: 'static',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            mt:"20px",
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
                            mt:"100px",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'content',
                            border: "1px solid blue",
                            alignItems: 'center',
                        }}>
                            <Typography variant="h4" sx={{mr:"30px"}}>
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