import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api/": "http://localhost:5000",
      // "/uploads/": "http://localhost:5000",
      "/api/": "https://kimimi-final-day91yzdd-kabirus-projects-4ce204e8.vercel.app",
    },
  },
});