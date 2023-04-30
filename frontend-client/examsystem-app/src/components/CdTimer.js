import React, {useCallback, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Box, Typography} from '@mui/material';
import "../pages/Timer/CDTimer.css";

dayjs.extend(duration);


const CdTimer = React.memo(function CdTimer ({startTime, endTime, setAdjustedEndTime, isPaused, isStarted, setTimeUp}) {
    const [timeLeft, setTimeLeft] = useState(dayjs.duration(0));
    const [initialized, setInitialized] = useState(false);
    const [pausedRemainingTime, setPausedRemainingTime] = useState(null);
    const [waiting, setWaiting] = useState(false);
    const [hasWaited, setHasWaited] = useState(false);


    const tick = useCallback(() => {
        if (isPaused) {
            setPausedRemainingTime(timeLeft);
            return;
        }

        if (!isStarted) {
            setInitialized(false);
            return;
        }

        if (!isPaused && pausedRemainingTime !== null) {
            const updatedStartTime = dayjs();
            const updatedEndTime = updatedStartTime
                .clone()
                .add(pausedRemainingTime.asMilliseconds(), 'milliseconds');

            setAdjustedEndTime(updatedEndTime);
            setPausedRemainingTime(null);
        }

        const currentTime = dayjs();
        if (currentTime.isBefore(startTime)) {
            setTimeLeft(dayjs.duration(startTime.diff(currentTime)));
            if(!waiting){
                setWaiting(true);
            }
        } else if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
            setTimeLeft(dayjs.duration(endTime.diff(currentTime)));
        } else {
            setTimeLeft(dayjs.duration(0));
            setTimeUp(true);
        }

        setInitialized(true);
    }, [
        startTime,
        endTime,
        isPaused,
        isStarted,
        pausedRemainingTime,
        timeLeft,
        setTimeUp,
        setAdjustedEndTime,
    ]);

    useEffect(() => {
        const timerId = setInterval(() => {
            tick();
        }, 10);

        return () => {
            clearInterval(timerId);
        };
    }, [tick]);

    if (!initialized) {
        return (
            <Typography
                style={{fontFamily:"Orbitron, sans-serif", fontSize:"9rem"}}
            >
                00:00:00
            </Typography>
        );
    }


    const formattedTimeLeft = timeLeft.asMilliseconds() > 0
        ? dayjs().startOf('day')
            .add(timeLeft.asMilliseconds(), 'milliseconds')
            .format('HH:mm:ss')
        : 'Time up';

    // if(formattedTimeLeft === 'Time up'){
    //     setTimeUp(true);
    // }


    const waitingText = waiting ? 'Waiting..' : '';
    const [hours, minutes, seconds] = formattedTimeLeft.split(':');
    const width = waiting ? '1.7em' : '1.7em';
    const remainingTimeInSeconds = timeLeft ? timeLeft.asSeconds() : null;
    const shouldDisplaySecondsOnly = remainingTimeInSeconds !== null && remainingTimeInSeconds < 60;
    const shouldDisplayRedFont = remainingTimeInSeconds !== null && remainingTimeInSeconds <= 15 * 60 && (waiting || shouldDisplaySecondsOnly);

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            wordwrap="break-word"
            className={`${waiting ? 'timer-text-waiting' : 'timer-text'}`}
            sx={{
                color: shouldDisplayRedFont ? 'red' : 'inherit',
            }}
        >
            {formattedTimeLeft === "Time up" ? (
                <Typography
                    style={{fontFamily:"Orbitron, sans-serif", fontSize:"9rem"}}
                >
                    Time up
                </Typography>
            ) : (
                <>
                    <Box>
                        {waitingText}
                    </Box>
                    {!shouldDisplaySecondsOnly && (
                        <>
                            <Box
                                display="flex"
                                alignItems="right"
                                justifyContent="end"
                                width={width}
                            >
                                {hours}
                            </Box>
                            <span>:</span>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={width}
                            >
                                {minutes}
                            </Box>
                            <span>:</span>
                        </>
                    )}
                    <Box
                        display="flex"
                        alignItems="left"
                        justifyContent="start"
                        width={width}
                    >
                        {seconds}
                        {/*{shouldDisplaySecondsOnly && 's'}*/}
                    </Box>
                </>
            )}
        </Box>

    );
});

export default CdTimer;


