import React, {useEffect, useState} from 'react';
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Table} from "react-bootstrap";
import ExamListRow from "../Logs/ExamListRow";



const FeaturedExams = ({setLoginModal}) => {

    const [exams, setExams] = useState([]);

    useEffect(()=> {
        fetch(`https://lsbu-ex-timer.herokuapp.com/api/exams/recent`)
        // fetch('http://localhost:8080/api/exams/recent')
            .then(res=>res.json())
            .then(data => {
                setExams(data)
            })
            .catch(err=>console.log(err));
    },[]);

    return(
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <Table>
            <TableHead>
              <TableRow >
                <TableCell sx={{color: '#e75480'}}>ModuleCode</TableCell>
                <TableCell sx={{color: '#e75480'}}>ModuleName</TableCell>
                <TableCell sx={{color: '#e75480'}}>Module Leader</TableCell>
                  <TableCell sx={{color: '#e75480'}}>Exam Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {exams.length === 0 ?
                    <tr><td colSpan="4"><p id={"no-data"}> No Data to be Displayed</p></td></tr>
                :exams.map((exam, index) => (
                        <ExamListRow
                            key={`${exam.examId}-${index}`}
                            examId={exam.examId}
                            moduleCode={exam.module.moduleCode}
                            moduleName={exam.module.moduleName}
                            moduleLeader={exam.module.moduleLeader}
                            day={exam.examDay}
                            setLoginModal={setLoginModal}
                            // setNextPage={setNextPage}
                        />
                ))}
            </TableBody>
        </Table>
        </div>
    );
};
export default FeaturedExams;
