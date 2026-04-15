import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': '/src',
    },
  },
  // server: {
  //   // host: '127.0.0.1',
  //   // port:80,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8089/",
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
