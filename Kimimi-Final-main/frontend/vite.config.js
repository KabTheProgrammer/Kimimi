import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config with proxy setup
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://kimimifinal.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});