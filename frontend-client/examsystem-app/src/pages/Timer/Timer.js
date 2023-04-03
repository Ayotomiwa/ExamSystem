import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {Container, Card, CardContent, Button, IconButton, Dialog, DialogContent, DialogActions} from "@mui/material";
import {Row, Col} from "react-bootstrap";
import {Typography} from "@mui/material";
import {TextareaAutosize} from "@mui/material";
import   {Description, Close} from "@mui/icons-material";
import CdTimer from "../../components/CdTimer";


dayjs.extend(duration);
dayjs.extend(localizedFormat);


const Timer = ({ form, setForm }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState("");
    const [remainingTime, setRemainingTime] = useState(null);


    console.log("form.startTime:", form.startTime);

    const [hour, minute] = form.startTime.split(":").map(Number);
    const startTime = dayjs().set("hour", hour).set("minute", minute);
    const examDuration = dayjs.duration({ hours: parseInt(form.durationHrs), minutes: parseInt(form.durationMins)});
    const endTime = startTime.clone().add(examDuration.asMilliseconds(), 'milliseconds');
    console.log("Parsed startTime:", startTime);


    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = dayjs();
            if (currentTime.isAfter(startTime)) {
                setRemainingTime(dayjs.duration(endTime.diff(currentTime)));
            } else {
                setRemainingTime(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    function handleSave() {
        // Handle saving the log here
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5">Timer</Typography>
                    <Row>
                        <Col>
                            <Typography>
                                ModuleName: <strong>{form.moduleName}</strong>
                            </Typography>
                        </Col>
                        <Col>
                            <Typography>
                                ModuleCode: <strong>{form.moduleCode}</strong>
                            </Typography>
                        </Col>
                    </Row>
                    <CdTimer remainingTime={remainingTime} examDuration={examDuration} />
                    <Row>
                        <Col>
                            <Typography>
                                Start Time: <strong>{startTime.format("HH:mm")}</strong>
                            </Typography>
                        </Col>
                        <Col>
                            <Typography>
                                End Time: <strong>{endTime.format("HH:mm")}</strong>
                            </Typography>
                        </Col>
                    </Row>
                </CardContent>
                <CardContent>
                    <Button onClick={() => setShowPopup(true)}>
                        <Description />
                        Add Log
                    </Button>
                </CardContent>
            </Card>
            <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogContent>
                    <TextareaAutosize
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Log..."
                        minRows={6}
                        style={{ width: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={() => setShowPopup(false)}>
                        <Close />
                    </IconButton>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Timer;