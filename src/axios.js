import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://whatsapp-mern-backend-fami.herokuapp.com'
});

export default instance;