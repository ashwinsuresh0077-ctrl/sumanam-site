import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Building2, Check, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { allProjects, getAnyProject, sectorProfiles } from '../data/projects'
import { getWork } from '../data/work'
import { scrollToTarget } from '../lib/lenis'
import { useSeo } from '../lib/seo'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getAnyProject(slug)

  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [slug])

  // Must run before the early return below — hooks cannot be conditional.
  // Record pages are noindex: see the rationale in lib/seo.js.
  useSeo({
    title: project?.title,
    description: project
      ? project.overview?.slice(0, 200) ||
        `${project.title}${project.client ? ` for ${project.client}` : ''} — ${project.category} project by Sumanam Engineering Services.`
      : undefined,
    image: project?.hasRealImages ? project.image : undefined,
    path: `/project/${slug}`,
    noindex: project?.kind === 'record',
  })

  if (!project) {
    return (
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-semibold text-ink">Project not found</h1>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-gold text-[#060d18] font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={18} /> All projects
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const sector = getWork(project.categorySlug)
  const isRecord = project.kind === 'record'
  const profile = sectorProfiles[project.categorySlug]

  // Prefer full case studies in the same sector as "related", then top up.
  const related = allProjects
    .filter((p) => p.categorySlug === project.categorySlug && p.slug !== project.slug)
    .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'case-study' ? -1 : 1))
    .slice(0, 3)
  if (related.length < 3) {
    for (const p of allProjects) {
      if (related.length >= 3) break
      if (p.slug !== project.slug && !related.includes(p)) related.push(p)
    }
  }

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 to-black/25" />
        <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col justify-end pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link
              to={sector ? `/work/${sector.slug}` : '/projects'}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> {sector ? sector.title : 'Projects'}
            </Link>
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              {project.category}
              {isRecord && project.sector ? ` · ${project.sector}` : ''}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl drop-shadow leading-tight">
              {project.headline || project.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {project.location && (
                <p className="inline-flex items-center gap-2 text-lg text-white/80">
                  <MapPin size={18} className="text-gold" /> {project.location}
                </p>
              )}
              {project.client && (
                <p className="inline-flex items-center gap-2 text-lg text-white/80">
                  <Building2 size={18} className="text-gold" /> {project.client}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meta chips */}
      {project.meta?.length > 0 && (
        <section className="border-b border-ink/10 bg-bg-alt">
          <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {project.meta.map((m) => (
              <div key={m.label}>
                <p className="text-xs uppercase tracking-widest text-gold-ink">{m.label}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{m.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery — only for projects with real photography */}
      {project.hasRealImages && project.gallery?.length > 1 && (
        <section className="px-6 pt-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {project.gallery.slice(1).map((src, i) => (
              <motion.img
                key={src}
                {...fadeUp}
                src={src}
                alt={`${project.title} — view ${i + 2}`}
                loading="lazy"
                className="h-40 md:h-56 w-full object-cover rounded-2xl border border-ink/10"
              />
            ))}
          </div>
        </section>
      )}

      {/* Body — record variant: verified facts + sector capability, no invented scope */}
      {isRecord && (
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto space-y-14">
            <motion.div {...fadeUp}>
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold-ink mb-6">Project Details</h2>
              <dl className="divide-y divide-ink/10 border-y border-ink/10">
                {[
                  ['Project', project.title],
                  ['Client', project.client],
                  ['Sector', project.category],
                  ['Engagement', `${project.sector} Project`],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 py-4">
                      <dt className="text-sm uppercase tracking-widest text-ink/40">{k}</dt>
                      <dd className="col-span-2 text-ink/85">{v}</dd>
                    </div>
                  ))}
              </dl>
            </motion.div>

            {profile && (
              <motion.div {...fadeUp}>
                <h2 className="text-sm uppercase tracking-[0.25em] text-gold-ink mb-4">
                  Our {profile.label} Practice
                </h2>
                <p className="text-lg text-ink/75 leading-relaxed">{profile.intro}</p>
                <ul className="mt-6 space-y-4">
                  {profile.disciplines.map((d) => (
                    <li key={d.label} className="flex gap-4 rounded-2xl border border-ink/10 bg-bg-alt p-5">
                      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                        <Check size={14} className="text-gold" strokeWidth={2.5} />
                      </span>
                      <p className="text-ink/80 leading-relaxed">
                        <span className="font-semibold text-ink">{d.label}:</span> {d.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div {...fadeUp} className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-6">
              <p className="text-ink/75 leading-relaxed">
                The section above describes the scope our {profile ? profile.label.toLowerCase() : 'engineering'} practice
                typically covers, not a project-specific breakdown.{' '}
                <Link to="/#contact" className="text-gold-ink font-semibold hover:underline">
                  Get in touch
                </Link>{' '}
                for details, drawings or references on this project.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Body — full case study */}
      {!isRecord && (
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-14">
          <motion.div {...fadeUp}>
            <h2 className="text-sm uppercase tracking-[0.25em] text-gold-ink mb-4">Project Overview</h2>
            <p className="text-lg text-ink/75 leading-relaxed">{project.overview}</p>
          </motion.div>

          {project.role && (
            <motion.div {...fadeUp}>
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold-ink mb-4">Our Role in the Project</h2>
              <p className="text-lg text-ink/75 leading-relaxed">{project.role}</p>
            </motion.div>
          )}

          {project.scope?.length > 0 && (
            <motion.div {...fadeUp}>
              <h2 className="text-sm uppercase tracking-[0.25em] text-gold-ink mb-6">Scope of Work</h2>
              <ul className="space-y-4">
                {project.scope.map((s) => (
                  <li key={s.label} className="flex gap-4 rounded-2xl border border-ink/10 bg-bg-alt p-5">
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                      <Check size={14} className="text-gold" strokeWidth={2.5} />
                    </span>
                    <p className="text-ink/80 leading-relaxed">
                      <span className="font-semibold text-ink">{s.label}:</span> {s.text}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {project.closing && (
            <motion.p {...fadeUp} className="text-lg text-ink/75 leading-relaxed border-l-2 border-gold pl-6">
              {project.closing}
            </motion.p>
          )}
        </div>
      </section>
      )}

      {/* CTA row */}
      <section className="py-14 px-6 border-t border-ink/10">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link to="/#contact" className="group flex items-center justify-between gap-3 rounded-2xl bg-gold text-[#060d18] font-semibold px-7 py-5 hover:bg-gold-light transition-colors">
            Discuss your project <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link to="/projects" className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/15 text-ink font-semibold px-7 py-5 hover:border-gold/50 hover:bg-bg-alt transition-colors">
            View all projects <ArrowUpRight size={20} className="text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Related projects */}
      <section className="pb-24 pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-10">Related Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/project/${p.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-ink/10 bg-bg-alt hover:border-gold/50 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={p.card || p.image} alt={p.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover brightness-[0.8] transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white/80 group-hover:border-gold group-hover:text-gold group-hover:bg-gold/10 transition-all duration-300">
                    <ArrowUpRight size={15} />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[11px] uppercase tracking-widest text-gold/90">{p.category}</p>
                    <h3 className="text-lg font-semibold text-white drop-shadow leading-tight">{p.title}</h3>
                  </div>
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
