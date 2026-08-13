import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Check, Quote } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { services, getService } from '../data/services'
import { scrollToTarget } from '../lib/lenis'
import { useSeo } from '../lib/seo'

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function Reveal({ children, className }) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ children, subtitle }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-2xl md:text-4xl font-semibold text-ink">{children}</h2>
      {subtitle && <p className="mt-3 text-ink/65 text-lg">{subtitle}</p>}
    </div>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <span className="mt-1 w-5 h-5 bg-gold/10 border border-gold/50 flex items-center justify-center shrink-0">
            <Check size={12} className="text-gold-ink" strokeWidth={3} />
          </span>
          <span className="text-ink/65 leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ s }) {
  switch (s.type) {
    case 'quote':
      return (
        <Reveal className="max-w-3xl mx-auto text-center px-4">
          <Quote className="mx-auto mb-5 text-gold/60" size={32} />
          <p className="text-xl md:text-2xl font-medium italic text-ink/65 leading-relaxed">
            {s.text}
          </p>
        </Reveal>
      )

    case 'featured':
      return (
        <Reveal className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img src={s.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            {s.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="text-white text-sm">{s.caption}</p>
              </div>
            )}
          </div>
          <div className="space-y-5">
            {s.heading && <SectionHeading>{s.heading}</SectionHeading>}
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-ink/65 leading-relaxed">{p}</p>
            ))}
          </div>
        </Reveal>
      )

    case 'prose':
      return (
        <Reveal className="max-w-3xl">
          {s.heading && (
            <>
              <p className="text-gold-ink uppercase tracking-[0.25em] text-xs mb-3">{s.heading}</p>
            </>
          )}
          <div className="space-y-5">
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-ink/65 leading-relaxed">{p}</p>
            ))}
          </div>
        </Reveal>
      )

    case 'features':
      return (
        <Reveal>
          {s.heading && <SectionHeading subtitle={s.subtitle}>{s.heading}</SectionHeading>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {s.items.map((it) => {
              const Icon = it.icon
              return (
                <div
                  key={it.title}
                  className="rounded-2xl border border-ink/10 bg-bg-alt p-6 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/50 flex items-center justify-center mb-4">
                    <Icon className="text-gold-ink" size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-ink mb-1.5">{it.title}</h3>
                  {it.desc && <p className="text-ink/65 leading-relaxed text-sm">{it.desc}</p>}
                </div>
              )
            })}
          </div>
        </Reveal>
      )

    case 'lists':
      return (
        <Reveal>
          {s.heading && <SectionHeading subtitle={s.subtitle}>{s.heading}</SectionHeading>}
          {s.groups ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {s.groups.map((g) => (
                <div key={g.title} className="rounded-2xl border border-ink/10 bg-bg-alt p-7">
                  <h3 className="text-lg font-semibold text-ink mb-5">{g.title}</h3>
                  <Bullets items={g.items} />
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl rounded-2xl border border-ink/10 bg-bg-alt p-7">
              <Bullets items={s.items} />
            </div>
          )}
        </Reveal>
      )

    case 'projects':
      return (
        <Reveal>
          {s.heading && <SectionHeading>{s.heading}</SectionHeading>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {s.items.map((p) => (
              <div key={p.title} className="rounded-2xl border border-ink/10 bg-bg-alt p-6 hover:border-gold/50 transition-colors">
                <div className="w-8 h-1 bg-gold mb-4" />
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                {p.meta && <p className="text-gold-ink text-sm mt-1">{p.meta}</p>}
                {p.desc && <p className="text-ink/65 leading-relaxed text-sm mt-2">{p.desc}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      )

    case 'chips':
      return (
        <Reveal>
          {s.heading && <SectionHeading subtitle={s.subtitle}>{s.heading}</SectionHeading>}
          <div className="flex flex-wrap gap-3">
            {s.items.map((c) => (
              <span
                key={c}
                className="px-4 py-2 rounded-full border border-ink/10 bg-bg-alt text-ink/65 text-sm hover:border-gold/50 hover:text-ink transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      )

    default:
      return null
  }
}

// Alternate section background bands so long pages have rhythm.
function bandClass(i) {
  return i % 2 === 1 ? 'bg-ink/[0.04]' : 'bg-bg'
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  useEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [slug])

  // Above the early return — hooks cannot be conditional.
  useSeo({
    title: service?.title,
    description: service?.tagline,
    path: `/services/${slug}`,
  })

  if (!service) {
    return (
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-3xl font-semibold text-ink">Service not found</h1>
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 bg-gold text-[#060d18] font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={18} /> Back to services
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const Icon = service.icon
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[72vh] min-h-[460px] w-full overflow-hidden">
        <img src={service.hero} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/#services" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={16} /> All Services
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Icon className="text-gold" size={26} strokeWidth={1.5} />
              </div>
              <p className="text-gold-ink uppercase tracking-[0.3em] text-sm">Our Services</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-white max-w-3xl">{service.title}</h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl">{service.intro}</p>
            <Link
              to="/#contact"
              className="mt-8 inline-flex items-center gap-2 bg-gold text-[#060d18] font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
            >
              Discuss your project <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      {service.sections.map((s, i) => (
        <section key={i} className={`py-16 md:py-20 px-6 ${bandClass(i)}`}>
          <div className="max-w-7xl mx-auto">
            <Section s={s} />
          </div>
        </section>
      ))}

      {/* CTA row */}
      <section className="py-16 px-6 border-t border-ink/10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          <Link to="/#contact" className="group flex items-center justify-between gap-3 bg-gold text-[#060d18] font-semibold px-7 py-5 rounded-2xl hover:bg-gold-light transition-colors">
            Contact us <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link to="/#services" className="group flex items-center justify-between gap-3 border border-ink/10 text-ink font-semibold px-7 py-5 rounded-2xl hover:border-gold/50 hover:bg-bg-alt transition-colors">
            View our services <ArrowUpRight size={20} className="text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link to="/#projects" className="group flex items-center justify-between gap-3 border border-ink/10 text-ink font-semibold px-7 py-5 rounded-2xl hover:border-gold/50 hover:bg-bg-alt transition-colors">
            View our projects <ArrowUpRight size={20} className="text-gold-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Related services */}
      <section className="pb-24 pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-10">Explore other services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group block overflow-hidden rounded-2xl border border-ink/10 bg-bg-alt shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:border-gold/50 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">{s.title}</h3>
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
