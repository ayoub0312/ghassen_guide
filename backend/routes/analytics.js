const express = require('express');
const router = express.Router();
const { readJSONFile } = require('../utils/fileUtils');

// Get dashboard analytics
router.get('/dashboard', (req, res) => {
    const activities = readJSONFile('activities.json');
    const reservations = readJSONFile('reservations.json');

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
});

// Get reservations by month
router.get('/reservations-by-month', (req, res) => {
    const reservations = readJSONFile('reservations.json');

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
});

// Get revenue by activity
router.get('/revenue-by-activity', (req, res) => {
    const reservations = readJSONFile('reservations.json');

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
});

module.exports = router;
