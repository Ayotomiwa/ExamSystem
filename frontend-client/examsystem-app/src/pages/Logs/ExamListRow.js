import React, {useContext} from "react";
import {IconButton, TableCell, TableRow} from "@mui/material";
import {Folder} from "@mui/icons-material";
import {Link} from "react-router-dom";
import "./table.css";
import AuthHandler from "../../components/AuthHandler";


const ExamListRow = ({examId, moduleCode, moduleName, moduleLeader, day, setLoginModal, setNextPage}) => {

    const {user} = useContext(AuthHandler);

    const handleLinkClick = (event) => {
        if (!user) {
            event.preventDefault();
            setNextPage(`/logs/${examId}/${encodeURIComponent(moduleName)}`);
            setLoginModal(true);
        }
    };

    return (
        <TableRow>
            <TableCell>
                {user ? (
                    <Link
                        to={`/logs/${examId}/${encodeURIComponent(moduleName)}`}
                        className="exam-link"
                    >
                        <IconButton>
                            <Folder/>
                        </IconButton>
                        {moduleCode}
                    </Link>
                ) : (
                    <a href="#" onClick={handleLinkClick}>
                        <IconButton>
                            <Folder/>
                        </IconButton>
                        {moduleCode}
                    </a>
                )}
            </TableCell>
            <TableCell>{moduleName}</TableCell>
            <TableCell>{moduleLeader}</TableCell>
            <TableCell>{day}</TableCell>
        </TableRow>
    );
};

export default ExamListRow;
