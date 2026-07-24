import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // react-leaflet must share the app's React instance
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react-leaflet", "leaflet"],
  },
  server: {
    port: 5173,
  },
});
