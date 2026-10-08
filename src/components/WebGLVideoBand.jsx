import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useVideoTexture } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { asset } from '../lib/asset.js'

const SRC = asset('/sum-new-vd.mp4')

// The clip rendered through WebGL and SCRUBBED by scroll: the plane shows the
// video, and the frame shown is driven by how far the band has travelled
// through the viewport. Scroll down and the clip plays forward, scroll up and
// it runs back — it only moves while you move.
//
// The band is a tall region with a sticky, full-viewport canvas inside it, so
// there is scroll distance to scrub across while the picture stays pinned.
function VideoCover({ sectionRef }) {
  const { viewport } = useThree()
  const tex = useVideoTexture(SRC, {
    start: false,
    muted: true,
    loop: false,
    crossOrigin: 'anonymous',
    playsInline: true,
  })
  const prog = useRef(0)

  useFrame(() => {
    const el = sectionRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const total = Math.max(1, rect.height - window.innerHeight)
      const p = Math.min(1, Math.max(0, -rect.top / total))
      // Ease toward the scroll target so fast flicks don't thrash the decoder.
      prog.current += (p - prog.current) * 0.12
    }

    const v = tex.image
    if (v && v.readyState >= 2) {
      const dur = v.duration || 10
      const target = prog.current * (dur - 0.05)
      if (Math.abs(v.currentTime - target) > 0.008) {
        try {
          v.currentTime = target
        } catch {
          /* seeking before the clip is seekable — ignore */
        }
      }
      // Force the texture to re-upload the freshly seeked frame each tick;
      // a paused video never flags this on its own.
      tex.needsUpdate = true

      // Cover-fit the clip to the viewport (crop, never letterbox).
      const va = viewport.width / viewport.height
      const ta = (v.videoWidth || 848) / (v.videoHeight || 478)
      if (ta > va) {
        const r = va / ta
        tex.repeat.set(r, 1)
        tex.offset.set((1 - r) / 2, 0)
      } else {
        const r = ta / va
        tex.repeat.set(1, r)
        tex.offset.set(0, (1 - r) / 2)
      }
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  )
}

export default function WebGLVideoBand() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)

  // Reduced motion / no desire for scrub: a plain, controllable clip.
  if (reduce) {
    return (
      <section aria-label="Sumanam Engineering Services in motion" className="relative bg-bg">
        <video
          src={SRC}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-[60vh] min-h-[320px] w-full object-cover sm:h-[72vh]"
        />
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Sumanam Engineering Services in motion"
      className="relative bg-bg"
      style={{ height: '220vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 100 }}
        >
          <Suspense fallback={null}>
            <VideoCover sectionRef={sectionRef} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
