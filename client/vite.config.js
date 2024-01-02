// vite.config.js
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      },
    },
  },
  plugins: [react(), tailwindcss(), autoprefixer()],
};
