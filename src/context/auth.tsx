import { type User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export type TSignup = ({ email, password }: { email: string; password: string }) => void;
export type TLogin = ({ email, password }: { email: string; password: string }) => void;
export type TLogout = () => void;

export interface IAuthContext {
    currentUser: User | null;
    signup: TSignup;
    login: TLogin;
    logout: TLogout;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const useAuth = (): IAuthContext => useContext(AuthContext);
