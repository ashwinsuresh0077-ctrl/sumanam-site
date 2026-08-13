import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { featuredProjects } from '../data/projects'
import { scrollToTarget } from '../lib/lenis'
import { useSeo } from '../lib/seo'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function FeaturedProjects() {
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [])

  useSeo({
    title: 'Featured Projects',
    description:
      'Landmark buildings engineered by Sumanam Engineering Services — IT parks, hospitals, industrial facilities, residential communities and hospitality across Kerala and Tamil Nadu.',
    path: '/projects',
  })

  const categories = useMemo(() => {
    const seen = []
    for (const p of featuredProjects) if (!seen.includes(p.category)) seen.push(p.category)
    return ['All', ...seen]
  }, [])

  const visible = useMemo(
    () => (filter === 'All' ? featuredProjects : featuredProjects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-36 md:pt-44 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold-ink uppercase tracking-[0.3em] text-sm mb-3">Our Work</p>
          <h1 className="text-4xl md:text-6xl font-semibold text-ink leading-tight max-w-3xl">
            Featured Projects
          </h1>
          <p className="mt-5 text-lg text-ink/60 max-w-2xl leading-relaxed">
            A closer look at landmark buildings we have engineered — spanning IT parks,
            hospitals, industrial facilities, residential communities and hospitality.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 border-b border-ink/10 pb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2.5 min-h-11 rounded-full text-sm transition-colors ${
                filter === c
                  ? 'bg-gold text-[#060d18] font-semibold'
                  : 'border border-ink/15 text-ink/70 hover:text-ink hover:border-gold/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p, i) => (
            <motion.div key={p.slug} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <Link
                to={`/project/${p.slug}`}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-ink/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <img
                  src={p.card || p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.65] group-hover:brightness-90 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
                <div className="relative p-6">
                  <p className="text-xs uppercase tracking-widest text-gold mb-1.5">{p.category}</p>
                  <h3 className="text-xl font-semibold text-white drop-shadow leading-tight">{p.title}</h3>
                  {p.location && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/70">
                      <MapPin size={14} /> {p.location}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
