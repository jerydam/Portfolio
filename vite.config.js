import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',        // Good start — try 'es2015' if still issues on very old iOS
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,   // Helps with some chunk loading issues
      },
    },
  },
  // If deploying to GitHub Pages or a subfolder, uncomment and set correctly:
  // base: '/',   // or '/your-repo-name/' for GitHub Pages
});