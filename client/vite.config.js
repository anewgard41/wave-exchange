import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//A4dN2XAcY9UOq2y6 musiclover
//tcJWUe4QFMTI9Wx0 71.70.172.9/32
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
        //target: 'https://wave-exchange.onrender.com/',
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true
      }
    }
  }
})
