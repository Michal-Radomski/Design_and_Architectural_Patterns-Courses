import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: "build", // Change the output directory from 'dist' to 'build'
  },
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "../common"),
    },
  },
});
