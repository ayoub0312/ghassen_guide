const express = require('express');
const router = express.Router();

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_CREDENTIALS = {
    email: 'ghassen2025@gmail.com',
    password: 'ghassen2025guide@@'
};

// Simple admin login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // In production, generate a JWT token here
        return res.json({
            success: true,
            message: 'Login successful',
            admin: {
                email: ADMIN_CREDENTIALS.email,
                name: 'Ghassen Admin'
            }
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
    });
});

// Verify admin session (simple check)
router.get('/verify', (req, res) => {
    // In production, verify JWT token here
    res.json({ success: true });
});

module.exports = router;
