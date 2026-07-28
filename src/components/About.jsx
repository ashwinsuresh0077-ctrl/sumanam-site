import { motion } from 'framer-motion'
import { Play, Layers, Cpu, ShieldCheck, Clock, ArrowRight } from 'lucide-react'

const reasons = [
  {
    icon: Layers,
    title: 'Integrated MEP + BIM + PMS Expertise',
    desc: 'One-stop solution for all your project needs.',
  },
  {
    icon: Cpu,
    title: 'Technology Driven',
    desc: 'Leveraging the latest tools and technologies for better outcomes.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Accuracy',
    desc: 'Delivering coordinated, accurate and reliable project deliverables.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Commitment to timelines and project success.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-base-2 border-y border-cyan/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-bright uppercase tracking-[0.25em] text-xs mb-3">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display leading-tight">
            Building Better Through Innovation &amp; Collaboration
          </h2>
          <p className="text-white/55 leading-relaxed mt-6">
            We are a team of MEP, BIM and Project Management experts delivering precision-driven
            solutions across the building lifecycle. Our integrated approach ensures efficiency,
            transparency and value at every stage of your project.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-cyan/40 text-cyan-bright text-xs uppercase tracking-widest px-6 py-3 mt-8 hover:bg-cyan/10 transition-all"
          >
            Know More <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Middle: video placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-cyan/15 aspect-video group cursor-pointer"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 20%, #12335e 0%, #0a1a33 55%, #050c18 100%)',
          }}
        >
          <div className="absolute inset-0 blueprint opacity-40" />
          {/* faux skyline */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1.5 px-6 opacity-70">
            {[40, 65, 52, 80, 60, 92, 70, 55, 74, 46].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: 'linear-gradient(180deg,#245089,#0a1f3a)' }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-cyan-bright/90 flex items-center justify-center shadow-[0_0_40px_rgba(56,229,255,0.6)] group-hover:scale-110 transition-transform">
              <Play className="text-[#03101f] ml-1" size={26} fill="currentColor" />
            </span>
          </div>
          <p className="absolute bottom-4 left-5 text-white font-medium tracking-wide text-sm">
            Building the Future Together
          </p>
        </motion.div>

        {/* Right: why choose us */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-cyan-bright uppercase tracking-[0.25em] text-xs mb-6">Why Choose Us</p>
          <div className="space-y-6">
            {reasons.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.title} className="flex gap-4">
                  <span className="w-10 h-10 rounded-xl border border-cyan/25 bg-cyan/5 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-cyan-bright" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h4 className="text-white font-medium text-sm">{r.title}</h4>
                    <p className="text-white/45 text-sm mt-1 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
