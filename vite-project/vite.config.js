import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ✅ Add this


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ define @ as src/
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



