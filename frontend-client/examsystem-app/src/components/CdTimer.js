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
            const adjustedEndTime = endTime.clone().add(totalPausedDuration, 'milliseconds');
            if (currentTime.isBefore(startTime)) {
                setTimeLeft(dayjs.duration(startTime.diff(currentTime)));
            } else if (currentTime.isAfter(startTime) && currentTime.isBefore(adjustedEndTime)) {
                setTimeLeft(dayjs.duration(adjustedEndTime.diff(currentTime)));
            } else {
                clearInterval(interval);
            }
            setInitialized(true);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime, isPaused, totalPausedDuration, isStarted]);

    let fontSize= "7rem";

    if (!initialized) {
        return (
            <Typography
                id="timer"
                variant="h2"
                sx={{
                    fontSize,
                    letterSpacing: '1rem',
                }}
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
    fontSize = isWaiting ? '4rem' : '7rem';

    return (
        <Typography
            id="timer"
            variant="h2" sx={{ fontSize, letterSpacing: '1rem'}}
        >
            {waiting}
            {formattedTimeLeft}
        </Typography>
    );
};

export default CdTimer;

