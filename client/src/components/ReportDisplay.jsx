import React, { useState } from 'react';
import ReportDisplayModal from './ReportDetailModal';

const ReportDisplay = ({ title, location, severity, description, category, longitude, latitude, createdAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const containerStyle = {
        backgroundColor: 'rgba(164, 164, 164, 0.1)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        color: 'white',
        maxWidth: '240px',
        margin: '10px auto',
        transition: 'outline 0.3s ease-in-out',
        cursor: 'pointer',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const textStyle = {
        marginBottom: '5px',
    };

    return (
        <div style={containerStyle} className="report-display" onClick={openModal}>
            <h2 style={titleStyle}>{title}</h2>
            <p style={textStyle}>Location: {location}</p>
            <p style={textStyle}>Severity: {severity}</p>

            <ReportDisplayModal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                report={{ title, location, severity, description, category, longitude, latitude, createdAt }} 
            />
        </div>
    );
};

export default ReportDisplay;