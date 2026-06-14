import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Residential', 'Hospitality', 'Healthcare', 'Commercial', 'IT Parks']

const projects = [
  { name: 'Palmera Garden', location: 'Thoraipakkam, Chennai', category: 'Residential', color: '#1f3a5f' },
  { name: 'Balusseri Taluk Hospital', location: 'Kozhikode', category: 'Healthcare', color: '#2d4a3e' },
  { name: 'Hotel New Victoria', location: 'Kerala', category: 'Hospitality', color: '#4a3a2d' },
  { name: 'Bhavani Tech Park', location: 'Technopark, Thiruvananthapuram', category: 'IT Parks', color: '#33415c' },
  { name: 'Rubics Square', location: 'Commercial Hub', category: 'Commercial', color: '#5c3344' },
  { name: 'Arakkal Apartments', location: 'Thevara, Kochi', category: 'Residential', color: '#3d4a2d' },
  { name: 'Leela IT Park', location: 'Leela Group', category: 'IT Parks', color: '#2d3a4a' },
  { name: 'Four Points Sheraton', location: 'Hospitality', category: 'Hospitality', color: '#4a2d3d' },
  { name: 'Sidharth Natura', location: 'Premium Living', category: 'Residential', color: '#2d4a4a' },
]

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="relative py-28 px-6 bg-[#060d18]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">Our Work</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-xl">
              Spaces That Redefine Modern Living
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all ${
                  active === c
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                whileHover={{ y: -8 }}
                className="group relative h-72 overflow-hidden border border-white/10 cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${p.color}, #060d18)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                  <div className="w-24 h-24 border-2 border-gold rotate-45" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#060d18] to-transparent">
                  <p className="text-gold text-xs uppercase tracking-widest mb-2">{p.category}</p>
                  <h3 className="text-xl font-medium text-white">{p.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{p.location}</p>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                  &#8599;
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
