import React, { useState } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FeaturedExams from "./FeaturedExams";
import WelcomeCarousel from "./WelcomeCarousel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {Carousel} from "react-responsive-carousel";


const WelcomePage = ({handleLogin}) => {
    const [isFeaturedExamsOpen, setIsFeaturedExamsOpen] = useState(true);

    const toggleFeaturedExams = () => {
        setIsFeaturedExamsOpen(!isFeaturedExamsOpen);
    };




    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <Box sx={{ Width: "100%"}}>
                        <WelcomeCarousel login={handleLogin}/>
                    </Box>
                <Box sx={{ display:"flex", flexDirection: "row"}}>
                {!isFeaturedExamsOpen && (
                    <Button
                        variant="contained"
                        sx={{
                            background: "linear-gradient(to right, #e75480, #584595)",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "50px",
                            px: 2,
                            py: 1,
                            "&:hover": {
                                background: "linear-gradient(to right, #584595, #e75480)",
                            },
                        }}
                        onClick={toggleFeaturedExams}
                    >
                        <Box>
                            <ArrowForwardIcon />
                            <Typography variant="body1" sx={{ mt: 1, fontSize: "0.8rem", fontWeight: "bold" }}>
                                Daily Exams
                            </Typography>
                        </Box>
                    </Button>
                )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        maxWidth: isFeaturedExamsOpen ? "100%" : "0",
                        overflow: "hidden",
                        transition: "max-width 0.5s",
                    }}
                >
                    <Box
                        sx={{
                            background: "linear-gradient(to right, yellow, #e75480, #584595)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            p: 1,
                            color: "black",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <Typography variant="h6" component="div">
                            Daily Exam List
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="close"
                            onClick={toggleFeaturedExams}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <FeaturedExams />
                    </Box>

                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>

            </Box>
        </Box>
    );
};

export default WelcomePage;
