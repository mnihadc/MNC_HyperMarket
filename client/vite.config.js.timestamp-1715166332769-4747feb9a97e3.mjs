// vite.config.js
import react from "file:///C:/Users/Asus/Desktop/MERN-PRO/MNC_Shopping-Cart/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Asus/Desktop/MERN-PRO/MNC_Shopping-Cart/client/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///C:/Users/Asus/Desktop/MERN-PRO/MNC_Shopping-Cart/client/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/Asus/Desktop/MERN-PRO/MNC_Shopping-Cart/client/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    autoprefixer()
    // Add other plugins here as needed
  ],
  build: {
    sourcemap: true,
    target: "esnext"
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  // Add this to print plugin debug info
  logLevel: "debug"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBc3VzXFxcXERlc2t0b3BcXFxcTUVSTi1QUk9cXFxcTU5DX1Nob3BwaW5nLUNhcnRcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBc3VzXFxcXERlc2t0b3BcXFxcTUVSTi1QUk9cXFxcTU5DX1Nob3BwaW5nLUNhcnRcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Bc3VzL0Rlc2t0b3AvTUVSTi1QUk8vTU5DX1Nob3BwaW5nLUNhcnQvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdGFpbHdpbmRjc3MoKSxcbiAgICBhdXRvcHJlZml4ZXIoKVxuICAgIC8vIEFkZCBvdGhlciBwbHVnaW5zIGhlcmUgYXMgbmVlZGVkXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgLy8gQWRkIHRoaXMgdG8gcHJpbnQgcGx1Z2luIGRlYnVnIGluZm9cbiAgbG9nTGV2ZWw6ICdkZWJ1ZycsXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVcsT0FBTyxXQUFXO0FBQ3ZYLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBRXpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQTtBQUFBLEVBRWY7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFVBQVU7QUFDWixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
