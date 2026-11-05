import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /<repo>/; set GH_PAGES=1 when building for it.
  base: process.env.GH_PAGES ? '/newest-latitude/' : '/',
  // Lets you share a local preview through a Cloudflare quick tunnel.
  preview: { allowedHosts: ['.trycloudflare.com'] },
  server: { allowedHosts: ['.trycloudflare.com'] },
})
