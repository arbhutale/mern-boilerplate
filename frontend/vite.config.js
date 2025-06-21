import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
     watch: {
      usePolling: true,
      interval: 100,
    },
    proxy: {
      "/api": {
        target: "http://backend:5000", // use "backend" as Docker service name
        changeOrigin: true,
        secure: false,
      },
    },
    host: "0.0.0.0", // ✅ allows access from Docker
  },
});
