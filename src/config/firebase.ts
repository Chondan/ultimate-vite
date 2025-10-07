import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';
import { config } from '.';

export const initializeFirebaseApp = () => {
    const firebaseApp = initializeApp({
        apiKey: config.firebase.apiKey,
        projectId: config.firebase.projectId,
        authDomain: config.firebase.authDomain,
        databaseURL: config.firebase.firestoreDomain,
    });
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const googleProvider = new GoogleAuthProvider();

    if (config.environment === 'dev') {
        const [fireStoreHost, fireStorePort] = config.firebase.firestoreDomain.split(':');
        connectFirestoreEmulator(db, fireStoreHost, fireStorePort);
        connectAuthEmulator(auth, config.firebase.authDomain);
    }

    return { auth, db, googleProvider };
};
