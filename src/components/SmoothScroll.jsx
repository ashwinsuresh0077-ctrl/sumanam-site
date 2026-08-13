import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { setLenis, getLenis, scrollToTarget } from '../lib/lenis'

// Inertia-based smooth scrolling (Lenis). Disabled entirely under
// prefers-reduced-motion so those users keep native, instant scrolling.
export default function SmoothScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    setLenis(lenis)

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // New page → jump to top. Hash present → smooth-scroll to the anchor
  // once the target section has mounted.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // Defer a frame so layout is settled before measuring the target.
        requestAnimationFrame(() => scrollToTarget(el, { offset: -80 }))
        return
      }
    }
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
