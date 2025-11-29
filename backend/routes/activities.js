const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');

// Get all activities
router.get('/', (req, res) => {
    const activities = readJSONFile('activities.json');
    res.json(activities);
});

// Get activity by ID
router.get('/:id', (req, res) => {
    const activities = readJSONFile('activities.json');
    const activity = activities.find(a => a.id === parseInt(req.params.id));
    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }
    res.json(activity);
});

// Create new activity
router.post('/', (req, res) => {
    const activities = readJSONFile('activities.json');
    const { name, description, price, currency, duration, image } = req.body;

    if (!name || !description || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newActivity = {
        id: activities.length > 0 ? Math.max(...activities.map(a => a.id)) + 1 : 1,
        name,
        description,
        price: parseFloat(price),
        currency: currency || 'TND',
        duration: duration || '1h',
        image: image || 'default.jpg',
        reviews: []
    };

    activities.push(newActivity);

    if (writeJSONFile('activities.json', activities)) {
        res.status(201).json(newActivity);
    } else {
        res.status(500).json({ message: 'Error saving activity' });
    }
});

// Update activity
router.put('/:id', (req, res) => {
    const activities = readJSONFile('activities.json');
    const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id));

    if (activityIndex === -1) {
        return res.status(404).json({ message: 'Activity not found' });
    }

    const { name, description, price, currency, duration, image } = req.body;

    // Update only provided fields
    if (name) activities[activityIndex].name = name;
    if (description) activities[activityIndex].description = description;
    if (price) activities[activityIndex].price = parseFloat(price);
    if (currency) activities[activityIndex].currency = currency;
    if (duration) activities[activityIndex].duration = duration;
    if (image) activities[activityIndex].image = image;

    if (writeJSONFile('activities.json', activities)) {
        res.json(activities[activityIndex]);
    } else {
        res.status(500).json({ message: 'Error updating activity' });
    }
});

// Delete activity
router.delete('/:id', (req, res) => {
    const activities = readJSONFile('activities.json');
    const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id));

    if (activityIndex === -1) {
        return res.status(404).json({ message: 'Activity not found' });
    }

    const deletedActivity = activities.splice(activityIndex, 1)[0];

    if (writeJSONFile('activities.json', activities)) {
        res.json({ message: 'Activity deleted successfully', activity: deletedActivity });
    } else {
        res.status(500).json({ message: 'Error deleting activity' });
    }
});

// Add a review to an activity
router.post('/:id/reviews', (req, res) => {
    const activities = readJSONFile('activities.json');
    const activityId = parseInt(req.params.id);
    const activityIndex = activities.findIndex(a => a.id === activityId);

    if (activityIndex === -1) {
        return res.status(404).json({ message: 'Activity not found' });
    }

    const { user, rating, comment, avatar } = req.body;

    if (!user || !rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReview = {
        id: Date.now(),
        user,
        rating,
        comment,
        avatar: avatar || null,
        date: new Date().toISOString()
    };

    if (!activities[activityIndex].reviews) {
        activities[activityIndex].reviews = [];
    }

    activities[activityIndex].reviews.unshift(newReview);

    if (writeJSONFile('activities.json', activities)) {
        res.status(201).json(newReview);
    } else {
        res.status(500).json({ message: 'Error saving review' });
    }
});

module.exports = router;
