import axios from 'axios';
import {getCookie} from "./cookiesManager";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

export default axiosInstance;