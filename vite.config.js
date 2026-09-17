import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from the GitHub Pages project URL (ashwinsuresh0077-ctrl.github.io/
  // sumanam-site/). When a custom domain (e.g. sumanam.co.in) is pointed at it,
  // the site serves from root — set base to '/' and redeploy.
  base: '/sumanam-site/',
  plugins: [react(), tailwindcss()],
})
