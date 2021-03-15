import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://localhost:3333',
    baseURL: 'https://bejobber-backend.herokuapp.com',
});

export default api;