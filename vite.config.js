import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/LB8_WebStorage_Promises_REST_API/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        timer: resolve(__dirname, 'timer.html'),
        form: resolve(__dirname, 'form.html'),
        snackbar: resolve(__dirname, 'snackbar.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        search: resolve(__dirname, 'search.html'),
      },
    },
  },
});