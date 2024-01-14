import axios from 'axios';
import {getCookie} from "./cookiesManager";

const axiosInstance = axios.create({
    baseURL: 'http://156.17.234.83:8080'
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = getCookie("accessToken")

        if (!config.headers['Content-Type'])
            config.headers['Content-Type'] = 'application/json'
        if (accessToken) {
            if (!config.headers['Authorization'])
                config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    async (error) => {
        return Promise.reject(error)
    }
);

export default axiosInstance;