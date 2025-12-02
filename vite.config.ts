import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plugin to handle sitemap.xml and rss.xml routes
function xmlRoutesPlugin(): Plugin {
  return {
    name: "xml-routes",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/sitemap.xml") {
          try {
            const { generateSitemapXML } = await import("./src/lib/server/sitemap.js");
            const xml = await generateSitemapXML();
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.setHeader("Cache-Control", "public, max-age=3600");
            res.end(xml);
          } catch (error) {
            console.error("Error generating sitemap:", error);
            res.statusCode = 500;
            res.end("Error generating sitemap");
          }
        } else if (req.url === "/blog/rss.xml") {
          try {
            const { generateRSSFeed } = await import("./src/lib/server/rss.js");
            const xml = await generateRSSFeed();
            res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
            res.setHeader("Cache-Control", "public, max-age=3600");
            res.end(xml);
          } catch (error) {
            console.error("Error generating RSS feed:", error);
            res.statusCode = 500;
            res.end("Error generating RSS feed");
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    xmlRoutesPlugin(),
    tailwindcss(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, "tsconfig.json")],
    }),
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
  ssr: {
    // Mark posthog-js as external for SSR to avoid "window is not defined" errors
    external: ["posthog-js"],
  },
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
    // Enable minification with esbuild (faster than terser)
    minify: "esbuild",
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Generate source maps for production debugging (can be disabled)
    sourcemap: false,
  },
  esbuild: {
    // Drop console and debugger statements in production
    drop: ["console", "debugger"],
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-router"],
  },
});
