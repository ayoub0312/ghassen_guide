const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock exchange rates (base TND)
// In a real app, you would fetch this from an external API like exchangerate-api.com
const exchangeRates = {
    TND: 1,
    EUR: 0.30,
    USD: 0.32,
    GBP: 0.25,
    PLN: 1.28,
    CAD: 0.44,
    CHF: 0.28
};

// Get current exchange rates
router.get('/rates', async (req, res) => {
    // Option to fetch real rates if API key is available
    // const response = await axios.get('API_URL');
    // res.json(response.data);

    res.json({
        base: 'TND',
        rates: exchangeRates
    });
});

// Convert amount
router.post('/convert', (req, res) => {
    const { amount, from, to } = req.body;

    if (!amount || !from || !to) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    // Simple conversion logic using mock rates (assuming base TND)
    // To convert FROM -> TO: (Amount / Rate_FROM) * Rate_TO

    const rateFrom = exchangeRates[from];
    const rateTo = exchangeRates[to];

    if (!rateFrom || !rateTo) {
        return res.status(400).json({ message: 'Invalid currency' });
    }

    const convertedAmount = (amount / rateFrom) * rateTo; // This logic assumes rates are relative to TND? 
    // Wait, if rates are 1 TND = X Currency
    // Then 100 TND * 0.30 = 30 EUR. Correct.
    // If I have 30 EUR and want TND: 30 / 0.30 = 100 TND.
    // If I have 30 EUR and want USD: (30 / 0.30) * 0.32 = 32 USD.

    // My rates above are 1 TND = X Currency.
    // So TND is base.

    // If input is in TND (from="TND"), output is amount * rateTo.
    // If input is in EUR (from="EUR"), we first convert to TND: amount / rateFrom.

    // Let's verify:
    // 100 TND to EUR: 100 * 0.30 = 30 EUR.
    // Formula: (100 / 1) * 0.30 = 30. Correct.

    // 30 EUR to TND: 30 / 0.30 = 100 TND.
    // Formula: (30 / 0.30) * 1 = 100. Correct.

    // 30 EUR to USD: (30 / 0.30) * 0.32 = 32 USD.
    // Formula: (30 / 0.30) * 0.32 = 32. Correct.

    res.json({
        amount,
        from,
        to,
        result: convertedAmount,
        rate: rateTo / rateFrom
    });
});

module.exports = router;
