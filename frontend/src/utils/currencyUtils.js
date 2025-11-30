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
