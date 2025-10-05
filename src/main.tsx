import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContext, appContextValue } from './context/app.ts';

const reactQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContext.Provider value={appContextValue}>
            <QueryClientProvider client={reactQueryClient}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<App />} />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </QueryClientProvider>
        </AppContext.Provider>
    </StrictMode>
);
