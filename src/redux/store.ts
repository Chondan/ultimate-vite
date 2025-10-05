import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '@src/redux/_example/example.slice';
import { exampleApi } from '@src/redux/_example/example.api';

export const store = configureStore({
    reducer: {
        example: exampleReducer,
        [exampleApi.reducerPath]: exampleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exampleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
