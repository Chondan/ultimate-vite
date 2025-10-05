import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContext, appContextValue } from './context/app.ts';
import { ThemeProvider } from './components/theme-provider.tsx';
import { SignupPage } from '@/components/sign-up.tsx';
import { LoginPage } from '@/components/login.tsx';
import { Workspace } from './pages/Workspace.tsx';
import { AuthProvider } from './context/provider/AuthProvider.tsx';

const reactQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContext.Provider value={appContextValue}>
            <QueryClientProvider client={reactQueryClient}>
                <Provider store={store}>
                    <AuthProvider>
                        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                            <BrowserRouter>
                                <Routes>
                                    <Route path='/' element={<App />} />
                                    <Route path='/login' element={<LoginPage />} />
                                    <Route path='/signup' element={<SignupPage />} />
                                    <Route path='/app' element={<Workspace />} />
                                </Routes>
                            </BrowserRouter>
                        </ThemeProvider>
                    </AuthProvider>
                </Provider>
            </QueryClientProvider>
        </AppContext.Provider>
    </StrictMode>
);
