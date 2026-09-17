// Resolve a public/ asset path against the deployment base.
//
// Vite sets import.meta.env.BASE_URL from `base` in vite.config.js — '/' for a
// root deploy (a custom domain like sumanam.co.in) or '/sumanam-site/' for the
// GitHub Pages project URL. Hard-coded '/projects/…', '/clients/…' etc. only
// resolve correctly at root, so route every such path through this helper to
// stay correct at any base.
export const asset = (p) => {
  if (!p) return p
  if (/^(https?:)?\/\//.test(p) || p.startsWith('data:')) return p // already absolute
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') // '' or '/sumanam-site'
  return base + (p.startsWith('/') ? p : '/' + p)
}
