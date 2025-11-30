import { getApiUrl } from '../config/api';

const API_KEY = 'YOUR_EXCHANGERATE_API_KEY'; // Replace with actual API key if needed
const BASE_URL_EXCHANGE = 'https://v6.exchangerate-api.com/v6';

export const fetchRates = async () => {
    try {
        // Proxy through backend to avoid exposing API key
        const response = await fetch(getApiUrl('exchange-rates'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.result === 'success') {
            return data.conversion_rates;
        } else {
            console.error('Failed to fetch exchange rates:', data['error-type']);
            return null;
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
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
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch (error) {
        console.warn(`Could not format price for currency: ${currency}`, error);
        return `${amount.toFixed(2)} ${currency}`;
    }
};
