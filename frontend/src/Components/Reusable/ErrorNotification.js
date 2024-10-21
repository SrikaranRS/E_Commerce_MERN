// ErrorNotification.js
import React from 'react';
import './reusable.css'; // You can style this component with CSS

const ErrorNotification = ({ message, onClose }) => {
    if (!message) return null; // Don't render if there's no message

    return (
        <div className="error-notification">
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default ErrorNotification;
