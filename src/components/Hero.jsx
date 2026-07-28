import { Suspense, useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import gsap from 'gsap'
import HeroScene from './HeroScene'
import DashboardPanels from './DashboardPanels'

const chips = ['Clash Detection', 'Coordination', '4D Scheduling', '5D Estimation', 'Asset Management']

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.8 })
        .from('.hero-title', { y: 60, opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .from('.hero-chip', { y: 16, opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.4')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen w-full overflow-hidden bg-base blueprint pt-28 pb-10"
    >
      {/* 3D scene fills the right / center */}
      <div className="absolute inset-0 lg:left-[20%]">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* readability gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-base/40" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full">
        <div className="flex items-start justify-between gap-8">
          {/* Left copy */}
          <div className="max-w-xl pt-8">
            <p className="hero-eyebrow text-cyan-bright tracking-[0.32em] text-xs md:text-sm mb-5 uppercase">
              Innovate &middot; Collaborate &middot; Deliver
            </p>

            <h1 className="hero-title font-display font-extrabold leading-[1.05] text-white text-5xl md:text-6xl xl:text-7xl">
              <span className="whitespace-nowrap">
                MEP <span className="text-cyan-bright">&bull;</span> BIM{' '}
                <span className="text-cyan-bright">&bull;</span> PMS
              </span>
              <br />
              CONSULTANCY
              <br />
              <span className="text-gradient">SERVICES</span>
            </h1>

            <p className="hero-sub text-white/60 text-base md:text-lg max-w-md mt-7 leading-relaxed">
              End-to-end engineering and digital consultancy for efficient, sustainable and
              future-ready buildings through BIM and intelligent project management.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <a
                href="#services"
                className="hero-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-brand text-base font-semibold text-[#03101f] text-sm uppercase tracking-wider px-7 py-4 hover:shadow-[0_0_35px_-6px_rgba(56,229,255,0.7)] transition-shadow"
              >
                Our Services <ArrowRight size={16} />
              </a>
              <a
                href="#projects"
                className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/20 text-white text-sm uppercase tracking-wider px-7 py-4 hover:border-cyan hover:text-cyan-bright transition-all"
              >
                <Play size={14} /> View Projects
              </a>
            </div>
          </div>

          {/* Right dashboard */}
          <DashboardPanels />
        </div>

        {/* capability chips row */}
        <div className="glass rounded-2xl mt-10 px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 max-w-3xl">
          {chips.map((c) => (
            <div key={c} className="hero-chip flex flex-col items-center gap-2 text-center">
              <span className="w-9 h-9 rounded-lg border border-cyan/25 bg-cyan/5 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-bright animate-neon" />
              </span>
              <span className="text-[10px] tracking-widest text-white/60 uppercase">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
