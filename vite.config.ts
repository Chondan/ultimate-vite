import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    envDir: resolve(__dirname, './env'),
    envPrefix: 'VITE_',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
        },
    },
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
});
