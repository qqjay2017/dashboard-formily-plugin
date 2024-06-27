import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'
// webpack monaco-editor-webpack-plugin
// import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        report: resolve(__dirname, 'src/report/index.html'),
      },
    },
  },
  server: {
    proxy: {
      '/huang-api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/huang-api/, ''),
      },
      "/api/": {
        target: "https://uat.kxgcc.com",
        changeOrigin: true,
      },
      "/public/": {
        target: "https://uat.kxgcc.com",
        changeOrigin: true,
      },
      "/cms-static/": {
        target: "https://uat.kxgcc.com",
        changeOrigin: true,
      },
      "/component-shared-center/": {
        target: "https://uat.kxgcc.com",
        changeOrigin: true,
      },

    }
  }
})
