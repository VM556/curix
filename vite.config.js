import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allow access from any device on the network
    port: 3001, // Ensure the port matches what Vite shows
    // strictPort: true, // Ensures the port doesn't change
  },
});
