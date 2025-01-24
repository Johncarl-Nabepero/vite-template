import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
      sentryVitePlugin({
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN, // Use `process.env` for compatibility
        org: process.env.VITE_SENTRY_ORG,
        project: process.env.VITE_SENTRY_PROJECT,
        authToken: process.env.VITE_SENTRY_AUTH_TOKEN, // Use `process.env` for compatibility
    })],
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true,
    },
});