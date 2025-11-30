const express = require('express');
const router = express.Router();
const firebaseService = require('../services/firebaseService');

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await firebaseService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
});

// Create new reservation
router.post('/', async (req, res) => {
    try {
        const newReservation = await firebaseService.createReservation(req.body);
        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
});

// Update reservation status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const updatedReservation = await firebaseService.updateReservationStatus(req.params.id, status);

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.json(updatedReservation);
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Error updating reservation', error: error.message });
    }
});

module.exports = router;
