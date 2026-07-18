import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss()],
  resolve: {
    // Native tsconfig paths resolution — no plugin needed
    tsconfigPaths: true,
    alias: {
      "@": "/src",
    },
  },
  build: {
    target: "esnext",
    // Inline tiny assets (<4 KB) to reduce HTTP round-trips
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
          // Lucide icons
          if (id.includes("lucide-react")) return "vendor-icons";
        },
      },
    },
  },
});

