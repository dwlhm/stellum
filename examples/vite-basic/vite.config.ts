import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Point ke source code untuk development tanpa build
      'stellum': path.resolve(__dirname, '../../packages/stellum/src')
    }
  },
  server: {
    fs: {
      allow: ['..'],
    }
  }
})
