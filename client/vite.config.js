import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react(), tailwindcss(), autoprefixer()],
  build: {
    // Ensure sourcemaps are generated for debugging
    sourcemap: true,
    // Set target to 'esnext' for better compatibility with modern browsers
    target: 'esnext',
  },
  server: {
    // Add proxy configuration if needed
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
