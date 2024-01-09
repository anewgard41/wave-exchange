import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true
      },
      '/api': {
        target: 'https://wave-exchange.onrender.com/',
        secure: true,
        changeOrigin: true
      }
    }
  }
})
