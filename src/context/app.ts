import { getAxiosInstance } from '@src/config/axios';
import { createContext } from 'react';
import { config } from '../config';

const axiosInstance = getAxiosInstance(config.backendBaseUrl as string);

type AppContextType = {
    axios: typeof axiosInstance;
};

export const appContextValue = {
    axios: axiosInstance,
};

export const AppContext = createContext<AppContextType>(appContextValue);
