import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Important: allows Electron to load assets correctly in prod
  build: {
    chunkSizeWarningLimit: 1000,
    outDir: "dist", // output folder
    emptyOutDir: true,
  },
});
