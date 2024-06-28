import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "./src/styles/variables" as *;
        @use "@/styles/responsive" as *;
        `,
        // additionalData: `@import "./src/styles/variables";`,
      },
    },
  },
});
