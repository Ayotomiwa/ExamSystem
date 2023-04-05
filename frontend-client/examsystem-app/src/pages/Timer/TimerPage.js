import React, {useState} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    TextareaAutosize,
    Typography
} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {Close, Description} from "@mui/icons-material";
import CdTimer from "../../components/CdTimer";
import "./Timer.css";
import ExamForm from "./ExamForm";
import SideBar from "../../components/SideBar";


dayjs.extend(duration);
dayjs.extend(localizedFormat);


const TimerPage = ({form, setForm}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState("");
    const [hour, minute] = form.startTime.split(":").map(Number);
    const startTime = dayjs().set("hour", hour).set("minute", minute);
    const examDuration = dayjs.duration({hours: parseInt(form.durationHrs), minutes: parseInt(form.durationMins)});
    const endTime = startTime.clone().add(examDuration.asMilliseconds(), 'milliseconds');
    const [showSideBar, setShowSideBar] = useState(false);

    function handleSave() {
        // Handle saving the log here
    }

    return (
        <div className="timer-page-container" style={{display: "flex", flexDirection: "row"}}>
            <div className="timer-page" style={{display: "flex", flexDirection: "column", height: "100vh", width:"100%"}}>
                <Box sx={{p: 10, mb: 6}}>
                    <Typography className="moduleName" variant="h4" component="h1">
                        Module Name: {form.moduleName}
                    </Typography>
                    <Typography className="moduleCode" variant="h4" component="h2">
                        Module Code: {form.moduleCode}
                    </Typography>
                </Box>
                <Box
                    className="timer"
                    sx={{
                        display: "grid",
                        justifyItems: "center",
                        alignItems: "center",
                        // margin: "0 auto",
                    }}
                >
                    <CdTimer startTime={startTime} endTime={endTime}/>
                </Box>
                <Box sx={{display: "grid", justifyItems: 'center', alignItems: 'start'}}>
                    <Row style={{marginTop: "10%"}}>
                        <Col xs={12} md={"auto"}>
                            <Typography variant="h4">
                                Start Time:<strong>{startTime.format("HH:mm")}</strong>
                            </Typography>
                        </Col>
                        <Col xs={12} md={"auto"}>
                            <Typography variant="h4">
                                End Time:<strong>{endTime.format("HH:mm")}</strong>
                            </Typography>
                        </Col>
                    </Row>
                </Box>
                <Box
                    sx={{
                        right: 24,
                        bottom: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Description/>}
                        onClick={() => setShowPopup(true)}
                        sx={{mb: 2}}
                    >
                        Add Log
                    </Button>
                    <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                        <DialogContent>
                            <TextareaAutosize
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                placeholder="Log..."
                                minRows={6}
                                style={{width: "100%"}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <IconButton onClick={() => setShowPopup(false)}>
                                <Close/>
                            </IconButton>
                            <Button variant="contained" onClick={handleSave}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <IconButton onClick={() => {
                        setShowSideBar(!showSideBar)
                    }}>
                        Edit Exam Form
                    </IconButton>
                </Box>
            </div>
            <SideBar>
            {/*<div className="exam-form-container" style={{maxWidth: showSideBar ? "35%" : "0"}}>*/}
                {showSideBar && (
                    <Box sx={{display: "flex",
                        flexDirection: "row"
                    , maxWidth: showSideBar ? "100%" : "0"}}>
                        <ExamForm form={form} setForm={setForm}/>
                    </Box>
                )}
            {/*</div>*/}
            </SideBar>
        </div>

)

};

export default TimerPage;