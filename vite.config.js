import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from the custom .env.frontend file
dotenv.config({ path: '.env.frontend' });

export default defineConfig({
    plugins: [sentryVitePlugin({
        org: "john-carl",
        project: "vite-test",
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
    })],
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true,
    },
});