import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Stagger, StaggerItem } from '../lib/motion'
import { workCategories } from '../data/work'

// Derived from data/work.js so these headline numbers can never drift out of
// sync with the project tables the visitor sees two sections further down.
// Rounded DOWN to a clean figure so the claim is always conservative.
const floorTo = (n, step) => Math.floor(n / step) * step

const projectCount = workCategories.reduce(
  (total, c) => total + c.sections.reduce((n, s) => n + s.rows.length, 0),
  0,
)

const clientCount = new Set(
  workCategories.flatMap((c) =>
    c.sections.flatMap((s) => s.rows.map((r) => (r.client || '').trim().toLowerCase())),
  ),
).size - 1 // drop the empty-string bucket from rows with no client listed

const stats = [
  { value: floorTo(projectCount, 10), suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Years of Experience' },
  { value: floorTo(clientCount, 50), suffix: '+', label: 'Trusted Clients' },
  { value: workCategories.length, suffix: '', label: 'Sectors Served' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(value)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-semibold text-ink">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-24 px-6 bg-bg-alt border-y border-ink/5">
      <Stagger className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center" stagger={0.1}>
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-xl border border-ink/10 bg-ink/[0.03] py-10 px-4 hover:border-ink/25 transition-colors"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-ink/65 uppercase tracking-widest text-xs mt-3">{s.label}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
