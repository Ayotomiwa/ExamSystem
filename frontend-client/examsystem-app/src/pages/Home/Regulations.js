import {Box, Paper} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";


const Regulations= () => {

    return(
        <Paper>
        <Box sx={{display:"flex", flexWrap:"wrap", p:"40px", justifyContent:"space-between"}}>
            <ul style={{listStyleType: "none", gap:"3rem"}}>
                <li>
                    <Link to="/pdfs/Academic_Regulations_2021-2022.pdf" target="_blank">Academic Regulations 2021-22</Link>
                </li>
                <li>
                    <Link to="/pdfs/Academic-Regulations-2022-23.pdf" target="_blank">Academic Regulations 2022-23</Link>
                </li>
                <li>
                    <Link to="/pdfs/Assessment_and_Examinations_Procedure_2021-22_.pdf" target="_blank">Assessment and Examinations Procedures 2021-22</Link>
                </li>

                </ul>
            <ul style={{listStyleType: "none", gap:"3rem"}}>
                <li>
                    <Link to="/pdfs/Assessment_and_Examinations_Procedure_2022-23_.pdf" target="_blank">Assessment and Examinations Procedures 2022-23</Link>
                </li>
                <li>
                    <Link to="/pdfs/recommended-translation-scale.pdf" target="_blank">Recommended Transition Scale</Link>
                </li>
                <li>
                    <Link to="/pdfs/student-academic-misconduct-procedure.pdf" target="_blank">Student Academic Misconduct Procedure</Link>
                </li>
            </ul>
            <ul style={{listStyleType: "none", gap:"3rem"}}>
                <li>
                    <Link to="/pdfs/Glossary_2021-2022.pdf" target="_blank">Glossary 2021-22</Link>
                </li>
                <li>
                    <Link to="/pdfs/LSBU_List_of_Awards_2022-2023.pdf" target="_blank">LSBU List of Awards 2022-23</Link>
                </li>
            </ul>
        </Box>
        </Paper>
    );
}

export default Regulations;