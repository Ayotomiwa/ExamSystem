import React, {useEffect, useState} from 'react';
import {Paper, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
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
        <Paper sx={{overflowY: "auto", backgroundColor:"white", padding:"10px", pt:0 }}>
        <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: "#f5f5f5"}} >
                <TableCell sx={{color: '#e75480', fontSize:"16px"}}>Module Code</TableCell>
                <TableCell sx={{color: '#e75480', fontSize:"16px"}}>Module Name</TableCell>
                <TableCell sx={{color: '#e75480', fontSize:"16px"}}>Module Leader</TableCell>
                  <TableCell sx={{color: '#e75480', fontSize:"16px"}}>Exam Date</TableCell>
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
        </Paper>
    );
};
export default FeaturedExams;
