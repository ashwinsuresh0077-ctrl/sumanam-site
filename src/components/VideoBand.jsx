import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { asset } from '../lib/asset.js'

// Full-bleed brand clip that plays while it is on screen and pauses once it
// scrolls out of view — so it is running the moment the visitor reaches it
// without burning cycles above or below the fold.
//
// Same load-bearing detail as the About clip: React sets `muted` as a DOM
// property but never writes the attribute Chrome's autoplay policy actually
// checks, so we set the property and call play() ourselves. Under reduced
// motion it does not autoplay and gains controls instead.
export default function VideoBand() {
  const reduce = useReducedMotion()
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

  return (
    <section aria-label="Sumanam Engineering Services in motion" className="relative bg-bg">
      <video
        ref={ref}
        src={asset('/sum-new-vd.mp4')}
        autoPlay={!reduce}
        loop
        muted
        playsInline
        controls={reduce}
        preload="metadata"
        className="block h-[60vh] min-h-[320px] w-full object-cover sm:h-[72vh]"
      />
    </section>
  )
}
