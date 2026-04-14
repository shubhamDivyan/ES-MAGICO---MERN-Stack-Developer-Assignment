import axios from 'axios';

const API = axios.create({
    
    baseURL: 'https://es-magico-mern-stack-developer-assignment.onrender.com/api', 
});

// Interceptor to attach JWT Token
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;