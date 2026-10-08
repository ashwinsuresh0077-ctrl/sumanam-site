import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Base path depends on where it's served:
  //   - Vercel / a custom domain (root)      → '/'  (the default)
  //   - GitHub Pages project URL (subpath)   → '/sumanam-site/'
  // The GitHub Actions workflow sets VITE_BASE=/sumanam-site/ for that build;
  // Vercel builds with no env, so they get root. The asset() helper and the
  // router basename both read import.meta.env.BASE_URL, so either just works.
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
})
