import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Carousel as MuiCarousel } from 'react-responsive-carousel';
import styled from '@mui/material/styles/styled';

const StyledSlide = styled('div')(({ theme, backgroundColor }) => ({
    backgroundColor,
    padding: theme.spacing(4),
    minHeight: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Carousel = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);

    const carouselItems = [
        {
            title: 'Welcome to LSBU Exams',
            description: 'Access exam schedules, logs, and more!',
            backgroundColor: '#584595',
            action: (
                <Button variant="contained" color="secondary">
                    Start Exam
                </Button>
            ),
        },
        {
            title: 'Sign in to access exam logs',
            description: 'Keep track of your exams and stay organized',
            backgroundColor: '#e75480',
            action: (
                <Button variant="contained" color="secondary">
                    Sign in
                </Button>
            ),
        },
        {
            title: 'Stay updated with exam news',
            description: 'Never miss important announcements',
            backgroundColor: '#f1c40f',
        },
    ];

    const handleCarouselChange = (index) => {
        setCarouselIndex(index);
    };

    return (
        <MuiCarousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            selectedItem={carouselIndex}
            onChange={handleCarouselChange}
            interval={5000}
            infiniteLoop={true}
        >
            {carouselItems.map((item, index) => (
                <StyledSlide key={index} backgroundColor={item.backgroundColor}>
                    <Typography variant="h2" component="h2" sx={{ color: '#fff' }} gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center' }} gutterBottom>
                        {item.description}
                    </Typography>
                    {item.action}
                </StyledSlide>
            ))}
        </MuiCarousel>
    );
};

export default Carousel;

