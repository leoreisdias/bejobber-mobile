import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://192.168.0.10:3333',
    baseURL: 'https://bejobber-backend.herokuapp.com',
});

export default api;