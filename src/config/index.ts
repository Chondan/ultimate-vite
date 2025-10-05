export const config = {
    environment: import.meta.env.MODE,
    appName: import.meta.env.VITE_APP_NAME,
    backendBaseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    firebase: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        firestoreDomain: import.meta.env.VITE_FIREBASE_FIRESTORE_DOMAIN,
    },
};
