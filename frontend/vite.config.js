import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config with proxy setup
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://kimimi-final-backend-1grh5lpjj-kabirus-projects-4ce204e8.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
