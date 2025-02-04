import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
