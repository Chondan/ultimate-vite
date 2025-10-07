import { AccessToken } from '@/utils/token';
import axios from 'axios';
import type { Auth } from 'firebase/auth';

export const getAxiosInstance = (baseURL: string, { auth }: { auth: Auth }) => {
    const axiosInstance = axios.create({
        baseURL: baseURL,
    });

    axiosInstance.interceptors.request.use(async (config) => {
        const token = await AccessToken.getBearerToken(auth);
        config.headers.Authorization = token;

        return config;
    });

    return axiosInstance;
};
