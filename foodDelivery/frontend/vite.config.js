import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Adjust your base path if needed
  build: {
    outDir: "dist",
  },
});

