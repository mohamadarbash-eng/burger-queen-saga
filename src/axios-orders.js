import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-queen-92f6d.firebaseio.com/'
});

export default axiosInstance;
