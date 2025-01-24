import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sentryVitePlugin({
      org: process.env.VITE_SENTRY_ORG,
      project: process.env.VITE_SENTRY_PROJECT,
      authToken: process.env.VITE_SENTRY_AUTH_TOKEN, // Use `process.env` for compatibility
  }), sentryVitePlugin({
        org: "john-carl",
        project: "vite-test"
    })],
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true,
    },
});