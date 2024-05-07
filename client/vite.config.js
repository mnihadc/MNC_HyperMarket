import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    autoprefixer()
    // Add other plugins here as needed
  ],
  build: {
    sourcemap: true,
    target: 'esnext',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
});
