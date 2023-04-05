import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Typography } from '@mui/material';
import {maxWidth} from "@mui/system";

dayjs.extend(duration);

const CdTimer = ({ startTime, endTime }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
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
    }, [startTime, endTime]);

    if (!initialized) {
        return null;
    }
    const isWaiting = dayjs().isBefore(startTime);
    const formattedTimeLeft = timeLeft
        ? dayjs().startOf('day').add(timeLeft.asMilliseconds(), 'milliseconds').format('HH:mm:ss')
        : 'Time is up';

    const waiting = isWaiting? 'Waiting.. ' : '';
    const fontSize = isWaiting ? '6rem' : '10rem';

    return (
        <Typography variant="h2" sx={{ fontSize, letterSpacing: '1rem' , display: "grid",
            placeItems:"center",paddingLeft:"10%",paddingRight:"10%",maxWidth:"100%",margin:"0 auto"}}
        >
            {waiting}
            {formattedTimeLeft}
        </Typography>
    );
};

export default CdTimer;

