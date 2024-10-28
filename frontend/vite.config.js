import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api/": "http://localhost:5000",
      // "/uploads/": "http://localhost:5000",
      "/api/": "https://kimimi-final-backend-1grh5lpjj-kabirus-projects-4ce204e8.vercel.app",
    },
  },
});