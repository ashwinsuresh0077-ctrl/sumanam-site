import { motion } from 'framer-motion'

const clients = [
  'TAJ', 'Apollo', 'Mahindra', 'TVS', 'Singapore Airlines',
  'Technopark', 'Tata', 'Tata Elxsi', 'KSEB', 'Chettinad',
]

export default function Clients() {
  return (
    <section id="clients" className="relative py-24 px-6 bg-[#0a1628] border-y border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold uppercase tracking-[0.3em] text-sm mb-12"
        >
          Trusted By Industry Leaders
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {clients.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: '#c9a14a' }}
              className="h-20 flex items-center justify-center border border-white/10 text-white/40 hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              {c}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
