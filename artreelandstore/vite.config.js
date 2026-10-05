import { env } from 'node:process';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    base: env.PAGES_BUILD === 'true'
        ? '/ArtreelandStore/'
        : '/',
    plugins: [plugin()],
    server: {
        port: 61244,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
        },
    }
})