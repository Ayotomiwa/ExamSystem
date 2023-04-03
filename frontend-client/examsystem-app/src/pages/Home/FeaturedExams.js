import React, {useEffect, useState} from 'react';
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Table} from "react-bootstrap";



const FeaturedExams = () => {

    const [exams, setExams] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:8080/api/exams/daily')
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
                <TableCell sx={{color: '#e75480'}}>Venue</TableCell>
                  <TableCell sx={{color: '#e75480'}}>Start Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {exams.length === 0 ?
                    <tr><td colSpan="4"><p id={"no-data"}> No Data to be Displayed</p></td></tr>
                :exams.map((exam, index) => (
                    <TableRow key={exam.examId}>
                        <TableCell>{exam.module.moduleCode}</TableCell>
                        <TableCell>{exam.module.moduleName}</TableCell>
                        <TableCell>{"K2"}</TableCell>
                        <TableCell>{exam.module.startTime}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    );
};
export default FeaturedExams;
