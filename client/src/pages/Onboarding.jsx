import React from 'react';
import { useNavigate } from 'react-router-dom';


// earth css was acquired from this link: https://codepen.io/jamesfinn180/pen/VwzENbR
const Onboarding = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/signlogin');
    };

    const styles = {
        body: {
            margin: 0,
            overflow: 'hidden',
        },
        onboardingContainer: {
            position: 'relative',
            height: '100vh',
            backgroundColor: '#000',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        planetContainer: {
            borderRadius: '50%',
            boxShadow: '5px -3px 10px 3px #5e90f1',
            height: '500px',
            overflow: 'hidden',
            position: 'absolute',
            width: '500px',
            zIndex: 1,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
        },
        night: {
            animation: 'rotate-night 80s linear infinite',
            backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg)',
            backgroundSize: '200%',
            height: '500px',
            position: 'absolute',
            width: '500px',
            zIndex: 2,
        },
        day: {
            animation: 'rotate-day 80s linear infinite',
            backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg)',
            backgroundSize: '200%',
            borderLeft: 'solid 1px black',
            borderRadius: '50%',
            boxShadow: '5px 0 20px 10px #040615 inset',
            height: '500px',
            marginLeft: '110px',
            position: 'absolute',
            width: '500px',
            zIndex: 3,
        },
        clouds: {
            animation: 'rotate-day 50s linear infinite, spin-clouds 100s ease infinite',
            backgroundImage: 'url(https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg)',
            backgroundSize: '200%',
            borderRadius: '50%',
            boxShadow: '5px 0 20px 10px #040615 inset, -9px 0px 20px 10px #5e90f1 inset',
            height: '500px',
            marginLeft: '100px',
            opacity: 0.45,
            position: 'absolute',
            width: '500px',
            zIndex: 4,
        },
        innerShadow: {
            background: 'transparent',
            borderRadius: '50%',
            boxShadow: '-5px 0 10px 1px #152b57 inset, 5px 0 10px 1px #040615 inset',
            height: '500px',
            marginLeft: 0,
            position: 'absolute',
            width: '500px',
            zIndex: 5,
        },
        content: {
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
        },
        nextButton: {
            padding: '10px 20px',
            backgroundColor: '#1e90ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px',
        },
        '@keyframes rotate-day': {
            '0%': { backgroundPosition: '120% 0' },
            '100%': { backgroundPosition: '-80% 0' },
        },
        '@keyframes rotate-night': {
            '0%': { backgroundPosition: 'calc(120% + 120px) 0' },
            '100%': { backgroundPosition: 'calc(-80% + 120px) 0' },
        },
        '@keyframes spin-clouds': {
            '0%': { transform: 'rotate(0deg)' },
            '50%': { transform: 'rotate(20deg)' },
            '100%': { transform: 'rotate(0deg)' },
        },
    };

    return (
        <div style={styles.onboardingContainer}>
            <div style={styles.planetContainer}>
                <div style={styles.night}></div>
                <div style={styles.day}></div>
                <div style={styles.clouds}></div>
                <div style={styles.innerShadow}></div>
            </div>
            <div style={styles.content}>
                <h1>Your Eyes on the Ground</h1>
                <button style={styles.nextButton} onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Onboarding;