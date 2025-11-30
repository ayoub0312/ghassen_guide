// API Configuration
// In development, this uses localhost:3001
// In production, this should be set to the deployed backend URL via environment variables

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getApiUrl = (endpoint) => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    return `${API_BASE_URL}/api/${cleanEndpoint}`;
};

export const BASE_URL = API_BASE_URL;

export default API_BASE_URL;
