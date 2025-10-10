import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config with proxy setup
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://kimimi-final-backend.vercel.app/",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
