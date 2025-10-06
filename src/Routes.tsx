import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupPage } from '@/components/sign-up.tsx';
import { LoginPage } from '@/components/login.tsx';
import { Workspace } from './pages/Workspace.tsx';
import { Toaster } from 'sonner';
import App from './App.tsx';
import { useTheme } from './components/theme-provider.tsx';
import { ForgotPasswordPage } from './components/forgot-password.tsx';

export const RoutesApp = () => {
    const { theme } = useTheme();
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                    <Route path='/app' element={<Workspace />} />
                </Routes>
            </BrowserRouter>
            <Toaster theme={theme === 'dark' ? 'light' : 'dark'} position='top-right' />
        </>
    );
};
