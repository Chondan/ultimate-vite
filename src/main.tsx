import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContext, appContextValue } from './context/app.ts';
import { ThemeProvider } from './context/provider/ThemeProvider.tsx';
import { AuthProvider } from './context/provider/AuthProvider.tsx';
import { RoutesApp } from './Routes.tsx';
import './index.css';

const reactQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContext.Provider value={appContextValue}>
            <QueryClientProvider client={reactQueryClient}>
                <Provider store={store}>
                    <AuthProvider>
                        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
                            <RoutesApp />
                        </ThemeProvider>
                    </AuthProvider>
                </Provider>
            </QueryClientProvider>
        </AppContext.Provider>
    </StrictMode>
);
