import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Layers, Leaf, Clock, MapPin } from 'lucide-react'
import { AnimatedText } from '../lib/motion'
import { asset } from '../lib/asset.js'

const points = [
  {
    icon: Layers,
    title: 'Integrated MEP + BIM',
    desc: 'Mechanical, electrical, plumbing and modelling in one team, so clashes are resolved in the model rather than on site.',
  },
  {
    icon: Leaf,
    title: 'Sustainable by Design',
    desc: 'Energy-efficient, code-compliant systems that lower running costs across a building’s lifetime.',
  },
  {
    icon: Clock,
    title: 'On Time, On Budget',
    desc: 'PMC discipline that keeps timelines, cost and quality predictable from design through handover.',
  },
  {
    icon: MapPin,
    title: 'Two Offices, One Team',
    desc: 'Thiruvananthapuram and Chennai, delivering across Kerala and Tamil Nadu.',
  },
]

// Same choreography as the Services rows: the decorative element (there the
// numeral, here the icon tile) drifts against the scroll while the copy holds
// still, and the row lights up as a band on hover.
function Point({ point, index, rise, reduce }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Deliberately small — the tile is unclipped, so a Services-sized drift
  // would visibly break out of the row's padding.
  const iconY = useTransform(scrollYProgress, [0, 1], [8, -8])
  const Icon = point.icon

  return (
    <motion.div
      ref={ref}
      initial={rise}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      // The band bleeds past the column so the tint reads as a row rather than
      // a box hugging the text; the divider moved inside to stay put.
      className="group -mx-4 px-4 transition-colors duration-500 hover:bg-ink/[0.04]"
    >
      <div className={`flex gap-5 py-6 ${index > 0 ? 'border-t border-ink/10' : ''}`}>
        <motion.div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-ink/[0.05] transition-all duration-500 group-hover:border-ink/20 group-hover:bg-ink/10"
          style={reduce ? undefined : { y: iconY }}
        >
          <Icon className="text-ink/70 transition-colors duration-500 group-hover:text-ink" size={20} strokeWidth={1.5} />
        </motion.div>
        <div className="transition-transform duration-500 group-hover:translate-x-1.5">
          <h3 className="mb-1.5 font-medium text-ink">{point.title}</h3>
          <p className="text-sm leading-relaxed text-ink/65">{point.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

// The looping visual only runs while it is actually on screen, and only for
// visitors who haven't asked for less motion.
//
// The `muted` assignment is load-bearing: React sets muted as a DOM property
// but never writes the attribute, and Chrome's autoplay policy reads the
// attribute when the element is inserted — so the `autoPlay` prop alone is
// silently blocked. Setting the property and calling play() ourselves is what
// actually starts it.
function useInViewPlayback(reduce) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    el.muted = true

    if (typeof IntersectionObserver === 'undefined') {
      el.play().catch(() => {})
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  return ref
}

export default function About() {
  const reduce = useReducedMotion()
  const rise = reduce ? false : { opacity: 0, y: 24 }
  const videoRef = useInViewPlayback(reduce)

  return (
    <section id="about" className="relative py-28 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Stacked header: headline and lead read top-down, no split-header float. */}
        <motion.div
          initial={rise}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* A plain <h2>, not <TextReveal>. `background-clip: text` clips the
              gradient to where the glyphs sit BEFORE transforms; TextReveal
              translates each word span, so the fill would paint where the
              text no longer is and the heading renders invisible. The
              surrounding motion.div still fades the block in. */}
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)' }}
          >
            Engineering partners, not just consultants
          </h2>
          {/* Character-by-character scroll reveal: the sentence lifts out of
              the page as it passes through the viewport. */}
          <AnimatedText
            className="mt-8 max-w-2xl font-medium leading-relaxed text-ink"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            text="For over a decade we have designed the systems behind residential, commercial, hospitality and institutional buildings across Kerala and Tamil Nadu. Mechanical, electrical, plumbing and modelling sit under one roof, so coordination happens before site, not on it."
          />
        </motion.div>

        {/* Asymmetric 7/5 split: tall visual against hairline-divided credentials. */}
        {/* Columns stretch rather than centre, so the video panel and the
            credentials list share one top and bottom edge. */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            {/* The list is the taller column, so the panel takes its height and
                centres the clip inside. Black matte, not object-cover: cover
                would crop the labelled callouts back off. */}
            <div className="flex h-full items-center overflow-hidden rounded-xl border border-ink/10 bg-black">
              {/* A muted, looping, inline video rather than an actual GIF —
                  same "it just plays" effect at a fraction of the weight, and
                  it keeps the scale-in reveal the still image had. Under
                  reduced motion it stops autoplaying and gains controls, so
                  nothing moves until the visitor asks for it. */}
              <motion.video
                ref={videoRef}
                src={asset('/mep-bim-pmc.mp4')}
                aria-label="MEP, BIM and project management work in a completed commercial interior"
                autoPlay={!reduce}
                loop
                muted
                playsInline
                controls={reduce}
                preload="metadata"
                // 16:9 to match the source exactly. The still it replaced used
                // 4/3 and 16/11 crops, but this clip has labelled callouts
                // running to its edges — any crop cuts the words off.
                className="aspect-video w-full object-contain"
                initial={reduce ? false : { scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>

          <div className="lg:col-span-5 border-y border-ink/10">
            {points.map((p, i) => (
              <Point key={p.title} point={p} index={i} rise={rise} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
