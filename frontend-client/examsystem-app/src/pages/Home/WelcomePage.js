import React, {useState} from "react";
import {Box, Button, Collapse, Typography} from "@mui/material";
import FeaturedExams from "./FeaturedExams";
import WelcomeCarousel from "./WelcomeCarousel";
import {KeyboardDoubleArrowDownOutlined, KeyboardDoubleArrowUpOutlined} from "@mui/icons-material";
import Regulations from "./Regulations";


const WelcomePage = ({setLogin}) => {
    const [featuredExams, setFeaturedExams] = useState(true);
    const [examTimetable, setExamTimetable] = useState(true);
    const [examRules, setExamRules] = useState(true);


    const toggleFeaturedExams = () => {
        setFeaturedExams(!featuredExams);
    };

    const toggleExamTimetable = () => {
        setExamTimetable(!examTimetable);
    }

    const toggleExamRules = () => {
        setExamRules(!examRules);
    }

    const CollapsibleBox = ({ onClick, bg, text, color, open, children }) => (
        <Box>
            <Box
                sx={{
                    background: bg,
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    color: color,
                }}
            >
                <Button variant="text" color="inherit" onClick={onClick}>
                    <Typography
                        variant="h5"
                        sx={{
                            textTransform: "capitalize"
                        }}
                    >
                        {open? <KeyboardDoubleArrowUpOutlined
                                sx={{
                                    color: 'white',
                                    filter: `drop-shadow(0 0 3px #b39ddb) drop-shadow(0 0 5px white)`,
                                    mx:"14px"
                                }}/>
                            : <KeyboardDoubleArrowDownOutlined
                                sx={{
                                    color: 'white',
                                    filter: 'drop-shadow(0 0 3px #b39ddb) drop-shadow(0 0 5px white)',
                                    mx:"14px"
                                }}/>}
                        {text}
                        {open? <KeyboardDoubleArrowUpOutlined
                            sx={{
                                color: 'white',
                                filter: 'drop-shadow(0 0 3px #b39ddb) drop-shadow(0 0 5px white)',
                                mx:"14px"
                            }}/> :
                            <KeyboardDoubleArrowDownOutlined
                            sx={{
                            color: 'white',
                            filter: `drop-shadow(0 0 3px #b39ddb) drop-shadow(0 0 5px white)`,
                            mx:"14px"
                        }}/>}
                    </Typography>
                </Button>
            </Box>
            <Collapse in={open}>
                <Box sx={{ p: "16px" }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );

// Then in your render method:
    return (
        <Box sx={{ display: "flex", flexDirection: "column", overflowY: "hidden" }}>
            <Box sx={{ Width: "100%" }}>
                <WelcomeCarousel setLogin={setLogin} />
            </Box>
            <CollapsibleBox
                onClick={toggleFeaturedExams}
                bg="linear-gradient(to right, #e75480, #584595)"
                text="Recent Exams"
                color="white"
                open={featuredExams}
                children={<FeaturedExams setLoginModal={setLogin} />}
            />
            <CollapsibleBox
                onClick={toggleExamTimetable}
                bg="linear-gradient(to right, #b39ddb, #584595)" // Light to dark purple gradient
                text= "Exam Timetable"
                // color="#2C3E50"
                color="white"
                open={examTimetable}
                children={<Typography variant="h5">Exam Timetable</Typography>}
            />
            <CollapsibleBox
                onClick={toggleExamRules}
                // bg="linear-gradient(to left, cornflowerblue, #584595)"
                bg="linear-gradient(to right, cornflowerblue, #3b70a7)" // Light orange to dark orange gradient
                text="Exam Regulations"
                color="white"
                open={examRules}
                children={<Regulations />}
            />
        </Box>
    );

};

    export default WelcomePage;
