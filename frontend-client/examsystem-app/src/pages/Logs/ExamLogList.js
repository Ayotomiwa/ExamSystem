import React, {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import TablePlatform from "../../components/TablePlatform";
import {Button, Table} from "react-bootstrap";
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Description, Sort} from "@mui/icons-material";
import LogModal from "./LogModal";
import "./table.css";
import AuthHandler from "../../components/AuthHandler";
import PrivateWrapper from "../../components/PrivateWrapper";


const ExamLogList = ({setLogin, setNextPage}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const { examId, moduleName } = useParams();
    const [selectedLog, setSelectedLog] = useState(null);
    const { user } = useContext(AuthHandler);

    const addAuthHeader = (headers) => {

        if (user){
            if (user.token) {
                headers["Authorization"] = `Bearer ${user.token}`;
                console.log("headers: ", headers);
                console.log("user.token: ", user.token);
            }
        else{
            console.log("No user.token");
        }
        console.log("2nd headers: ", headers);
        console.log("2nd user.token: ", user.token);
        }
        return headers;
    };


    useEffect(() => {
        if(user) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            fetch(`https://lsbu-ex-timer.herokuapp.com/api/exam-logs/${examId}`, {
                headers: addAuthHeader({"Content-Type": "application/json"})
            })
                .then(res => res.json())
                .then(data => {
                    console.log("data: ", data);
                    setLogs(data)
                })
                .catch(error => console.error(error));
        }
    }, [examId]);


    const handleLogClick = (logId) => {
       setSelectedLog(logId);
       console.log("user log:", user);
       console.log("LogId in Log list:   ", logId);
       setIsModalOpen(true);
    }

    return (
        <PrivateWrapper setLogin={setLogin} setNextPage={setNextPage}>
        <TablePlatform title={moduleName}
                       breadcrumbs={[    { label: "Exam List", url: "/exams" },    { label: moduleName },  ]}>
            <TableContainer className="table-container">
        <Table size="small" aria-label="a dense table" >
                <TableHead>
                <TableRow>
                    <TableCell>Id
                    </TableCell>
                    <TableCell>Venue
                    </TableCell>
                    <TableCell>
                        Exam Type
                    </TableCell>
                    <TableCell>
                        Date
                    </TableCell>
                    <TableCell>
                        Logs
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody id="content_body">
                {logs.map((log, index) => (
                    <TableRow key={log.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{log.venue}</TableCell>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>{log.submittedDate}</TableCell>
                        <TableCell>
                            <Button
                                className="view-log-btn"
                                onClick={() => handleLogClick(log.id)}
                                sx={{textTransform: "none", outline: "none"}}
                            >
                                <Description fontSize="medium"  />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
        </Table>
                </TableContainer>
            <LogModal open={isModalOpen} user={user} logId={selectedLog} handleClose={() => setIsModalOpen(false)} />
        </TablePlatform>
        </PrivateWrapper>
    );
};

export default ExamLogList;
