import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
