import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {css, Typography} from '@mui/material';
dayjs.extend(duration);
dayjs.extend(utc);
import "../../src/pages/Timer/Timer.css";
import utc from "dayjs-plugin-utc";


const CdTimer = ({ startTime, endTime, isPaused, totalPausedDuration, isStarted}) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [initialized, setInitialized] = useState(false);


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
        ? dayjs().startOf('day').add(timeLeft.asMilliseconds(), 'milliseconds').format('HH:mm:ss')
        : 'Time up';

    const waiting = isWaiting? 'Waiting.. ' : '';


    return (
        <Typography
            className={`timer-text${isWaiting ? ' timer-text-waiting' : ''}`}
            sx={{ fontSize: isWaiting ? "4rem" : "9rem", fontFamily: "'Orbitron', sans-serif" }}
        >
            {waiting}
            {formattedTimeLeft}
        </Typography>
    );
};
export default CdTimer;

