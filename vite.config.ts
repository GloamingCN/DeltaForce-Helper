import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //解决跨域问题
  server: {
    proxy: {
      '/index.php/api': {
        target: 'http://182.92.170.242:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/index.php\/api/, '/index.php/api')
      }
    }
  }
})
