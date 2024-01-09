import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4000',
        secure: true,
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:4000',
        secure: true,
        changeOrigin: true
      }
    }
  }
})
