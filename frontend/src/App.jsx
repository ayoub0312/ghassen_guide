import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import Activities from './components/Activities';
import Footer from './components/Footer';
import { CurrencyProvider } from './context/CurrencyContext';
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
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <CurrencyProvider>
            <div className="app">
                <Preloader />
                {!isAdminRoute && (
                    <Navbar />
                )}

                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={
                        <>
                            <Hero />
                            <VideoShowcase />
                            <Activities />
                        </>
                    } />
                    <Route path="/activity/:id" element={
                        <ActivityDetails />
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
        </CurrencyProvider>
    );
}

export default App;
