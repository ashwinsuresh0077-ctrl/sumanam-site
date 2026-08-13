import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

const HEADING = 'BUILD\nWITHOUT\nLIMITS.'

const CHAR_DELAY = 30 // ms between characters
const CHAR_DURATION = 500 // ms per character transition
const START_DELAY = 200 // ms before the first character moves

/** True when the visitor has asked the OS to reduce motion. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

/**
 * Fades its children in after `delay` ms.
 * Mounted at opacity 0, flipped by a timeout so the transition actually runs
 * (setting the final value during the first render would skip it entirely).
 */
function FadeIn({ delay = 0, duration = 1000, className = '', children }) {
  const reduce = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setShown(true), delay)
    return () => clearTimeout(t)
  }, [delay, reduce])

  return (
    <div
      className={`transition-opacity ${shown ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transitionDuration: `${reduce ? 0 : duration}ms` }}
    >
      {children}
    </div>
  )
}

/**
 * Splits text on \n into lines and each line into characters, then slides each
 * character in from the left on a stagger.
 *
 * Per-character delay:
 *   (lineIndex * lineLength * CHAR_DELAY) + (charIndex * CHAR_DELAY)
 * so each line waits out the line before it, then runs its own stagger.
 */
function AnimatedHeading({ text, className = '', style }) {
  const reduce = usePrefersReducedMotion()
  const [start, setStart] = useState(reduce)

  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setStart(true), START_DELAY)
    return () => clearTimeout(t)
  }, [reduce])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={style} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, lineIndex) => {
        // Characters are inline-block, which makes every gap between them a
        // valid line-break opportunity — so a narrow viewport snaps words in
        // half. Grouping each word in a nowrap wrapper confines breaks to the
        // real spaces. `offset` keeps each character's index relative to the
        // whole line, so the stagger is unchanged.
        let cursor = 0
        const words = line.split(' ').map((word) => {
          const entry = { word, offset: cursor }
          cursor += word.length + 1 // +1 for the space that followed it
          return entry
        })

        return (
          <span key={lineIndex} className="block" aria-hidden="true">
            {words.map(({ word, offset }, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, i) => (
                    <span
                      key={i}
                      className="inline-block"
                      style={{
                        opacity: start ? 1 : 0,
                        transform: start ? 'translateX(0)' : 'translateX(-18px)',
                        transition: `opacity ${CHAR_DURATION}ms ease, transform ${CHAR_DURATION}ms ease`,
                        transitionDelay: reduce
                          ? '0ms'
                          : `${lineIndex * line.length * CHAR_DELAY + (offset + i) * CHAR_DELAY}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {/* A real space rather than &nbsp;: it renders identically
                    between inline-blocks but keeps the break opportunity. */}
                {wordIndex < words.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        )
      })}
    </h1>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Raw video ground — no overlay, no scrim, no dimming. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* The site <Navbar> is fixed-position and renders above this section,
          so it floats over the video on its own. The hero does not draw one. */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Hero content, pinned to the bottom of the viewport */}
        <div className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left — eyebrow, heading, subheading, buttons */}
            <div>
              <FadeIn delay={100} duration={800}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-9 bg-white/70" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                    Engineering Consultancy
                  </span>
                </div>
              </FadeIn>

              <AnimatedHeading
                text={HEADING}
                className="mb-4 text-5xl font-normal leading-[0.95] md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ letterSpacing: '-0.04em' }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 max-w-md text-base text-gray-300 md:text-lg">
                  MEP, BIM, lighting and project management for residential, commercial and
                  hospitality builds across Kerala and Tamil Nadu.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                  >
                    Start Your Project <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/#projects"
                    className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                  >
                    View Projects
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right — tag */}
            <FadeIn
              delay={1400}
              duration={1000}
              className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end"
            >
              <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                <p className="text-lg font-light md:text-xl lg:text-2xl">
                  MEP. BIM. Project Management.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
