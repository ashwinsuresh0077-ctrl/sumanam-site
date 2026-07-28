# MEP · BIM · PMS Consultancy — 3D Website

A production-style, truly 3D marketing site for an MEP / BIM / PMS engineering
consultancy. The hero features a procedurally generated high-rise rendered with
**Three.js / React Three Fiber**, showing the building's mechanical, electrical
and plumbing (MEP) service risers threading up a glass tower behind a cyan BIM
wireframe cage, surrounded by floating glassmorphism dashboard panels.

## Stack

- **Vite + React 19** — app shell and build
- **Three.js + @react-three/fiber + @react-three/drei** — the real-time 3D hero scene
- **GSAP** — hero intro timeline animation
- **Framer Motion** — scroll-reveal and micro-interactions
- **Tailwind CSS v4** — styling / dark-blue neon theme

## The 3D hero (`src/components/HeroScene.jsx`)

Everything in the scene is generated in code — no external GLB asset required:

- A 9-floor glazed tower (glass curtain wall, structural slabs, corner columns, mullions)
- Rooftop mechanical plant (air-handling units, cooling towers, neon spire)
- Colour-coded MEP service risers with animated energy pulses
  (HVAC, chilled water, fire, electrical, plumbing)
- Horizontal duct runs and a pulsing cyan BIM wireframe cage
- Manual studio lighting + contact shadows + drifting data motes
- Slow auto-rotation with constrained OrbitControls

## Sections

Navbar · Hero (3D + dashboard panels) · Stats · Services · About / Why Choose Us ·
Projects carousel · Technology · Process · Contact · Footer

## Scripts

```bash
npm install     # install dependencies
npm run dev     # start the dev server
npm run build   # production build
npm run preview # preview the production build
npm run lint    # eslint
```
