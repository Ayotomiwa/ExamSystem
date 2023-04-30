import React, { useState, useEffect } from "react";
import {Box, Paper, Typography} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import StopIcon from "@mui/icons-material/Stop";
import {ArrowCircleRightSharp, ArrowRight, ArrowRightSharp, Cancel} from "@mui/icons-material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faWalking} from "@fortawesome/free-solid-svg-icons";


const ExamInfo = ({ startTime, endTime, restrictedMinutes }) => {
    const [currentStatus, setCurrentStatus] = useState("");

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const start = new Date(startTime);
            const end = new Date(endTime);
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
        <Box sx={{width:"50%", display: "flex", justifyContent: "center", alignItems: "center", mx:"auto"}}>
            {currentStatus === "restrictedStart" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ position: "relative", display: "inline-block", paddingRight:"40px" }}>
                    <FontAwesomeIcon icon={faWalking} size="3x" />
                    <FontAwesomeIcon
                        icon={faBan}
                        size="5x"
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
                    <Typography sx={{fontSize:"25px"}}>
                        {" Students are not allowed to leave the room during the first "}
                        {restrictedMinutes}
                        {" minutes."}
                    </Typography>
                </Paper>
                </Box>
            )}
            {currentStatus === "allowed" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ position: "relative", display: "inline-block", pr:"10px"}}>
                    <FontAwesomeIcon icon={faWalking} size="4x" />
                </Typography>
                <Paper>
                    <Typography sx={{fontSize:"25px"}}>
                        {" Students may leave the room for a bathroom break or if they have finished the exam."}
                    </Typography>
                </Paper>
                </Box>
            )}
            {currentStatus === "restrictedEnd" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ position: "relative", display: "inline-block", paddingRight:"40px" }}>
                        <FontAwesomeIcon icon={faWalking} size="3x" />
                        <FontAwesomeIcon
                            icon={faBan}
                            size="5x"
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
                        <Typography sx={{fontSize:"25px"}}>
                            {" Students are not allowed to leave the room during the last "}
                            {restrictedMinutes}
                            {" minutes."}
                        </Typography>
                    </Paper>
                </Box>
            )}
            {currentStatus === "done" && (
                <Paper>
                    <Typography sx={{fontSize:"30px"}}>
                        <AccessTimeIcon sx={{fontSize:"5rem"}}  />
                        {" Exam has already ended."}
                    </Typography>
                </Paper>
            )}
            {currentStatus === "waiting" && (
                <Paper>
                    <Typography sx={{fontSize:"40px"}}>
                        <ScheduleIcon sx={{fontSize:"5rem"}} />
                        {"Exam starting soon"}
                    </Typography>
                </Paper>
            )}
            {currentStatus === "start" && (
                <Paper>
                    <Typography sx={{fontSize:"25px"}}>
                        {"Complete the form to start the exam"}
                        <ArrowCircleRightSharp fontSize="large" />
                    </Typography>
                </Paper>
            )}
        </Box>
    );
};

export default ExamInfo;
