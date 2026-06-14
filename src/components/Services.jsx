import { motion } from 'framer-motion'
import { Wind, Zap, Droplets, Lightbulb, PencilRuler, HardHat } from 'lucide-react'

const services = [
  {
    icon: Wind,
    title: 'MEP',
    desc: 'Mechanical, Electrical & Plumbing design for energy-efficient, code-compliant buildings.',
  },
  {
    icon: HardHat,
    title: 'BIM',
    desc: 'Building Information Modelling for clash-free coordination and precise execution.',
  },
  {
    icon: PencilRuler,
    title: 'PMC',
    desc: 'Project Management Consultancy keeping timelines, budgets and quality on track.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    desc: 'Layouts that balance ambience, efficiency, and architectural intent.',
  },
  {
    icon: Zap,
    title: 'Electrical Systems',
    desc: 'Power distribution, backup systems, and lighting infrastructure for every scale.',
  },
  {
    icon: Droplets,
    title: 'Drafting & Plumbing',
    desc: 'Detailed drafting and plumbing systems for safe, sustainable water management.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6 bg-[#060d18]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Engineering Solutions Built for Modern Construction
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: '#c9a14a' }}
                className="group border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                  <Icon className="text-gold" size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{s.title}</h3>
                <p className="text-white/50 leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
