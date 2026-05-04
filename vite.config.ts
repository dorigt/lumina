import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// PWA: static manifest + public/sw.js (no vite-plugin-pwa / Workbox — keeps npm install small on Vercel).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
