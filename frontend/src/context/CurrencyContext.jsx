import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchRates } from '../utils/currencyUtils';

const CurrencyContext = createContext();

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider = ({ children }) => {
    const [currentCurrency, setCurrentCurrency] = useState('TND');
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const getRates = async () => {
            const fetchedRates = await fetchRates();
            setRates(fetchedRates);
        };
        getRates();
    }, []);

    const value = {
        currentCurrency,
        setCurrentCurrency,
        rates
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
