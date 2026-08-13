import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { workCategories } from '../data/work'
import { sectorImages } from '../data/sectorImages'
import { Reveal, TextReveal } from '../lib/motion'

const SLIDE_MS = 3200

// Cycles a sector's real project photography behind the tile. Sectors with a
// single image (or none in public/projects/) fall back to the still from
// work.js and never mount a timer.
//
// Only the current frame is in the DOM at a time, so a tile holding 36 photos
// still fetches them one at a time as it cycles rather than up front.
function TileImage({ category }) {
  const reduce = useReducedMotion()
  const shots = sectorImages[category.slug] || []
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)

  // Advance only while the tile is actually on screen — ten tiles all cycling
  // off-screen would be pure wasted network and paint.
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!running || reduce || shots.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % shots.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [running, reduce, shots.length])

  if (shots.length === 0) {
    return (
      <img
        src={category.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    )
  }

  const shot = shots[index % shots.length]

  return (
    <div ref={ref} className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
      <AnimatePresence initial={false}>
        <motion.img
          key={shot.src}
          src={shot.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}

// The sector grid. work.js is the source of truth for both this and the
// /work/:slug pages it links to — without this component those pages have no
// route into them from anywhere on the site.
export default function Work() {
  return (
    <section
      id="work"
      // Same stacked-panel treatment as Services: rounded top on a light band,
      // which the Projects panel above it then overlaps.
      className="relative z-10 rounded-t-[40px] bg-bg-alt px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      {/* Wider than the other sections: ten tiles across five columns need the
          extra room, and at max-w-6xl they came out postage-stamp narrow. */}
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 text-center sm:mb-20">
          <p className="mb-4 eyebrow" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}>
            Where We Build
          </p>
          <TextReveal
            as="h2"
            text="Sectors"
            className="font-black uppercase leading-none tracking-tight text-ink"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          />
        </Reveal>

        {/* Two across, so ten sectors read as five full rows. One per row on
            phones — a half-width tile can't carry type this size. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {workCategories.map((c, i) => {
            const Icon = c.icon
            return (
              // Stagger caps out after the first row so the last tiles don't
              // sit blank while the visitor is already looking at them.
              <Reveal key={c.slug} delay={Math.min(i, 4) * 0.08}>
                <Link
                  to={`/work/${c.slug}`}
                  // Landscape now: at half the section's width, the old 4/5
                  // portrait ratio would stand nearly 800px tall.
                  className="group relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-[24px] p-6 sm:rounded-[28px] sm:p-8"
                >
                  <TileImage category={c} />
                  {/* The flat wash is light now — enough to keep the icon
                      readable without turning every photo to mud. The bottom
                      gradient does the real contrast work, where the copy is. */}
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Icon and count pair off in the top corner, which leaves
                      the bottom to the title and its line of copy. */}
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between sm:inset-x-8 sm:top-8">
                    <div className="flex items-center gap-3">
                      <Icon
                        className="text-white/80 transition-colors duration-500 group-hover:text-white"
                        size={26}
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-light uppercase tracking-widest text-white/60">
                        {c.count} projects
                      </span>
                    </div>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.5}
                      className="text-white opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
                    <h3
                      className="font-medium uppercase leading-tight tracking-wide text-white"
                      style={{ fontSize: 'clamp(1.15rem, 2.1vw, 1.85rem)' }}
                    >
                      {c.title}
                    </h3>
                    {/* The tile is big enough to earn the real per-sector line
                        now, rather than leaving the space empty. */}
                    <p
                      className="mt-2 max-w-md font-light leading-relaxed text-white/70"
                      style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)' }}
                    >
                      {c.subtitle}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
