import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type IdTokenResult,
    type User,
} from 'firebase/auth';
import { useContext, useEffect, useState, type FC } from 'react';
import { AccessToken } from '@/utils/token';
import { AppContext } from '../app';
import { type TSignup, type TLogin, type TLogout, AuthContext } from '@src/context/auth';

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        firebase: { auth },
    } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const signup: TSignup = async ({ email, password }) => createUserWithEmailAndPassword(auth, email, password);
    const login: TLogin = async ({ email, password }) => signInWithEmailAndPassword(auth, email, password);
    const logout: TLogout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            const idTokenResult: IdTokenResult | undefined = await user?.getIdTokenResult();
            const token = idTokenResult?.token;
            AccessToken.set(token ?? '');

            setLoading(false);
        });
        return unsubscribe;
    });

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
