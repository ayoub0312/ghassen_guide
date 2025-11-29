import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import ghassenLogo from '../assets/ghassen-logo.png';

const Navbar = ({ currentCurrency, onCurrencyChange }) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
    const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname === '/') {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(`/#${targetId}`);
            // Optional: Add a small timeout to allow navigation to complete before scrolling
            // But usually browser handles hash navigation automatically
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const languages = [
        { code: 'fr', name: 'Français' },
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
        { code: 'it', name: 'Italiano' },
        { code: 'pl', name: 'Polski' },
        { code: 'de', name: 'Deutsch' },
        { code: 'es', name: 'Español' }
    ];

    const currencies = ['TND', 'EUR', 'USD', 'GBP', 'PLN', 'CAD', 'CHF'];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setLanguageDropdownOpen(false);
        setIsOpen(false);
    };

    const changeCurrency = (curr) => {
        onCurrencyChange(curr);
        setCurrencyDropdownOpen(false);
        setIsOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="/" className="navbar-logo" onClick={(e) => handleNavigation(e, 'home')}>
                    <img src={ghassenLogo} alt="Ghassen Guide" className="navbar-logo-img" />
                    <span>Ghassen Guide</span>
                </a>

                <div className="navbar-menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </div>

                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <a href="#home" className="navbar-link" onClick={(e) => handleNavigation(e, 'home')}>{t('home')}</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#activities" className="navbar-link" onClick={(e) => handleNavigation(e, 'activities')}>{t('activities')}</a>
                    </li>

                    <li className={`navbar-item dropdown ${languageDropdownOpen ? 'active' : ''}`}>
                        <div className="dropdown-toggle" onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}>
                            <Globe size={18} />
                            <span>{languages.find(l => l.code === i18n.language)?.name || 'Language'}</span>
                        </div>
                        <div className="dropdown-menu">
                            {languages.map((lang) => (
                                <div
                                    key={lang.code}
                                    className="dropdown-item"
                                    onClick={() => changeLanguage(lang.code)}
                                >
                                    {lang.name}
                                </div>
                            ))}
                        </div>
                    </li>

                    <li className={`navbar-item dropdown ${currencyDropdownOpen ? 'active' : ''}`}>
                        <div className="dropdown-toggle" onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}>
                            <DollarSign size={18} />
                            <span>{currentCurrency}</span>
                        </div>
                        <div className="dropdown-menu">
                            {currencies.map((curr) => (
                                <div
                                    key={curr}
                                    className="dropdown-item"
                                    onClick={() => changeCurrency(curr)}
                                >
                                    {curr}
                                </div>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
