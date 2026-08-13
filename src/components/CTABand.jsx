import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { TextReveal, Magnet } from '../lib/motion'

export default function CTABand() {
  return (
    <section className="relative px-6 py-24 bg-bg-alt border-y border-ink/5 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <TextReveal
          as="h2"
          className="text-3xl md:text-5xl font-semibold text-ink leading-tight mb-5"
          text="Have a project on the drawing board?"
        />
        <p className="text-ink/65 text-lg max-w-2xl mx-auto mb-10">
          From MEP design to full project management, let’s engineer it right the first time.
        </p>
        {/* The button drifts toward the cursor once it comes within range —
            the page's one piece of pointer-reactive motion, spent on the
            single element we most want clicked. */}
        <Magnet padding={140} strength={4}>
          <a
            href="#contact"
            className="btn-primary text-sm uppercase tracking-widest"
          >
            Start Your Project <ArrowRight size={16} />
          </a>
        </Magnet>
      </motion.div>
    </section>
  )
}
