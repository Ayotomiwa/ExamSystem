import React, {useCallback, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {Box, Typography} from '@mui/material';
import "./CDTimer.css";

dayjs.extend(duration);


const CdTimer = React.memo(function CdTimer({
                                                startTime,
                                                endTime, setAdjustedEndTime,
                                                isPaused, isStarted, setTimeUp
                                            }) {
    const [timeLeft, setTimeLeft] = useState(dayjs.duration(0));
    const [initialized, setInitialized] = useState(false);
    const [pausedRemainingTime, setPausedRemainingTime] = useState(null);
    const [waiting, setWaiting] = useState(false);


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
        let adjustedEndTime = endTime;

        // if (adjustedEndTime.isBefore(startTime) && startTime.isSame(dayjs().startOf('day'))) {
        //     console.log('Adjusted end time is before start time');
        //     setTimeLeft(dayjs.duration(0));
        //     console.log('Time up');
        //     setTimeUp(true);
        //     return;
        // }

        if (adjustedEndTime.isBefore(startTime) && !startTime.isSame(dayjs().startOf('day'))) {
            adjustedEndTime = adjustedEndTime.add(1, 'day');
        }


        if (currentTime.isBefore(startTime)) {
            setTimeLeft(dayjs.duration(startTime.diff(currentTime)));
            if (!waiting) {
                setWaiting(true);
            }
        } else if (currentTime.isAfter(startTime) && currentTime.isBefore(adjustedEndTime)) {
            setTimeLeft(dayjs.duration(adjustedEndTime.diff(currentTime)));
            if (waiting) {
                setWaiting(false);
            }
        } else {
            setTimeLeft(dayjs.duration(0));
            console.log("Time up");
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
        }, 100);

        return () => {
            clearInterval(timerId);
        };
    }, [tick]);

    if (!initialized) {
        return (
            <Typography
                className="timer-text"
                style={{fontFamily: "Orbitron, sans-serif", fontSize: "10rem"}}
            >
                {/*00:00:00*/}
                00:00
            </Typography>
        );
    }


    const formattedTimeLeft = timeLeft.asMilliseconds() > 0
        ? dayjs().startOf('day')
            .add(timeLeft.asMilliseconds(), 'milliseconds')
            .format('HH:mm:ss')
        : 'Time up';

    const waitingText = waiting ? 'Waiting..' : '';
    const [hours, minutes, seconds] = formattedTimeLeft.split(':');
    const width = waiting ? '1.7em' : '1.7em';
    const remainingTimeInSeconds = timeLeft ? timeLeft.asSeconds() : null;
    const shouldDisplaySecondsOnly = remainingTimeInSeconds !== null && remainingTimeInSeconds < 60;
    const shouldDisplayRedFont = remainingTimeInSeconds !== null && remainingTimeInSeconds <= 15 * 60 && (waiting || shouldDisplaySecondsOnly);

    const timeUpShowing = formattedTimeLeft === "Time up";

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            wordwrap="break-word"
            maxHeight={`${timeUpShowing ? '2em' : '0.9em'}`}
            className={`${waiting ? 'timer-text-waiting' : 'timer-text'}`}
            sx={{
                color: shouldDisplayRedFont ? 'red' : 'inherit',
            }}
        >
            {formattedTimeLeft === "Time up" ? (
                    <Typography
                        style={{fontFamily: "Orbitron, sans-serif", fontSize: "9rem"}}
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
                                alignItems="center"
                                justifyContent="end"
                                width={width}
                                padding={0}
                                height={"1em"}
                            >
                                {hours}
                            </Box>
                            <span>:</span>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="start"
                                width={width}
                                height={"1em"}
                            >
                                {minutes}
                            </Box>
                            {/*<span>:</span>*/}
                        </>
                    )}
                    {shouldDisplaySecondsOnly && (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                            height={"1em"}
                            width={width}

                        >
                            {seconds}
                            {/*{shouldDisplaySecondsOnly && 's'}*/}
                        </Box>
                    )}

                </>
            )}
        </Box>

    );
});

export default CdTimer;


