import React from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import {Folder} from "@mui/icons-material";
import { Link } from "react-router-dom";


const ExamTableRow = ({ examId, moduleCode, moduleName, moduleLeader, day }) => {
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

export default ExamTableRow;
