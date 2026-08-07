import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages 서브패스(/careernote-design-system/) 서빙 호환
  base: './',
  plugins: [react()],
  server: { port: 5190 },
});
