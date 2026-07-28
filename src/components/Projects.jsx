import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const projects = [
  { name: 'Commercial Complex', tags: 'MEP Design · BIM · PMS', hue: 210 },
  { name: 'Multi Speciality Hospital', tags: 'MEP Design · BIM Coordination · PMS', hue: 190 },
  { name: 'Industrial Plant', tags: 'MEP Design · 3D BIM · Estimation', hue: 25 },
  { name: 'International Airport', tags: 'BIM Coordination · PMS', hue: 220 },
  { name: 'High Rise Residential', tags: 'MEP Design · BIM · PMS', hue: 260 },
  { name: 'IT Business Park', tags: 'MEP Design · BIM · Estimation', hue: 200 },
]

/* A stylised building illustration built from CSS gradients per card */
function ProjectVisual({ hue }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(130% 100% at 50% 0%, hsl(${hue} 55% 28%) 0%, hsl(${hue} 60% 12%) 55%, #050c18 100%)`,
      }}
    >
      <div className="absolute inset-0 blueprint opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-5">
        {[52, 78, 64, 92, 70, 84, 58].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm opacity-85"
            style={{
              height: `${h}%`,
              background: `linear-gradient(180deg, hsl(${hue} 45% 42%), hsl(${hue} 50% 16%))`,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
    </div>
  )
}

export default function Projects() {
  const trackRef = useRef(null)
  const [i, setI] = useState(0)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8 * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
    setI((p) => Math.max(0, Math.min(projects.length - 1, p + dir)))
  }

  return (
    <section id="projects" className="relative py-24 px-6 bg-base">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10 gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white font-display"
          >
            Our Projects
          </motion.h2>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 text-cyan-bright text-xs uppercase tracking-widest hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight size={14} />
          </a>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative snap-start shrink-0 w-[280px] sm:w-[300px] h-[340px] rounded-2xl overflow-hidden border border-cyan/12 glass-hover cursor-pointer"
            >
              <ProjectVisual hue={p.hue} />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-white font-semibold text-lg leading-tight">{p.name}</h3>
                  <p className="text-cyan/70 text-[11px] tracking-wide mt-1">{p.tags}</p>
                </div>
                <span className="w-9 h-9 rounded-full border border-cyan/40 flex items-center justify-center text-cyan-bright shrink-0 group-hover:bg-cyan group-hover:text-[#03101f] transition-all">
                  <ArrowRight size={15} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* controls + dots */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => scrollBy(-1)}
            className="w-10 h-10 rounded-full border border-cyan/25 flex items-center justify-center text-white/70 hover:text-cyan-bright hover:border-cyan transition-all"
            aria-label="Previous"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-2">
            {projects.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? 'w-6 bg-cyan-bright' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => scrollBy(1)}
            className="w-10 h-10 rounded-full border border-cyan/25 flex items-center justify-center text-white/70 hover:text-cyan-bright hover:border-cyan transition-all"
            aria-label="Next"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
