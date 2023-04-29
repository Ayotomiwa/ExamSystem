import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Box, css, Typography} from '@mui/material';
dayjs.extend(duration);
dayjs.extend(utc);
import "../pages/Timer/CDTimer.css";
import utc from "dayjs-plugin-utc";


const CdTimer = ({ startTime, endTime, isPaused, totalPausedDuration, isStarted}) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [initialized, setInitialized] = useState(false);

    const formatUnit = (value) => {
        return value.toString().padStart(2, '0');
    };

    useEffect(() => {

        const interval = setInterval(() => {
            if (isPaused) {
                return;
            }
            if(!isStarted){
                setInitialized(false);
                return;
            }
            const currentTime = dayjs();
            if (currentTime.isBefore(startTime)) {
                setTimeLeft(dayjs.duration(startTime.diff(currentTime)));
            } else if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
                setTimeLeft(dayjs.duration(endTime.diff(currentTime)));
            } else {
                clearInterval(interval);
            }
            setInitialized(true);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime, isPaused, isStarted]);


    if (!initialized) {
        return (
            <Typography
                className="timer-text"
                sx={{ fontSize: "7rem", fontFamily: "'Orbitron', sans-serif" }}
            >
                00:00:00
            </Typography>
        );
    }
    const isWaiting = dayjs().isBefore(startTime);
    const formattedTimeLeft = timeLeft
        ? dayjs().startOf('day')
            .add(timeLeft.asMilliseconds(), 'milliseconds')
            .format('HH:mm:ss')
        : 'Time up';

    const waiting = isWaiting? 'Waiting...' : '';

    const [hours, minutes, seconds] = formattedTimeLeft.split(':');

    const width = isWaiting ? 'auto' : '1.3em';

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            wordWrap="break-word"
            className={`timer-text${isWaiting ? ' timer-text-waiting' : ''}`}
            sx={{
                // fontFamily: "'Orbitron', sans-serif",
                fontSize: isWaiting ? '6rem' : '9rem',
                fontWeight:"bold",
            }}
        >
            <Box>
            {waiting}
            </Box>
                <Box width={width}>
                    {hours}
                </Box>
                <span style={{ width:"0.5em", display:"flex", justifyContent:"center", alignItems:"center"}}>:</span>
                <Box width={width}>
                    {minutes}
                </Box>
                <span style={{ width:"0.5em", display:"flex", justifyContent:"center", alignItems:"center"}}>:</span>
                <Box width={width}>
                    {seconds}
                </Box>
        </Box>
    );
};

export default CdTimer;


