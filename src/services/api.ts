import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://0.0.0.0:3333',
    baseURL: 'https://bejobber-backend.herokuapp.com',
});

export default api;