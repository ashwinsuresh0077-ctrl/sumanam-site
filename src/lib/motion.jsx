import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE } from './ease'

// ── Reveal safety net ────────────────────────────────────────────────
// Every reveal below ships its content at opacity:0 and depends on an
// IntersectionObserver callback to bring it back. If that callback never
// arrives — observer unsupported, an offscreen-measurement quirk, a layout
// shift that leaves an element straddling the trigger margin — the content
// stays permanently invisible and the section reads as a blank gap.
//
// `useSafetyNet` forces the revealed state after a grace period so content is
// never lost. It only fires for elements actually near the viewport, so
// below-the-fold blocks keep their scroll-triggered animation.
const GRACE_MS = 1200

function useSafetyNet(ref) {
  // No observer at all → reveal immediately, decided at mount rather than in
  // an effect so there is no wasted render pass.
  const [forced, setForced] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    if (forced) return
    const t = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const nearViewport = r.top < window.innerHeight * 1.5 && r.bottom > -window.innerHeight * 0.5
      if (nearViewport) setForced(true)
    }, GRACE_MS)
    return () => clearTimeout(t)
  }, [ref, forced])
  return forced
}

// ── Scroll-based reveal ──────────────────────────────────────────────
// Fades + lifts a block into place the first time it enters the viewport.
export function Reveal({ children, className, y = 32, delay = 0, once = true }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const forced = useSafetyNet(ref)
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={forced ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// ── Section timeline / stagger ───────────────────────────────────────
// Wrap a group in <Stagger> and each child in <StaggerItem> to have them
// animate in sequence when the group scrolls into view.
const staggerParent = (stagger, delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})
const staggerChild = (y) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
})

export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.2, once = true }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const forced = useSafetyNet(ref)
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={reduce ? undefined : staggerParent(stagger, delay)}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      animate={forced ? 'visible' : undefined}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, y = 24, as = 'div' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div
  return (
    <Comp className={className} variants={reduce ? undefined : staggerChild(y)}>
      {children}
    </Comp>
  )
}

// ── Text reveal ──────────────────────────────────────────────────────
// Splits a heading into words that rise from a clipped baseline in
// sequence. Falls back to plain text under reduced motion.
export function TextReveal({ text, className, style, as = 'h2', stagger = 0.045, delay = 0 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const forced = useSafetyNet(ref)
  const Comp = motion[as] || motion.h2
  const words = String(text).split(' ')

  if (reduce) {
    const Plain = as
    return <Plain className={className} style={style}>{text}</Plain>
  }

  return (
    <Comp
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      animate={forced ? 'visible' : undefined}
      viewport={{ once: true, margin: '-40px' }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }} aria-hidden="true">
          <motion.span
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              hidden: { y: '110%' },
              visible: { y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Comp>
  )
}

// ── Magnet ───────────────────────────────────────────────────────────
// Mouse-following magnetic hover. Tracks the cursor relative to the
// element's centre and translates by that delta divided by `strength`,
// engaging once the pointer is within `padding` of the element's edge.
// Disabled entirely under reduced motion and on touch (no hover = the
// element would never return to centre).
export function Magnet({
  children,
  padding = 120,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover)').matches) return

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near =
        Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding

      if (near) {
        setActive(true)
        setPos({ x: dx / strength, y: dy / strength })
      } else {
        setActive(false)
        setPos({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [padding, strength, reduce])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-block',
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

// ── Scroll-driven text reveal ────────────────────────────────────────
// Each character lifts from 0.25 to full opacity as the paragraph moves
// through the viewport, so the sentence "writes itself" on scroll.
//
// Characters are plain inline spans, NOT inline-block: inline-block would
// make every character a valid line-break point and words would snap in
// half mid-word.
function Char({ children, progress, range, reduce }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  return <motion.span style={{ opacity: reduce ? 1 : opacity }}>{children}</motion.span>
}

export function AnimatedText({ text, className, style, as: Tag = 'p' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = Array.from(String(text))

  return (
    <Tag ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <Char
          key={i}
          progress={scrollYProgress}
          range={[i / chars.length, (i + 1) / chars.length]}
          reduce={reduce}
        >
          {char}
        </Char>
      ))}
    </Tag>
  )
}

// ── Parallax ─────────────────────────────────────────────────────────
// Translates its child on the Y axis as the element scrolls through the
// viewport. `speed` is the total travel in px (positive = moves up).
export function Parallax({ children, className, speed = 60 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}
