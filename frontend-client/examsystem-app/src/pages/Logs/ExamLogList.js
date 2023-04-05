import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import TablePlatform from "../../components/TablePlatform";
import {Button, Table} from "react-bootstrap";
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {Description, Sort} from "@mui/icons-material";
import LogModal from "./LogModal";
import "./table.css";


const ExamLogList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const [sortColumn, setSortColumn] = useState("id");
    const [sortState, setSortState] = useState("ASC");
    const { examId, moduleName } = useParams();
    const [selectedLog, setSelectedLog] = useState(null);



    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        fetch(`http://localhost:8080/api/exam-logs/${examId}`)
            .then(res => res.json())
            .then(data => setLogs(data.content))
            .catch(error => console.error(error));
    }, [examId]);


    const handleLogClick = (logId) => {
       setSelectedLog(logId);
       console.log("LogId in Log list:   ", logId);
       setIsModalOpen(true);
    }

    return (
        <TablePlatform title={moduleName}
                       breadcrumbs={[    { label: "Exam List", url: "/exams" },    { label: moduleName },  ]}>
            <TableContainer className="table-container">
        <Table size="small" aria-label="a dense table" >
                <TableHead>
                <TableRow>
                    <TableCell>Id
                        <Button variant="link" className="sort-btn" data-sort="id">
                            <Sort />
                        </Button>
                    </TableCell>
                    <TableCell>Venue
                        <Button variant="link" className="sort-btn" data-sort="venue">
                            <Sort />
                        </Button>
                    </TableCell>
                    <TableCell>
                        Exam Type
                        <Button variant="link" className="sort-btn" data-sort="course.moduleName">
                            <Sort />
                        </Button>
                    </TableCell>
                    <TableCell>
                        Date
                        <Button variant="link" className="sort-btn" data-sort="date">
                            <Sort />
                        </Button>
                    </TableCell>
                    <TableCell>
                        Logs
                        <Button variant="link" className="sort-btn" data-sort="Logs">
                            <Sort/>
                        </Button>
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
                                    View Logs
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
        </Table>
                </TableContainer>
            <LogModal open={isModalOpen} logId={selectedLog} handleClose={() => setIsModalOpen(false)} />
        </TablePlatform>
    );
};

export default ExamLogList;
