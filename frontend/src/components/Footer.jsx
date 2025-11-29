import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import loomensLogo from '../assets/loomens-logo.jpg';
import ghassenLogo from '../assets/ghassen-logo.png';

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <img src={ghassenLogo} alt="Ghassen Guide" className="footer-logo" />
                        <p>{t('footer_desc') || 'Your ultimate guide to exploring the wonders of Djerba.'}</p>
                    </div>
                    <div className="footer-links">
                        <h4>{t('quick_links') || 'Quick Links'}</h4>
                        <ul>
                            <li><a href="#home">{t('home') || 'Home'}</a></li>
                            <li><a href="#activities">{t('activities') || 'Activities'}</a></li>
                            <li><a href="#contact">{t('contact') || 'Contact'}</a></li>
                        </ul>
                    </div>
                    <div className="footer-contact">
                        <h4>{t('contact_us') || 'Contact Us'}</h4>
                        <p>Email: contact@ghassenguide.com</p>
                        <p>Phone: +216 20 642 540</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Ghassen Travel Guide. All rights reserved.</p>
                    <p className="developer-credit">
                        Développé par <a href="https://www.loomens.com/" target="_blank" rel="noopener noreferrer" className="loomense-link">
                            <img src={loomensLogo} alt="Loomens Logo" className="loomens-logo" />
                            Loomens
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
