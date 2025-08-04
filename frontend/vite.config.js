import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'], // Add this line
    include: ['src/tests/**/*.{test,spec}.jsx'],
    // Add these for better compatibility
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});