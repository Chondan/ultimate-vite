import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupPage } from '@/pages/Auth/SingupPage.tsx';
import { LoginPage } from '@/pages/Auth/LoginPage.tsx';
import { AppPage } from './pages/AppPage.tsx';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage.tsx';
import { Toaster } from './components/ui/Sonner.tsx';
import { LandingPage } from './pages/Landing/LandingPage.tsx';

export const RoutesApp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
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
