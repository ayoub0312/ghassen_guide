const express = require('express');
const router = express.Router();
const firebaseService = require('../services/firebaseService');

// Get dashboard analytics
router.get('/dashboard', async (req, res) => {
    try {
        const activities = await firebaseService.getAllActivities();
        const reservations = await firebaseService.getAllReservations();

        // Calculate total revenue by currency
        const revenueByCurrency = reservations.reduce((acc, reservation) => {
            const currency = reservation.currency || 'TND';
            if (!acc[currency]) {
                acc[currency] = 0;
            }
            acc[currency] += reservation.totalPrice || 0;
            return acc;
        }, {});

        // Get popular activities
        const activityCounts = reservations.reduce((acc, reservation) => {
            const activityId = reservation.activityId;
            if (!acc[activityId]) {
                acc[activityId] = {
                    id: activityId,
                    name: reservation.activityName,
                    count: 0,
                    revenue: 0
                };
            }
            acc[activityId].count += 1;
            acc[activityId].revenue += reservation.totalPrice || 0;
            return acc;
        }, {});

        const popularActivities = Object.values(activityCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        // Get recent reservations
        const recentReservations = reservations
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        // Calculate monthly trends (last 6 months)
        const monthlyData = {};
        reservations.forEach(reservation => {
            const date = new Date(reservation.createdAt);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: monthKey,
                    reservations: 0,
                    revenue: 0
                };
            }
            monthlyData[monthKey].reservations += 1;
            monthlyData[monthKey].revenue += reservation.totalPrice || 0;
        });

        const monthlyTrends = Object.values(monthlyData)
            .sort((a, b) => a.month.localeCompare(b.month))
            .slice(-6);

        // Status breakdown
        const statusBreakdown = reservations.reduce((acc, reservation) => {
            const status = reservation.status || 'pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        res.json({
            totalReservations: reservations.length,
            totalActivities: activities.length,
            revenueByCurrency: revenueByCurrency,
            popularActivities,
            recentReservations,
            monthlyTrends,
            statusBreakdown
        });
    } catch (error) {
        console.error('Error fetching dashboard analytics:', error);
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
    }
});

// Get reservations by month
router.get('/reservations-by-month', async (req, res) => {
    try {
        const reservations = await firebaseService.getAllReservations();

        const monthlyData = {};
        reservations.forEach(reservation => {
            const date = new Date(reservation.createdAt);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
        });

        const data = Object.entries(monthlyData).map(([month, count]) => ({
            month,
            reservations: count
        }));

        res.json(data);
    } catch (error) {
        console.error('Error fetching reservations by month:', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Get revenue by activity
router.get('/revenue-by-activity', async (req, res) => {
    try {
        const reservations = await firebaseService.getAllReservations();

        const activityRevenue = reservations.reduce((acc, reservation) => {
            const activityName = reservation.activityName;
            if (!acc[activityName]) {
                acc[activityName] = 0;
            }
            acc[activityName] += reservation.totalPrice || 0;
            return acc;
        }, {});

        const data = Object.entries(activityRevenue).map(([name, revenue]) => ({
            name,
            revenue
        }));

        res.json(data);
    } catch (error) {
        console.error('Error fetching revenue by activity:', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

module.exports = router;
