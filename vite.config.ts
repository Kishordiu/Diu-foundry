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
});
