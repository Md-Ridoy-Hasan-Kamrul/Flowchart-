<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

=======
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
