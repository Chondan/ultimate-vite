import { getAxiosInstance } from '@src/config/axios';
import { createContext } from 'react';
import { config } from '../config';
import { initializeFirebaseApp } from '@/config/firebase';

const { auth, db } = initializeFirebaseApp();
const axiosInstance = getAxiosInstance(config.backendBaseUrl as string, { auth });

type AppContextType = {
    axios: typeof axiosInstance;
    firebase: {
        auth: typeof auth;
        db: typeof db;
    };
};

export const appContextValue = {
    axios: axiosInstance,
    firebase: {
        auth,
        db,
    },
};

export const AppContext = createContext<AppContextType>(appContextValue);
