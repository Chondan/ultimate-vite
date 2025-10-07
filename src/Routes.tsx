import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignupPage } from '@/pages/Auth/SingupPage.tsx';
import { LoginPage } from '@/pages/Auth/LoginPage.tsx';
import { AppPage } from './pages/AppPage.tsx';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage.tsx';
import { Toaster } from './components/ui/Sonner.tsx';
import { LandingPage } from './pages/Landing/LandingPage.tsx';
import { ConditionalRender } from './components/ConditionalRender/ConditionalRender.tsx';
import { ConditionalRenderPlugins } from './components/ConditionalRender/plugins.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/signup',
        element: (
            <ConditionalRender conditionalRenders={[{ conditions: [ConditionalRenderPlugins.isLoggedIn], redirectTo: '/app' }]}>
                <SignupPage />
            </ConditionalRender>
        ),
    },
    {
        path: '/login',
        element: (
            <ConditionalRender conditionalRenders={[{ conditions: [ConditionalRenderPlugins.isLoggedIn], redirectTo: '/app' }]}>
                <LoginPage />
            </ConditionalRender>
        ),
    },
    {
        path: '/forgot-password',
        element: (
            <ConditionalRender conditionalRenders={[{ conditions: [ConditionalRenderPlugins.isLoggedIn], redirectTo: '/app' }]}>
                <ForgotPasswordPage />
            </ConditionalRender>
        ),
    },
    {
        path: '/app',
        element: (
            <ConditionalRender
                conditionalRenders={[{ conditions: [ConditionalRenderPlugins.isNotLoggedIn], redirectTo: '/login' }]}
            >
                <AppPage />
            </ConditionalRender>
        ),
        children: [{ path: 'settings/', element: <div>Settings</div> }],
    },
]);

export const Routes = () => {
    return (
        <>
            <RouterProvider router={router} />
            <Toaster position='top-right' />
        </>
    );
};
