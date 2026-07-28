import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Users, Globe, UserCog } from 'lucide-react'

const stats = [
  { icon: Building2, value: 150, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 75, suffix: '+', label: 'Happy Clients' },
  { icon: Globe, value: 12, suffix: '+', label: 'Countries Served' },
  { icon: UserCog, value: 50, suffix: '+', label: 'Expert Consultants' },
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
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient font-display">
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative bg-base-2 border-y border-cyan/10">
      <div className="max-w-[1400px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="w-12 h-12 rounded-xl border border-cyan/25 bg-cyan/5 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-cyan-bright" strokeWidth={1.6} />
                </span>
                <div>
                  <Counter value={s.value} suffix={s.suffix} />
                  <p className="text-white/50 uppercase tracking-widest text-[10px] mt-1">{s.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:max-w-xs lg:border-l lg:border-cyan/10 lg:pl-10"
        >
          <p className="text-cyan-bright uppercase tracking-[0.25em] text-xs mb-2">Our Expertise</p>
          <p className="text-white/55 text-sm leading-relaxed">
            Delivering end-to-end MEP, BIM &amp; PMS solutions with innovation, accuracy and
            commitment across the entire building lifecycle.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
