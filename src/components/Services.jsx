import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { Reveal, TextReveal } from '../lib/motion'

// Full-bleed escape hatch. Percentages resolve against the max-w-6xl column,
// so the negative margin pulls the row out past the section's own padding to
// the viewport edges, and the matching padding puts the content back exactly
// where it was. The result: the hover band and the click target run edge to
// edge while the copy stays in the column. The section clips the overflow, so
// this never produces a horizontal scrollbar.
const BLEED = {
  marginLeft: 'calc(50% - 50vw)',
  marginRight: 'calc(50% - 50vw)',
  paddingLeft: 'calc(50vw - 50%)',
  paddingRight: 'calc(50vw - 50%)',
}

function ServiceRow({ service, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // The photo is taller than its frame and drifts upward as the row crosses
  // the viewport. The travel is capped at the exact overflow (28% of the frame
  // height) so the frame is never left with an uncovered edge.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  // The numeral moves against the photo — slower and in the other direction —
  // which is what makes the row read as layered rather than flat.
  const numberY = useTransform(scrollYProgress, [0, 1], [18, -18])

  const photo = (
    <motion.img
      src={service.image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="w-full object-cover"
      style={{ height: '128%', ...(reduce ? {} : { y: imageY }) }}
    />
  )

  return (
    <Link
      ref={ref}
      to={`/services/${service.slug}`}
      className="group block transition-colors duration-500 hover:bg-ink/[0.03]"
      style={BLEED}
    >
      <div
        className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--color-ink) 15%, transparent)' }}
      >
        <motion.span
          className="shrink-0 font-black leading-none text-ink opacity-[0.16] transition-opacity duration-500 group-hover:opacity-40"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)', ...(reduce ? {} : { y: numberY }) }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        <div className="flex-1 pt-1 transition-transform duration-500 group-hover:translate-x-2 sm:pt-2 md:pt-4">
          <h3
            className="mb-2 font-medium uppercase leading-tight text-ink sm:mb-3"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
          >
            {service.title}
          </h3>
          <p
            className="max-w-2xl font-light leading-relaxed text-ink/60"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
          >
            {service.intro}
          </p>

          {/* On phones the row is already carrying the numeral and the copy, so
              the thumbnail drops below the text instead of competing with them
              for width. */}
          <div className="mt-5 h-32 overflow-hidden rounded-[20px] sm:hidden">{photo}</div>
        </div>

        <div
          className="hidden shrink-0 overflow-hidden rounded-[24px] transition-transform duration-700 group-hover:scale-105 sm:block md:rounded-[32px]"
          style={{ width: 'clamp(150px, 18vw, 260px)', height: 'clamp(100px, 12vw, 170px)' }}
        >
          {photo}
        </div>

        <ArrowUpRight
          size={22}
          strokeWidth={1.5}
          className="mt-2 shrink-0 -translate-x-2 translate-y-2 text-ink/70 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:mt-4 md:mt-6"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      // Rounded top corners + a light band lift this section off the dark
      // page above it, so the page reads as stacked panels rather than one
      // continuous scroll.
      // `overflow-hidden` contains the rows' full-bleed hover band (see BLEED):
      // 50vw counts the scrollbar, so without it the band would overhang the
      // document and add a horizontal scrollbar.
      className="relative z-10 overflow-hidden rounded-t-[40px] bg-bg-alt px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center sm:mb-20 md:mb-24">
          <p className="mb-4 eyebrow" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}>
            What We Do
          </p>
          <TextReveal
            as="h2"
            text="Services"
            className="font-black uppercase leading-none tracking-tight text-ink"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          />
        </Reveal>

        <div>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <ServiceRow service={s} index={i} />
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid color-mix(in srgb, var(--color-ink) 15%, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
