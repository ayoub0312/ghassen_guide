import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './VideoShowcase.css';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';

// Videos from Ghassen
const videos = [
    {
        id: 1,
        src: video1,
        title: "Djerba Adventures"
    },
    {
        id: 2,
        src: video2,
        title: "Island Paradise"
    },
    {
        id: 3,
        src: video3,
        title: "SaveGram App"
    },
    {
        id: 4,
        src: video4,
        title: "Desert Safari"
    },
    {
        id: 5,
        src: video5,
        title: "Cultural Tour"
    }
];

const VideoShowcase = () => {
    const { t } = useTranslation();

    return (
        <section className="video-showcase-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>{t('discover_djerba') || 'Discover Djerba'}</h2>
                    <p>{t('immersive_experience') || 'Immerse yourself in the island of dreams'}</p>
                </motion.div>

                <div className="phones-grid">
                    {videos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            className="phone-container"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="iphone-frame">
                                <div className="notch"></div>
                                <div className="screen">
                                    <video
                                        src={video.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="video-content"
                                    />
                                    <div className="video-overlay">
                                        <span>{video.title}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
