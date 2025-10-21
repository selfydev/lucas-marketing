import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src",
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        crawlLinks: false,
        concurrency: 14,
      },
      sitemap: {
        enabled: true,
        host: "https://meetlucas.ai",
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting (function avoids SSR build issues)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Only chunk node_modules for better caching
          if (id.includes("node_modules")) {
            if (id.includes("lottie-react") || id.includes("lottie-web")) {
              return "lottie";
            }
            if (id.includes("motion")) {
              return "motion";
            }
            if (id.includes("@radix-ui")) {
              return "radix";
            }
          }
        },
      },
    },
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Generate source maps for production debugging (can be disabled)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-router"],
  },
});
