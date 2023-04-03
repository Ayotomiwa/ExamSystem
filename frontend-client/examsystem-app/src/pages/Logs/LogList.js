import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import TablePlatform from "../../components/TablePlatform";
import {Button, Table} from "react-bootstrap";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Sort} from "@mui/icons-material";
import CollapsibleModal from "./LogModal";


const LogList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const { examId, moduleName } = useParams();

    console.log(examId+" numberrrrrrrrrrrr " + moduleName);

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


    return (
        <TablePlatform title={moduleName}
                       breadcrumbs={[    { label: "Exam List", url: "/" },    { label: moduleName },  ]}>
            <TableContainer id="table-container">
        <Table className="table-borderless" id="table">
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
                <TableBody className="table-group-divider" id="content_body">
                {logs.map((log, index) => (
                    <TableRow key={log.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{log.venue}</TableCell>
                        <TableCell>{log.type}</TableCell>
                        <TableCell>{log.submittedDate}</TableCell>
                        <TableCell>
                            <Button
                                className="exam-link"
                                data-exam-id={examId}
                                data-module-name={moduleName}
                                data-log-id={log.id}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <span style={{ fontSize: "5rem" }}>📁</span> Click to view Logs
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
        </Table>
                </TableContainer>
            <CollapsibleModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
        </TablePlatform>
    );
};

export default LogList;
