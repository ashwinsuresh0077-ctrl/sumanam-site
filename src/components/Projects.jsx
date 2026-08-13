import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projectImages } from '../data/projectImages'
import { Reveal } from '../lib/motion'

// Three real case studies, declared locally on purpose.
//
// Importing `featuredProjects` from data/projects.js would be tidier, but it
// drags projects.js (81 KB) + projectRecords.js (90 KB) into the landing
// bundle — App.jsx deliberately code-splits that ~600-project dataset so a
// first-time visitor never downloads it. projectImages.js is 12 KB and holds
// only paths, so the cards read their photography from there and carry their
// own three lines of copy.
const CARDS = [
  {
    slug: 'carnival-infopark-cochin',
    title: 'Carnival Infopark',
    category: 'IT Park · Cochin',
  },
  {
    slug: 'annai-hospital-tiruchengode',
    title: 'Annai Hospital',
    category: 'Healthcare · Tiruchengode',
  },
  {
    slug: '110-kv-substation-technopark',
    title: '110 KV Substation',
    category: 'Industrial · Technopark',
  },
]
  .map((c) => ({ ...c, gallery: projectImages[c.slug]?.gallery }))
  .filter((c) => c.gallery && c.gallery.length >= 3)

function ProjectCard({ project, index, total, progress }) {
  const reduce = useReducedMotion()
  // Each card shrinks as the ones after it slide over the top, so the stack
  // reads as depth rather than a pile. The last card never scales.
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  return (
    <div className="sticky top-24 flex justify-center md:top-32" style={{ height: '85vh' }}>
      <motion.article
        className="w-full overflow-hidden rounded-[40px] border-2 bg-bg p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{
          borderColor: 'color-mix(in srgb, var(--color-ink) 25%, transparent)',
          top: `${index * 28}px`,
          ...(reduce ? {} : { scale }),
        }}
      >
        {/* Top row — index, meta, CTA */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4 px-2 sm:mb-7 sm:px-4">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-ink"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)', opacity: 0.16 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="pt-1 sm:pt-3">
              <p className="mb-1 eyebrow" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}>
                {project.category}
              </p>
              <h3
                className="font-medium uppercase leading-tight text-ink"
                style={{ fontSize: 'clamp(1.05rem, 2.2vw, 2rem)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <Link
            to={`/project/${project.slug}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/10 sm:px-8 sm:py-3 sm:text-sm"
            style={{ borderColor: 'color-mix(in srgb, var(--color-ink) 30%, transparent)' }}
          >
            View Project <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Bottom row — 40 / 60 image grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div className="flex flex-col gap-3 sm:col-span-2">
            <img
              src={project.gallery[0]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full rounded-[32px] object-cover sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.gallery[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full rounded-[32px] object-cover sm:rounded-[40px] md:rounded-[50px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="sm:col-span-3">
            <img
              src={project.gallery[2]}
              alt={project.title}
              loading="lazy"
              className="h-full w-full rounded-[32px] object-cover sm:rounded-[40px] md:rounded-[50px]"
              style={{ minHeight: 'clamp(200px, 40vw, 585px)' }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="projects"
      // Pulled up over the light Services band with matching rounded corners,
      // so the dark panel visibly overlaps it.
      className="relative z-10 -mt-10 rounded-t-[40px] bg-bg px-5 pt-20 pb-10 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center sm:mb-20">
          <p className="mb-4 eyebrow" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}>
            Our Work
          </p>
          {/* Plain <h2> — see the note in About.jsx: a gradient text fill and
              per-word transforms are mutually exclusive. */}
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Projects
          </h2>
        </Reveal>

        <div ref={ref}>
          {CARDS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={CARDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <Reveal className="pt-10 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-medium text-ink/80 transition-all hover:gap-3 hover:text-ink"
          >
            View all featured projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
