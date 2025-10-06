import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupPage } from '@/pages/Auth/SingupPage.tsx';
import { LoginPage } from '@/pages/Auth/LoginPage.tsx';
import { AppPage } from './pages/AppPage.tsx';
import App from './Landing.tsx';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage.tsx';
import { Toaster } from './components/ui/Toaster.tsx';

export const RoutesApp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/signup' element={<SignupPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                    <Route path='/app' element={<AppPage />} />
                </Routes>
            </BrowserRouter>
            <Toaster position='top-right' />
        </>
    );
};
