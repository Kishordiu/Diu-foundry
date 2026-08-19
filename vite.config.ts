import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [TanStackRouterVite(), react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "esnext",
      // Force esbuild minifier to ensure our esbuild.drop options are applied
      minify: "esbuild",
      // Never emit source maps in production — protects implementation detail
      sourcemap: false,
      // Inline tiny assets (< 4 KB) to reduce HTTP round-trips
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Framer Motion — large animation library, deferred where possible
            if (id.includes("framer-motion")) return "vendor-framer";
            // TanStack router + query — routing infrastructure
            if (id.includes("@tanstack/react-router") || id.includes("@tanstack/react-query"))
              return "vendor-tanstack";
            // Radix UI — used only in the Forge form
            if (id.includes("@radix-ui")) return "vendor-radix";
            // Lenis smooth scroll
            if (id.includes("lenis")) return "vendor-lenis";
            // GSAP + ScrollTrigger
            if (id.includes("gsap")) return "vendor-gsap";
            // Lucide icons
            if (id.includes("lucide-react")) return "vendor-icons";
          },
        },
      },
    },
    esbuild: isProd
      ? {
          // Strip all console.* calls and debugger statements from production bundles.
          // This prevents leaking internal error details, payloads, or debug traces.
          drop: ["console", "debugger"],
          // Remove JSDoc and inline comments from the final output
          legalComments: "none",
        }
      : {},
  };
});
