import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

export default defineConfig(() => {
  return {
    plugins: [vue(), createBlockletPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
