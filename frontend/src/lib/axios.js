import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://chat-app-1-backend.onrender.com/api', // Replace with your backend's base URL
    
    withCredentials: true, // To include cookies for authentication
});

export default axiosInstance;
