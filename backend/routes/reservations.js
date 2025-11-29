const express = require('express');
const router = express.Router();
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');

const RESERVATIONS_FILE = 'reservations.json';

// Get all reservations
router.get('/', (req, res) => {
    const reservations = readJSONFile(RESERVATIONS_FILE);
    // Sort by date descending
    reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(reservations);
});

// Create new reservation
router.post('/', (req, res) => {
    const reservations = readJSONFile(RESERVATIONS_FILE);

    const newReservation = {
        id: Date.now(),
        ...req.body,
        status: 'pending', // Default status
        createdAt: new Date().toISOString()
    };

    reservations.push(newReservation);

    if (writeJSONFile(RESERVATIONS_FILE, reservations)) {
        res.status(201).json(newReservation);
    } else {
        res.status(500).json({ message: 'Error saving reservation' });
    }
});

// Update reservation status
router.put('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    const reservations = readJSONFile(RESERVATIONS_FILE);
    const index = reservations.findIndex(r => r.id.toString() === id.toString());

    if (index === -1) {
        return res.status(404).json({ message: 'Reservation not found' });
    }

    reservations[index].status = status;
    reservations[index].updatedAt = new Date().toISOString();

    if (writeJSONFile(RESERVATIONS_FILE, reservations)) {
        res.json(reservations[index]);
    } else {
        res.status(500).json({ message: 'Error updating reservation' });
    }
});

module.exports = router;
