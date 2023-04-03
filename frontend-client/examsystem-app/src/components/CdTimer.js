import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import format from "dayjs/plugin/durationFormat";

import { Typography } from "@mui/material";

dayjs.extend(duration);
dayjs.extend(format);
const CdTimer = ({ remainingTime, examDuration }) => {
    const [timeLeft, setTimeLeft] = useState(examDuration.asMilliseconds());

    useEffect(() => {
        if (remainingTime) {
            const interval = setInterval(() => {
                const currentTime = dayjs();
                const endTimeDayjs = dayjs().startOf("day").add(dayjs.duration(remainingTime).asMilliseconds(), "milliseconds");
                if (currentTime.isAfter(endTimeDayjs)) {
                    clearInterval(interval);
                } else {
                    setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    const formattedTimeLeft = dayjs.duration(timeLeft, "milliseconds").format("H:mm:ss");

    return <Typography variant="h2">{formattedTimeLeft}</Typography>;
};

export default CdTimer;