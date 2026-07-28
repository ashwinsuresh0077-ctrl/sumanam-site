import { motion } from 'framer-motion'
import { Wind, Building, Boxes, ClipboardList, Calculator, Settings2, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Wind,
    title: 'MEP Design',
    desc: 'Efficient and sustainable MEP system design for all building types.',
  },
  {
    icon: Building,
    title: 'BIM Modeling',
    desc: '3D intelligent BIM models for better visualization, clash detection and coordination.',
  },
  {
    icon: Boxes,
    title: 'BIM Coordination',
    desc: 'Coordinated 3D models with clash reports and constructability solutions.',
  },
  {
    icon: ClipboardList,
    title: 'PMS (Project Management Services)',
    desc: 'Planning, monitoring and delivery management for successful project execution.',
  },
  {
    icon: Calculator,
    title: 'Quantity & Cost Estimation',
    desc: 'Accurate BOQs, quantity takeoffs and cost estimation using BIM.',
  },
  {
    icon: Settings2,
    title: 'Facility Management Support',
    desc: 'Operational support and maintenance planning for the building lifecycle.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08 } }),
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-base">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display">Our Services</h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Comprehensive MEP, BIM and PMS solutions tailored to your project needs.
          </p>
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
                className="group glass glass-hover rounded-2xl p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl border border-cyan/25 bg-gradient-to-br from-cyan/10 to-brand/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="text-cyan-bright" size={28} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm flex-1">{s.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-cyan-bright text-xs uppercase tracking-widest mt-6 group-hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
