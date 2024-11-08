import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
    },
});

// Add this to use for handle Login 
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['accessToken'] = token;
    }
    return config;
});

// Function to make a GET request
export const get = async (endpoint, config = {}) => {
    const response = await apiClient.get(endpoint, config);
    return response.data;
};

// Function to make a POST request
export const post = async (endpoint, data) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
};

// Function to make a PUT request
export const put = async (endpoint, data) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
};

// Function to make a DELETE request
export const del = async (endpoint) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
};
