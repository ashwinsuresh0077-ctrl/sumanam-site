import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const tech = [
  { brand: 'Autodesk', name: 'Revit', color: '#3a7de5' },
  { brand: 'Autodesk', name: 'Navisworks', color: '#3fae5a' },
  { brand: 'Autodesk', name: 'AutoCAD', color: '#e5484d' },
  { brand: 'Autodesk', name: 'BIM 360', color: '#2f7dff' },
  { brand: 'Synchro', name: '4D', color: '#ff6b6b' },
  { brand: 'Primavera', name: 'P6', color: '#ff5d5d' },
  { brand: 'Microsoft', name: 'Project', color: '#3fae5a' },
]

function TechLogo({ color }) {
  return (
    <span
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm"
      style={{ background: `${color}22`, color }}
    >
      <span className="w-3.5 h-3.5 rounded-sm" style={{ background: color }} />
    </span>
  )
}

export default function Technology() {
  return (
    <section id="technology" className="relative py-24 px-6 bg-base-2 border-y border-cyan/5">
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white font-display"
        >
          Technology We Use
        </motion.h2>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {tech.map((t, idx) => (
            <motion.div
              key={t.brand + t.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="glass glass-hover rounded-xl px-5 py-4 flex items-center gap-3"
            >
              <TechLogo color={t.color} />
              <span className="text-left leading-tight">
                <span className="block text-[10px] tracking-widest text-white/40 uppercase">
                  {t.brand}
                </span>
                <span className="block text-sm font-semibold text-white">{t.name}</span>
              </span>
            </motion.div>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-cyan/40 text-cyan-bright text-xs uppercase tracking-widest px-6 py-3 mt-12 hover:bg-cyan/10 transition-all"
        >
          Explore Technology <ArrowRight size={14} />
        </a>
      </div>
    </section>
  )
}
