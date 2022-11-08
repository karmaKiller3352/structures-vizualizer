import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "hooks", replacement: path.resolve(__dirname, "src/hooks") },
      {
        find: "features",
        replacement: path.resolve(__dirname, "src/features"),
      },
      {
        find: "containers",
        replacement: path.resolve(__dirname, "src/containers"),
      },
      { find: "stores", replacement: path.resolve(__dirname, "src/stores") },
    ],
  },
});
