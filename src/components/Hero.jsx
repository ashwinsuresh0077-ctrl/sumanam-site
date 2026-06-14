import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import HeroScene from './HeroScene'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[#060d18]">
      {/* 3D Scene */}
      <div className="absolute inset-0 opacity-90">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d18] via-[#060d18]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d18] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-gold uppercase tracking-[0.3em] text-sm mb-4"
        >
          MEP &middot; BIM &middot; PMC &middot; Engineering Consultancy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight max-w-3xl text-white"
        >
          Build Your Project Without Delays, Cost Overruns, or Headaches.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-white/60 text-lg max-w-xl mt-6"
        >
          Sumanam Engineering Services delivers transparent pricing, on-time delivery,
          and complete peace of mind &mdash; from MEP design to project management.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#contact"
            className="bg-gold text-[#060d18] uppercase tracking-widest text-sm font-medium px-8 py-4 hover:bg-gold-light transition-all"
          >
            Start Your Project
          </a>
          <a
            href="#projects"
            className="border border-white/30 text-white uppercase tracking-widest text-sm font-medium px-8 py-4 hover:border-gold hover:text-gold transition-all"
          >
            View Our Work
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 z-10"
      >
        <ArrowDown size={28} />
      </motion.div>
    </section>
  )
}
