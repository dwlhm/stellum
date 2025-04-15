import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    manifest: true,
    rollupOptions: {
      input: './src/client.tsx'
    }
  }
})