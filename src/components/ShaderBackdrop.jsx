import { Suspense, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Mounts a ThreeUI shader as a section background.
//
// Every ThreeUI component renders an <iframe srcDoc> running its own WebGL
// context. Browsers cap live contexts (~16) and drop the oldest when you pass
// it, so leaving three of these mounted for the whole page is not an option —
// the canvases start blanking out. This wrapper mounts a shader only while its
// section is near the viewport and unmounts it once the visitor has scrolled
// well past, which keeps at most one context alive on a normal read-through.
//
// It also mirrors the site theme. The shaders take mode="light" | "dark" but
// can't see our <html data-theme>, so we watch that attribute and hand the
// value down.
//
// Pass `as` a React.lazy component declared at module scope. Imported
// statically, ThreeUI's shared shader module put 347 KB (70 KB gzipped) into
// the landing bundle — every visitor paying for two decorations well below the
// fold. Lazy keeps that weight off first paint, the same reason App.jsx splits
// its routes.
export default function ShaderBackdrop({
  as: Shader,
  opacity = 1,
  className = '',
  style,
  ...shaderProps
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [near, setNear] = useState(false)
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark',
  )

  useEffect(() => {
    const el = ref.current
    if (!el || reduce || typeof IntersectionObserver === 'undefined') return
    // Generous margin: start the shader before it scrolls into view so the
    // visitor never catches it warming up, and keep it alive a screen past.
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: '300px 0px 300px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  useEffect(() => {
    const mo = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark'),
    )
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  // Reduced motion gets a still section, not a paused animation.
  if (reduce) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity, ...style }}
    >
      {near && (
        <Suspense fallback={null}>
          <Shader mode={theme} style={{ width: '100%', height: '100%' }} {...shaderProps} />
        </Suspense>
      )}
    </div>
  )
}
