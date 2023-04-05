import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import {Folder} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./table.css";


const ExamListRow = ({ examId, moduleCode, moduleName, moduleLeader, day }) => {
    return (
        <TableRow>
            <TableCell>
                <Link
                    to={`/logs/${examId}/${encodeURIComponent(moduleName)}`}
                    className="exam-link">
                    <IconButton>
                        <Folder />
                    </IconButton>
                    {moduleCode}
                </Link>
            </TableCell>
            <TableCell>{moduleName}</TableCell>
            <TableCell>{moduleLeader}</TableCell>
            <TableCell>{day}</TableCell>
        </TableRow>
    );
};

export default ExamListRow;
