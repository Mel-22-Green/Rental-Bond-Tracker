import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add token to requests if it exists
API.interceptors.request.use((req) => {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        req.headers.Authorization = `Bearer ${userData.token}`;
    }
    return req;
});

export default API;