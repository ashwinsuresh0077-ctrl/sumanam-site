// Module singleton so any component can drive the active Lenis instance
// (anchor scrolling, scroll-to-top on navigation) without prop drilling.
let current = null

export const setLenis = (l) => { current = l }
export const getLenis = () => current

// Smoothly scroll to a target (element or offset), falling back to the
// native API when Lenis is absent (e.g. reduced-motion users).
export function scrollToTarget(target, opts = {}) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, opts)
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' })
  } else if (target && target.scrollIntoView) {
    target.scrollIntoView({ behavior: opts.immediate ? 'auto' : 'smooth' })
  }
}
