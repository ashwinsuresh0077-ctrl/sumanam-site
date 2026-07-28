import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'

const details = [
  { icon: Phone, text: '+91 98765 43210' },
  { icon: Mail, text: 'info@mepbimpms.com' },
  { icon: MapPin, text: 'Bangalore, India' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="relative py-24 px-6 bg-base-2 border-t border-cyan/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-cyan-bright uppercase tracking-[0.25em] text-xs mb-3">Contact Us</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-6 leading-tight">
            Let&apos;s Engineer Your <span className="text-gradient">Next Project</span>
          </h2>
          <p className="text-white/55 leading-relaxed max-w-md mb-10">
            Tell us about your project and our MEP, BIM and PMS consultants will get back to you with
            a tailored approach.
          </p>

          <div className="space-y-5">
            {details.map((d) => {
              const Icon = d.icon
              return (
                <div key={d.text} className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-xl border border-cyan/25 bg-cyan/5 flex items-center justify-center">
                    <Icon className="text-cyan-bright" size={18} strokeWidth={1.6} />
                  </span>
                  <span className="text-white/75">{d.text}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="glass rounded-2xl p-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="bg-white/[0.03] border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:border-cyan focus:outline-none transition-colors"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="bg-white/[0.03] border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:border-cyan focus:outline-none transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Project Type / Subject"
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:border-cyan focus:outline-none transition-colors"
          />
          <textarea
            rows={5}
            required
            placeholder="Tell us about your project"
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder-white/30 focus:border-cyan focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-brand text-[#03101f] text-sm font-semibold uppercase tracking-wider px-8 py-4 hover:shadow-[0_0_35px_-6px_rgba(56,229,255,0.7)] transition-shadow w-full sm:w-auto justify-center"
          >
            {sent ? (
              <>
                <CheckCircle2 size={16} /> Message Sent
              </>
            ) : (
              <>
                Send Message <ArrowRight size={16} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
