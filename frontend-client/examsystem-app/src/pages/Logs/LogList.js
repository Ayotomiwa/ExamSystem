import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import TablePlatform from "../../components/TablePlatform";
import {Button, Table} from "react-bootstrap";
import {TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Sort} from "@material-ui/icons";


const LogList = () => {
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
                        No. of Students
                        <Button variant="link" className="sort-btn" data-sort="students">
                            <Sort/>
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
                <tbody className="table-group-divider" id="content_body">
                {logs.map((log, index) => (
                    <tr key={log.id}>
                        <td>{index + 1}</td>
                        <td>{log.venue}</td>
                        <td>{log.type}</td>
                        <td>{log.submittedDate}</td>
                        <td>{log.studentsLogged}</td>
                        <td>
                            <Link
                                to={`/`}
                                className="exam-link"
                                data-exam-id={examId}
                                data-module-name={moduleName}
                                data-log-id={log.id}
                            >
                                <span style={{ fontSize: "5rem" }}>📁</span> Click to view
                                Logs
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
        </Table>
                </TableContainer>
        </TablePlatform>
    );
};

export default LogList;
