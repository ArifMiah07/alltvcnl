import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Important: allows Electron to load assets correctly in prod
  build: {
    sourcemap: false, // ← Add this!
    chunkSizeWarningLimit: 1000,
    outDir: "dist", // output folder
    emptyOutDir: true,
  },
  resolve: {
      alias: {
        "zustand": path.resolve(__dirname, "./vendor/zustand/src/index.ts"),
        "zustand/vanilla": path.resolve(__dirname, "./vendor/zustand/src/vanilla.ts"),
        "zustand/middleware": path.resolve(__dirname, "./vendor/zustand/src/middleware.ts"),
      },
    },
});
