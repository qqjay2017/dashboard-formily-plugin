import { PluginOption, defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'

const PagePlugin = (): PluginOption => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url || '';

      if (url.startsWith('/report/') && !url.includes('.')) {

        req.url = '/report/index.html';
      }
      next();
    })
  },
})
export default defineConfig({
  base: '/dashboard',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 路径别名
    }
  },
  plugins: [react(), PagePlugin()],
  build: {

    rollupOptions: {

      input: {
        main: resolve(__dirname, 'index.html'),
        "report": resolve(__dirname, 'report/index.html'),
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
