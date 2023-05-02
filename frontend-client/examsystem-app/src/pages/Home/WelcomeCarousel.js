import { useState } from 'react';
import { Button, Typography, Box, useTheme } from '@mui/material';
import { Carousel as MuiCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css';
import styled from '@mui/material/styles/styled';
import LsbuLogo from '../../components/LsbuLogo';
import LoginForm from '../Login/LoginForm';
import librrary from '../../assets/library.jpg';

const StyledSlide = styled('div')(({ theme, backgroundColor }) => ({
    backgroundColor,
    padding: theme.spacing(4),
    minHeight: '30rem',
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
    const theme = useTheme();

    const handleSignIn = () => {
        setLogin(true);
    }

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
                    Start Exam
                </Button>
            ),
        },
        {
            title: 'Sign in to access exam logs',
            description: 'Keep track of your exams and stay organized',
            backgroundColor: "#e75480",
            color: "#fff",
            action: (
                <Button variant="contained" color="secondary" onClick={handleSignIn}>
                    Sign in
                </Button>
            ),
        },
        {
            title: 'Stay updated with exam news',
            description: 'Never miss important announcements',
            backgroundColor: "yellow",
            color:"black"
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
                interval={500}
                infiniteLoop
            >
                {carouselItems.map((item, index) => (
                    <StyledSlide key={index} backgroundColor={item.backgroundColor}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{ color: item.color }}
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
                        {item.action}
                    </StyledSlide>
                ))}
            </MuiCarousel>

    );
};

export default WelcomeCarousel;



