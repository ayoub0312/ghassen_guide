import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

// Import generated images
import heroBg from '../assets/hero.png';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <div className="hero" id="home">
            <div
                className="hero-background"
                style={{ backgroundImage: `url(${heroBg})` }}
            ></div>

            <div className="hero-overlay"></div>

            <div className="hero-content">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {t('hero_title') || "Discover Djerba's Hidden Gems"}
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    {t('hero_subtitle') || "Experience the magic of the island of dreams with our exclusive activities."}
                </motion.p>

                <motion.a
                    href="#activities"
                    className="hero-btn"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {t('book_now') || "Book Now"}
                </motion.a>
            </div>
        </div>
    );
};

export default Hero;
