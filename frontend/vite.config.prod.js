import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    // usually not needed for prod build but you can specify port if previewing
    port: 3000,
  },
  // You can add proxy here if you want in dev mode, but usually not in prod build
});
