import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api', // Replace with your backend's base URL
    
    withCredentials: true, // To include cookies for authentication
});

export default axiosInstance;
