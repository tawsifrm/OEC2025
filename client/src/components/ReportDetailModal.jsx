import React from 'react';

const ReportDisplayModal = ({ isOpen, onRequestClose, report }) => {
    const { title, location, severity, description, category, longitude, latitude, createdAt } = report;

    if (!isOpen) return null; 

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>{title}</h2>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Severity:</strong> {severity}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
                <button onClick={onRequestClose} style={buttonStyle}>
                    Close
                </button>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, 
};

const modalStyle = {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const buttonStyle = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default ReportDisplayModal;