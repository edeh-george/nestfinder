import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist', 
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
    },
    host: 'localhost', 
    port: 5173,
  },
})
