import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // For root deployment, use '/' (if it's deployed at a subpath, replace with '/myapp/')
  plugins: [react()],
});
