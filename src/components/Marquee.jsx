import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { projectImages } from '../data/projectImages'

// Real Sumanam project photography, not stock. Every tile is a building the
// company actually engineered, which is the whole point of a wall like this.
const CARDS = Object.entries(projectImages).map(([slug, imgs]) => ({
  slug,
  src: imgs.card,
  alt: slug.replace(/-/g, ' '),
}))

const HALF = Math.ceil(CARDS.length / 2)
const ROW_ONE = CARDS.slice(0, HALF)
const ROW_TWO = CARDS.slice(HALF)

// The page shows this wall twice — once under the hero, once as a closing
// band. Rotating the rows and flipping their travel direction means the two
// instances never read as the same strip repeated.
const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)]

// Tripled so the strip never runs out of tiles as it translates.
const triple = (arr) => [...arr, ...arr, ...arr]

function Row({ items, offset, direction }) {
  return (
    <div
      className="flex gap-3"
      style={{
        transform: `translateX(${direction * (offset - 200)}px)`,
        willChange: 'transform',
        width: 'max-content',
      }}
    >
      {triple(items).map((card, i) => (
        <div
          key={`${card.slug}-${i}`}
          className="shrink-0 overflow-hidden rounded-2xl"
          style={{ width: 'clamp(220px, 26vw, 380px)', height: 'clamp(150px, 17vw, 245px)' }}
        >
          <img
            src={card.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default function Marquee({ reverse = false, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [offset, setOffset] = useState(0)

  // Second instance: different tiles lead each row, and the rows travel the
  // other way.
  const rowOne = reverse ? rotate(ROW_TWO, 3) : ROW_ONE
  const rowTwo = reverse ? rotate(ROW_ONE, 5) : ROW_TWO
  const dir = reverse ? -1 : 1

  useEffect(() => {
    if (reduce) return

    let frame = 0
    const measure = () => {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      // Scroll position relative to the section, damped so the strip drifts
      // rather than races the page.
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    const onScroll = () => {
      // rAF-throttled: a raw scroll handler setting state fires far more
      // often than the compositor can paint.
      if (frame) return
      frame = requestAnimationFrame(() => {
        measure()
        frame = 0
      })
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduce])

  return (
    <section
      ref={ref}
      aria-label="Selected Sumanam projects"
      className={`relative overflow-hidden bg-bg pt-20 pb-10 sm:pt-24 md:pt-28 ${className}`}
    >
      <div className="flex flex-col gap-3">
        <Row items={rowOne} offset={offset} direction={dir} />
        <Row items={rowTwo} offset={offset} direction={-dir} />
      </div>

      {/* Edge fades so the strip dissolves into the page rather than being
          cut off by the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32"
        style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32"
        style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
      />
    </section>
  )
}
