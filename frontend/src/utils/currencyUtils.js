import axios from 'axios';

const API_URL = 'http://localhost:3001/api/currency';

export const fetchRates = async () => {
    try {
        const response = await axios.get(`${API_URL}/rates`);
        return response.data.rates;
    } catch (error) {
        console.error('Error fetching rates:', error);
        return null;
    }
};

export const convertPrice = (amount, currency, rates) => {
    if (!rates || currency === 'TND') return amount;

    // Base is TND
    const rate = rates[currency];
    if (!rate) return amount;

    return (amount * rate).toFixed(2);
};

export const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};
