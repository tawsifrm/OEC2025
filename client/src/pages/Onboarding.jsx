import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Onboarding.css";

const Onboarding = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/signlogin');
    };

        return (
            <div className="onboarding-container">
                <div className="planet-container">
                    <div className="night"></div>
                    <div className="day"></div>
                    <div className="clouds"></div>
                    <div className="inner-shadow"></div>
                </div>
                <div className="content">
                    <h1>Your Eyes on the Ground</h1>
                    <button className="next-button" onClick={handleNext}>Next</button>
                </div>
            </div>
        );
    };
    
    export default Onboarding;