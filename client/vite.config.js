// vite.config.js
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [react(), tailwindcss(), autoprefixer()],
};
