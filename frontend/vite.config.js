import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  
  server: {
    host: "0.0.0.0",     // 🐳 Required in Docker
    port: 3000,
    watch: {
      usePolling: true,  // 🖥 Fix for macOS file system syncing in Docker
      interval: 100,
    },
    proxy: {
      "/api": {
        target: "http://backend:5001", // 👈 no trailing slash
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
