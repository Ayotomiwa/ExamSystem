import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap";


function ExamLogs() {
    const { examId, moduleName } = useParams();
    const [logs, setLogs] = useState([]);


    useEffect(() => {
         fetch(`http://localhost:8080/api/exam-logs/${examId}`)
            .then((data) => {
                setLogs(data.content);
            })
            .catch((error) => console.error(error))
    }, [examId]);

    return (
        <main id="log-main" className="container-fluid">
            <Breadcrumb>
                <BreadcrumbItem active>Exam List</BreadcrumbItem>
            </Breadcrumb>
            {moduleName} <span className="text-muted">Exam Logs</span>
            <table className="table table-responsive" id="log-table">
                <div className="table table-hover">
                    <thead className="card-body">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">VENUE</th>
                        <th scope="col">EXAM TYPE</th>
                        <th scope="col">DATE</th>
                        <th scope="col">STUDENTS</th>
                        <th scope="col">LOGS</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider" id="content_body">
                    {logs.length > 0 ? (
                        logs.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.venue}</td>
                                <td>{item.type}</td>
                                <td>{item.submittedDate}</td>
                                <td>{item.studentsLogged}</td>
                                <td>
                                    <a href="examsystem-app/src/index#" className="exam-link">
                      <span role="img" aria-label="folder">
                        📁
                      </span>
                                        Click to view Logs
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>No data to display</td>
                        </tr>
                    )}
                    </tbody>
                </div>
            </table>
        </main>
    );
}

export default ExamLogs;
