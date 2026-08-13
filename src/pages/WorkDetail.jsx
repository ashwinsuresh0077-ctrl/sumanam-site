import { useEffect, useState, useDeferredValue } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { workCategories, getWork } from '../data/work'
import { getProjectForRow } from '../data/projects'
import { scrollToTarget } from '../lib/lenis'
import { useSeo } from '../lib/seo'

function ProjectTable({ heading, rows, categorySlug }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-ink">{heading}</h2>
        <span className="shrink-0 text-sm text-ink/65">{rows.length} {rows.length === 1 ? 'project' : 'projects'}</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-bg-alt">
        {/* Column header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-bg-alt">
          <div className="bg-bg-alt px-5 py-3 text-xs uppercase tracking-widest text-gold-ink">Project</div>
          <div className="hidden sm:block bg-bg-alt px-5 py-3 text-xs uppercase tracking-widest text-gold-ink">Client</div>
        </div>
        {/* Rows */}
        <div className="divide-y divide-ink/[0.07]">
          {rows.map((r, i) => {
            const project = getProjectForRow(categorySlug, r.project, r.client)
            const RowTag = project ? Link : 'div'
            const rowProps = project
              ? { to: `/project/${project.slug}`, className: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 px-5 py-4 hover:bg-gold/[0.06]] transition-colors group' }
              : { className: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 px-5 py-4 hover:bg-gold/[0.04]] transition-colors' }
            return (
              <RowTag key={i} {...rowProps}>
                <div className="text-ink leading-snug flex items-center gap-1.5">
                  <span className={project ? 'group-hover:text-gold-ink transition-colors' : undefined}>{r.project}</span>
                  {project && <ArrowUpRight size={14} className="shrink-0 text-gold-ink opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                {r.client && (
                  <div className="text-ink/65 text-sm sm:text-base leading-snug mt-1 sm:mt-0">
                    {/* On mobile, label the client so the value has context. */}
                    <span className="sm:hidden text-ink/65 uppercase tracking-widest text-[10px] mr-2">Client</span>
                    {r.client}
                  </div>
                )}
              </RowTag>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkDetail() {
  const { slug } = useParams()
  const category = getWork(slug)
  const [query, setQuery] = useState('')
  // Keeps typing responsive while re-filtering a 200+ row table.
  const deferredQuery = useDeferredValue(query)

  // Router reuses this component across sectors, so clear a stale search when
  // the slug changes. Adjusting state during render (rather than in an effect)
  // avoids the extra commit + cascading render.
  const [lastSlug, setLastSlug] = useState(slug)
  if (lastSlug !== slug) {
    setLastSlug(slug)
    setQuery('')
  }

  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [slug])

  useSeo({
    title: category?.title,
    description: category?.subtitle,
    path: `/work/${slug}`,
  })

  if (!category) {
    return (
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-semibold text-ink">Sector not found</h1>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 bg-gold text-[#060d18] font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={18} /> Back to our work
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = category.icon
  const related = workCategories.filter((c) => c.slug !== category.slug)

  // Apartments alone runs to 204 rows / ~13,500px. Filtering the tables keeps
  // these pages usable without paginating away the "everything we've built"
  // impression the full list gives.
  const needle = deferredQuery.trim().toLowerCase()
  const sections = needle
    ? category.sections
        .map((s) => ({
          ...s,
          rows: s.rows.filter(
            (r) =>
              r.project.toLowerCase().includes(needle) ||
              (r.client || '').toLowerCase().includes(needle),
          ),
        }))
        .filter((s) => s.rows.length)
    : category.sections

  const matchCount = sections.reduce((n, s) => n + s.rows.length, 0)
  const totalCount = category.sections.reduce((n, s) => n + s.rows.length, 0)

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img src={category.image} alt={category.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} /> Our Work
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Icon className="text-gold" size={26} strokeWidth={1.5} />
              </div>
              <p className="text-gold-ink uppercase tracking-[0.3em] text-sm">Our Work</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-3xl">{category.title}</h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">{category.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Project tables */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Search — this sector has {totalCount} rows; filtering makes it navigable. */}
          <div>
            <label htmlFor="project-search" className="sr-only">
              Search {category.title} projects by name or client
            </label>
            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/65"
              />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${totalCount} projects by name or client…`}
                className="w-full rounded-xl border border-ink/10 bg-bg-alt py-4 pl-12 pr-12 text-ink placeholder-ink/65 focus:border-gold/50 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center text-ink/65 hover:bg-bg-alt hover:text-ink transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {query && (
              <p role="status" className="mt-3 text-sm text-ink/65">
                {matchCount === 0
                  ? `No projects match “${query}”.`
                  : `${matchCount} of ${totalCount} projects match “${query}”.`}
              </p>
            )}
          </div>

          {sections.map((s) => (
            <ProjectTable key={s.heading} heading={s.heading} rows={s.rows} categorySlug={category.slug} />
          ))}

          {matchCount === 0 && query && (
            <p className="text-ink/65">
              Try a different name, or{' '}
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-gold-ink font-semibold hover:underline"
              >
                clear the search
              </button>{' '}
              to see all {totalCount}.
            </p>
          )}
        </div>
      </section>

      {/* CTA row */}
      <section className="py-16 px-6 border-t border-ink/10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link to="/#contact" className="group flex items-center justify-between gap-3 bg-gold text-[#060d18] font-semibold px-7 py-5 rounded-2xl hover:bg-gold-light transition-colors">
            Discuss your project <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link to="/#services" className="group flex items-center justify-between gap-3 border border-ink/10 text-ink font-semibold px-7 py-5 rounded-2xl hover:border-gold/50 hover:bg-bg-alt transition-colors">
            View our services <ArrowUpRight size={20} className="text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Related sectors */}
      <section className="pb-24 pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-10">Explore other sectors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {related.map((c) => (
              <Link
                key={c.slug}
                to={`/work/${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-ink/10 bg-bg-alt shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:border-gold/50 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover brightness-[0.8] transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 group-hover:border-gold/50 group-hover:text-gold-ink group-hover:bg-gold/10 transition-all duration-300">
                    <ArrowUpRight size={15} />
                  </div>
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white">{c.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
