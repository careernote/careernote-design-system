import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Pages 서브패스(/careernote-design-system/vue/) 서빙 호환
  base: './',
  plugins: [vue(), tailwindcss()],
  server: { port: 5191 },
});
