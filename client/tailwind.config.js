// tailwind.config.js

const { defineConfig } = require('tailwindcss');

module.exports = defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
