import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // ALLOWED_HOST is deployment-specific (e.g. your production domain behind
  // a reverse proxy/tunnel) — set it in a local, gitignored .env, never here.
  const env = loadEnv(mode, process.cwd(), "");
  const allowedHosts = env.ALLOWED_HOST ? [env.ALLOWED_HOST] : undefined;

  return {
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
      allowedHosts,
    },
    preview: {
      port: 4173,
      allowedHosts,
    },
  };
});
