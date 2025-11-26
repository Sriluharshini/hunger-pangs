import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

// attach token in Authorization header as Bearer token
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default {
    get: (url, cfg) => API.get(url, cfg),
    post: (url, body, cfg) => API.post(url, body, cfg),
    put: (url, body, cfg) => API.put(url, body, cfg),
    delete: (url, cfg) => API.delete(url, cfg),

    // convenience methods
    claimDonation: (id) => API.put(`/api/donations/${id}/claim`),
    completeDonation: (id) => API.put(`/api/donations/${id}/complete`)
};
