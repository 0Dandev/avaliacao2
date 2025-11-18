import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://proweb.leoproti.com.br', // O alvo (API real)
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o '/api'
      },
    },
  },
})