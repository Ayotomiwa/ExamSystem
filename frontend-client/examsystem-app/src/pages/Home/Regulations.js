import {Box, Paper} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";


const Regulations= ({}) => {

    return(
        <Paper>
        <Box sx={{p:"16px"}}>
            <ul>
                <li>
                    <Link to="/pdfs/Academic_Regulations_2021-2022.pdf" target="_blank">Academic Regulations 2021-22</Link>
                </li>
                <li>
                </li>
            </ul>

        </Box>
        </Paper>
    );
}

export default Regulations;