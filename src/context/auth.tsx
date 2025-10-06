import { OAuthCredential, type User, type UserCredential } from 'firebase/auth';
import { createContext, useContext } from 'react';

export type TSignup = ({ email, password }: { email: string; password: string }) => Promise<UserCredential>;
export type TLogin = ({ email, password }: { email: string; password: string }) => Promise<UserCredential>;
export type TLoginWithGoogle = () => Promise<{ userCredential: UserCredential; googleAccessToken: OAuthCredential | null }>;
export type TSendEmailToResetPassword = ({ email }: { email: string }) => Promise<void>;
export type TLogout = () => void;
export type TReload = () => Promise<void>;

export interface IAuthContext {
    currentUser: User | null;
    isLoggedIn: boolean;
    signup: TSignup;
    login: TLogin;
    loginWithGoogle: TLoginWithGoogle;
    sendEmailToResetPassword: TSendEmailToResetPassword;
    logout: TLogout;
    reload: TReload;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const useAuth = (): IAuthContext => useContext(AuthContext);
