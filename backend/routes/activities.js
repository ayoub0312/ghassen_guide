const express = require('express');
const router = express.Router();
const firebaseService = require('../services/firebaseService');

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await firebaseService.getAllActivities();
        res.json(activities);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await firebaseService.getActivityById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        console.error('Error fetching activity:', error);
        res.status(500).json({ message: 'Error fetching activity', error: error.message });
    }
});

// Create new activity
router.post('/', async (req, res) => {
    try {
        const { name, description, price, currency, duration, image } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newActivity = await firebaseService.createActivity({
            name,
            description,
            price,
            currency,
            duration,
            image
        });

        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ message: 'Error creating activity', error: error.message });
    }
});

// Update activity
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, currency, duration, image } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = parseFloat(price);
        if (currency) updateData.currency = currency;
        if (duration) updateData.duration = duration;
        if (image) updateData.image = image;

        const updatedActivity = await firebaseService.updateActivity(req.params.id, updateData);

        if (!updatedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.json(updatedActivity);
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ message: 'Error updating activity', error: error.message });
    }
});

// Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const deletedActivity = await firebaseService.deleteActivity(req.params.id);

        if (!deletedActivity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.json({ message: 'Activity deleted successfully', activity: deletedActivity });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ message: 'Error deleting activity', error: error.message });
    }
});

// Add a review to an activity
router.post('/:id/reviews', async (req, res) => {
    try {
        const { user, rating, comment, avatar } = req.body;

        if (!user || !rating || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newReview = await firebaseService.addReviewToActivity(req.params.id, {
            user,
            rating,
            comment,
            avatar
        });

        if (!newReview) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
});

module.exports = router;
