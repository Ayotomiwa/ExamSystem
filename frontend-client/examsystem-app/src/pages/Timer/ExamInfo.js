import React, {useEffect, useState} from "react";
import {Box, Grow, Paper, Typography} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScheduleIcon from "@mui/icons-material/Schedule";
import {ArrowCircleRightSharp} from "@mui/icons-material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faWalking} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";


const ExamInfo = ({ startTime, endTime, restrictedMinutes, isPaused }) => {
    const [currentStatus, setCurrentStatus] = useState("");
    const [slideIn, setSlideIn] = useState(true);
    const[animationDone, setAnimationDone] = useState(false);
    let adjustedEndTime = endTime;

    useEffect(() => {
        setSlideIn(false);
        setAnimationDone(false);
        setTimeout(() => {
            setAnimationDone(true);
            setSlideIn(true);
        }, 500);
    }, [currentStatus]);


    useEffect(() => {
        const checkStatus = () => {

            if (adjustedEndTime.isBefore(startTime) && !startTime.isSame(dayjs().startOf('day'))) {
                adjustedEndTime = adjustedEndTime.add(1, 'day');
            }


            const now = new Date();
            const start = new Date(startTime);
            const end = new Date(adjustedEndTime);
            const restrictedEnd = new Date(start.getTime() + restrictedMinutes * 60000);
            const restrictedStart = new Date(end.getTime() - restrictedMinutes * 60000);

            if(now > end){
                setCurrentStatus("done");
            }
            else if(now < start){
                setCurrentStatus("waiting");
            }
            else if (now >= restrictedStart && now <= end) {
                setCurrentStatus("restrictedEnd");
            }
            else if (now >= start && now <= restrictedEnd) {
                setCurrentStatus("restrictedStart");
            } else if (now > restrictedEnd && now < restrictedStart) {
                setCurrentStatus("allowed");
            }
            else{
                setCurrentStatus("start");
            }
        };

        const intervalId = setInterval(checkStatus, 1000);
        return () => clearInterval(intervalId);
    }, [startTime, endTime, restrictedMinutes]);

    return (
        <Grow direction="left" in={slideIn} mountOnEnter unmountOnExit >
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", maxWidth:"90%"}}>
            {currentStatus === "restrictedStart" && animationDone && (
                <Box sx={{ display: "flex", alignItems: "center" , flex:1}}>
                <Typography sx={{ position: "relative", display: "inline-block", paddingRight:"40px" }}>
                    <FontAwesomeIcon icon={faWalking} size="3x" />
                    <FontAwesomeIcon
                        icon={faBan}
                        size="6x"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "28%",
                            transform: "translate(-50%, -50%)",
                            color: "red",
                        }}
                    />
                </Typography>
                <Paper>
                    <Typography sx={{fontSize:"30px", display: "flex", justifyContent:"center", alignItems:"center", flex:1,}}>
                        {"No leave for the first "}
                        {restrictedMinutes}
                        {" minutes."}
                    </Typography>
                </Paper>
                </Box>
            )}
            {currentStatus === "allowed" && animationDone && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ position: "relative", display: "inline-block", pr:"10px"}}>
                    <FontAwesomeIcon icon={faWalking} size="6x" />
                </Typography>
                <Paper>
                    <Typography sx={{fontSize:"30px"}}>
                        {"Students are allowed to leave the room."}
                    </Typography>
                </Paper>
                </Box>
            )}
            {currentStatus === "restrictedEnd" && animationDone && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ position: "relative", display: "inline-block", paddingRight:"40px" }}>
                        <FontAwesomeIcon icon={faWalking} size="3x" />
                        <FontAwesomeIcon
                            icon={faBan}
                            size="6x"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "30%",
                                transform: "translate(-50%, -50%)",
                                color: "red",
                            }}
                        />
                    </Typography>
                    <Paper>
                        <Typography sx={{fontSize:"30px"}}>
                            {"No leave during the last "}
                            {restrictedMinutes}
                            {" minutes."}
                        </Typography>
                    </Paper>
                </Box>
            )}
            {currentStatus === "done" && animationDone &&(
                <Paper>
                    <Typography sx={{fontSize:"40px"}}>
                        <AccessTimeIcon sx={{fontSize:"5rem"}}  />
                        {"Exam has already ended."}
                    </Typography>
                </Paper>
            )}
            {currentStatus === "waiting" && animationDone && (
                <Paper>
                    <Typography sx={{fontSize:"40px"}}>
                        <ScheduleIcon sx={{fontSize:"4rem"}} />
                        {"Exam starting soon"}
                    </Typography>
                </Paper>
            )}
            {currentStatus === "start" && animationDone && (
                <Paper>
                    <Typography sx={{fontSize:"40px"}}>
                        {"Complete the form to start the exam"}
                        <ArrowCircleRightSharp fontSize="xlarge" />
                    </Typography>
                </Paper>
            )}
        </Box>
        </Grow>
    );
};

export default ExamInfo;
