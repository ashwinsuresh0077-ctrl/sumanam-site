import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 30, suffix: 'L+', label: 'Sq.Ft Engineered' },
  { value: 15, suffix: '+', label: 'Trusted Clients' },
]

function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
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
    <span ref={ref} className="text-5xl md:text-6xl font-semibold text-gold">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-24 px-6 bg-[#0a1628] border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="text-white/50 uppercase tracking-widest text-xs mt-3">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
