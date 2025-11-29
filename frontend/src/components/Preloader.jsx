import React, { useState, useEffect } from 'react';
import './Preloader.css';
import ghassenLogo from '../assets/ghassen-logo.png';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (minimum 2 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
            <div className="preloader-content">
                <div className="logo-container">
                    <div className="rotating-guard"></div>
                    <img src={ghassenLogo} alt="Ghassen Guide" className="preloader-logo" />
                </div>
                <p className="preloader-text">Explore. Discover. Live.</p>
            </div>
        </div>
    );
};

export default Preloader;
