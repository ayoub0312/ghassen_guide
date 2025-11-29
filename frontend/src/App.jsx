import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import Activities from './components/Activities';
import Footer from './components/Footer';
import { fetchRates } from './utils/currencyUtils';
import './App.css';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ActivitiesManager from './components/admin/ActivitiesManager';
import ReservationsManager from './components/admin/ReservationsManager';
import Preloader from './components/Preloader';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const adminAuth = JSON.parse(localStorage.getItem('adminAuth') || '{}');
    if (!adminAuth.email) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
};

function App() {
    const [currentCurrency, setCurrentCurrency] = useState('TND');
    const [rates, setRates] = useState(null);
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        const getRates = async () => {
            const fetchedRates = await fetchRates();
            setRates(fetchedRates);
        };
        getRates();
    }, []);

    return (
        <div className="app">
            <Preloader />
            {!isAdminRoute && (
                <Navbar
                    currentCurrency={currentCurrency}
                    onCurrencyChange={setCurrentCurrency}
                />
            )}

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                    <>
                        <Hero />
                        <VideoShowcase />
                        <Activities
                            currentCurrency={currentCurrency}
                            rates={rates}
                        />
                    </>
                } />
                <Route path="/activity/:id" element={
                    <ActivityDetails
                        currentCurrency={currentCurrency}
                        rates={rates}
                    />
                } />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/activities" element={
                    <ProtectedRoute>
                        <ActivitiesManager />
                    </ProtectedRoute>
                } />
                <Route path="/admin/reservations" element={
                    <ProtectedRoute>
                        <ReservationsManager />
                    </ProtectedRoute>
                } />
            </Routes>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;
