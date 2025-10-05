import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { config } from '.';

export const initializeFirebaseApp = () => {
    const firebaseApp = initializeApp({
        apiKey: config.firebase.apiKey,
        projectId: config.firebase.projectId,
    });
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    if (config.environment === 'dev') {
        console.log('Initializing firebase emulator...');
        const [fireStoreHost, fireStorePort] = config.firebase.firestoreDomain.split(':');
        connectFirestoreEmulator(db, fireStoreHost, fireStorePort);
        connectAuthEmulator(auth, config.firebase.authDomain);
    }

    return { auth, db };
};
