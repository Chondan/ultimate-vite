import axios from 'axios';

export const getAxiosInstance = (baseURL: string) => {
    const axiosInstance = axios.create({
        baseURL: baseURL,
    });

    axiosInstance.interceptors.request.use(async (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return axiosInstance;
};
