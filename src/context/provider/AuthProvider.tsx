import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type IdTokenResult,
    type User,
} from 'firebase/auth';
import { useContext, useEffect, useState, type FC } from 'react';
import { AccessToken } from '@/utils/token';
import { AppContext } from '@/context/app';
import {
    AuthContext,
    type TSignup,
    type TLogin,
    type TLogout,
    type TLoginWithGoogle,
    type TReload,
    type TSendEmailToResetPassword,
} from '@src/context/auth';

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        firebase: { auth, googleProvider },
    } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const signup: TSignup = async ({ email, password }) => createUserWithEmailAndPassword(auth, email, password);
    const login: TLogin = async ({ email, password }) => signInWithEmailAndPassword(auth, email, password);
    const loginWithGoogle: TLoginWithGoogle = async () => {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const googleAccessToken = GoogleAuthProvider.credentialFromResult(userCredential);
        return {
            userCredential,
            googleAccessToken,
        };
    };
    const sendEmailToResetPassword: TSendEmailToResetPassword = async ({ email }) => sendPasswordResetEmail(auth, email);
    const logout: TLogout = () => signOut(auth);
    const reload: TReload = async () => {
        await auth.currentUser?.reload();
        setCurrentUser(auth.currentUser);
        setIsLoggedIn(auth.currentUser ? auth.currentUser.emailVerified : false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setIsLoggedIn(user ? user.emailVerified : false);

            try {
                const idTokenResult: IdTokenResult | undefined = await user?.getIdTokenResult();
                const token = idTokenResult?.token;
                AccessToken.set(token ?? '');
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        });
        return unsubscribe;
    });

    const value = {
        currentUser,
        isLoggedIn,
        signup,
        login,
        loginWithGoogle,
        sendEmailToResetPassword,
        logout,
        reload,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
