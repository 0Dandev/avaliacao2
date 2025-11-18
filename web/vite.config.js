/// <reference types="vitest" /> 
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Simula um navegador (DOM)
    setupFiles: './src/setupTests.js', // Arquivo de setup (vamos criar)
  },
})