import { motion } from 'framer-motion'
import { ClipboardCheck, FileText, Boxes, GitMerge, PackageCheck, ArrowRight } from 'lucide-react'

const steps = [
  { n: '01', icon: ClipboardCheck, title: 'Consult', desc: 'Understanding your requirements.' },
  { n: '02', icon: FileText, title: 'Plan', desc: 'Defining scope, deliverables and execution plan.' },
  { n: '03', icon: Boxes, title: 'Design & Model', desc: 'MEP design and BIM modeling.' },
  { n: '04', icon: GitMerge, title: 'Coordinate', desc: 'Clash detection and coordination.' },
  { n: '05', icon: PackageCheck, title: 'Manage & Deliver', desc: 'PMS, delivery and project success.' },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 px-6 bg-base">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* Left: process steps */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white font-display mb-12"
          >
            Our Process
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-full border border-cyan/25 bg-cyan/5 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-cyan-bright" strokeWidth={1.6} />
                  </div>
                  <span className="block text-lg font-bold text-gradient font-display">{s.n}</span>
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wide mt-1">
                    {s.title}
                  </h4>
                  <p className="text-white/45 text-[11px] mt-2 leading-relaxed">{s.desc}</p>
                  {idx < steps.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="hidden lg:block absolute top-4 -right-4 text-cyan/40"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: CTA panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-cyan/15 p-10 min-h-[280px] flex flex-col justify-center"
          style={{
            background:
              'radial-gradient(130% 120% at 80% 20%, #14406f 0%, #0a1f3a 55%, #050c18 100%)',
          }}
        >
          <div className="absolute inset-0 blueprint opacity-40" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display leading-tight">
              Let&apos;s Build Something Great Together
            </h3>
            <p className="text-white/55 mt-4 max-w-sm">
              Have a project in mind? Our experts are ready to help you from concept to successful
              completion.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-brand text-[#03101f] text-sm font-semibold uppercase tracking-wider px-6 py-3.5 mt-8 hover:shadow-[0_0_35px_-6px_rgba(56,229,255,0.7)] transition-shadow"
            >
              Get in Touch <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
