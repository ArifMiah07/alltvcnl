import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const electron = mode === "electron";

  return {
    plugins: [solid()],
    base: electron ? "./" : "/",
    resolve: {
      alias: {
        "@": path.resolve(root, "src"),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        "/dev-api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/dev-api/, ""),
        },
      },
    },
    preview: {
      port: 4173,
    },
    build: {
      outDir: electron ? "dist" : "dist-web",
      emptyOutDir: true,
      sourcemap: false,
      target: "es2022",
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("hls.js")) return "hls";
          },
        },
      },
    },
  };
});
