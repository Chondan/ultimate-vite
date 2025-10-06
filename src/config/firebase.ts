import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth';
import { config } from '.';

export const initializeFirebaseApp = () => {
    const googleProvider = new GoogleAuthProvider();

    if (config.environment === 'dev') {
        console.log('Initializing firebase app with emulator...');
        const firebaseApp = initializeApp({
            apiKey: config.firebase.apiKey,
            projectId: config.firebase.projectId,
        });
        const auth = getAuth(firebaseApp);
        const db = getFirestore(firebaseApp);
        const [fireStoreHost, fireStorePort] = config.firebase.firestoreDomain.split(':');
        connectFirestoreEmulator(db, fireStoreHost, fireStorePort);
        connectAuthEmulator(auth, config.firebase.authDomain);

        return { auth, db, googleProvider };
    }

    console.log('Initializing firebase app...');
    const firebaseApp = initializeApp({
        apiKey: config.firebase.apiKey,
        projectId: config.firebase.projectId,
        authDomain: config.firebase.authDomain,
        databaseURL: config.firebase.firestoreDomain,
    });
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    return { auth, db, googleProvider };
};
