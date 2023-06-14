import {useContext, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {Carousel as MuiCarousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
import styled from '@mui/material/styles/styled';
import LsbuLogo from '../../components/LsbuLogo';
import WelcomeToLsbu from '../../assets/WelcomeToLsbu.jpg';
import AuthHandler from "../../components/AuthHandler";

const StyledSlide = styled('div')(({ theme, backgroundColor,backgroundImage }) => ({
    backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor,
    padding: theme.spacing(4),
    minHeight: '70svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

const LogoTitle = () => (
    <Box display="flex" alignItems="center">
        <LsbuLogo />
    </Box>
);

const WelcomeCarousel = ({setLogin}) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const { user } = useContext(AuthHandler);



    const handleSignIn = () => {
        if(!user){
            setLogin(true);
        }
    };


    const handleLogButton = () => {
        if (user){
            window.location.href = '/exams';
            return
        }
        handleSignIn()
    };



    const handleStartExam = () => {
        window.location.href = '/new-exam';
    };

    const carouselItems = [
        {
            title: <LogoTitle />,
            description: 'Manage exams, access exam logs and more!',
            backgroundColor: "#584595",
            // backgroundImage: "url(../../assets/library.jpg)",
            color: "#fff",
            action: (
                <Button variant="contained" color="secondary" onClick={handleStartExam}>
                    Get Started
                </Button>
            ),
        },
        {
            title: 'Access exam logs',
            description: 'Keep track of your exams and stay organized',
            backgroundColor: "#e75480",
            color: "#fff",
            action: (
                <Button variant="contained" color="secondary" onClick={handleLogButton}>
                    {user ? "Exam Logs" : "Sign In"}
                </Button>
            ),
        },
        {
            title: 'Stay updated with exam news',
            backgroundImage: `url(${WelcomeToLsbu})`,
            description: 'Never miss important announcements',
            color:"#fff",
        },
    ];

    const handleCarouselChange = (index) => {
        setCarouselIndex(index);
    };

    return (
            <MuiCarousel
                showThumbs={false}
                showStatus={false}
                showIndicators
                selectedItem={carouselIndex}
                onChange={handleCarouselChange}
                interval={5000}
                infiniteLoop
                autoPlay
            >
                {carouselItems.map((item, index) => (
                    <StyledSlide key={index} backgroundColor={item.backgroundColor} backgroundImage={ item.backgroundColor ? "none" : item.backgroundImage}>

                        <Box sx={{backgroundColor: item.backgroundColor ? "none" : "rgba(231, 84, 128, 0.8)", p:item.backgroundImage ? "16px" : "",}}>
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{ color: item.color, display: "flex", justifyContent: "center", alignItems: "center" }}
                                gutterBottom
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ color: item.color, textAlign: 'center' }}
                                gutterBottom
                            >
                                {item.description}
                            </Typography>
                        </Box>
                        {item.action}
                    </StyledSlide>
                ))}
            </MuiCarousel>

    );
};

export default WelcomeCarousel;



