import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 bg-[#060d18]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">Let's Build Together</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
            Got an Idea? <br /> We'd Love to Chat.
          </h2>
          <p className="text-white/50 leading-relaxed max-w-md mb-10">
            Ensuring sustainable growth of our company and positively contributing
            to the success of our clients' organizations.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                <Mail className="text-gold" size={18} strokeWidth={1.5} />
              </div>
              <span className="text-white/70">info@sumanam.co.in</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                <Phone className="text-gold" size={18} strokeWidth={1.5} />
              </div>
              <span className="text-white/70">+91 98461 50055</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                <MapPin className="text-gold" size={18} strokeWidth={1.5} />
              </div>
              <span className="text-white/70">Aditya Apartment, SH, Kowdiar, Thiruvananthapuram, Kerala 695003</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white/[0.03] border border-white/10 px-5 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/[0.03] border border-white/10 px-5 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors"
          />
          <textarea
            rows={5}
            placeholder="Tell us about your project"
            className="w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-white placeholder-white/30 focus:border-gold focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            className="bg-gold text-[#060d18] uppercase tracking-widest text-sm font-medium px-8 py-4 hover:bg-gold-light transition-all w-full sm:w-auto"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
