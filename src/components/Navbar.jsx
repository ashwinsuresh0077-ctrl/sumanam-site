import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About Us', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Technology', href: '#technology' },
  { name: 'Insights', href: '#process' },
  { name: 'Careers', href: '#contact' },
  { name: 'Contact', href: '#contact' },
]

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3">
      <span className="relative w-9 h-9 shrink-0">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#38e5ff" />
              <stop offset="1" stopColor="#2f7dff" />
            </linearGradient>
          </defs>
          <path d="M8 30 V14 L20 7 L32 14 V30" fill="none" stroke="url(#logoGrad)" strokeWidth="2.4" />
          <path d="M14 30 V19 L20 15.5 L26 19 V30" fill="none" stroke="#38e5ff" strokeWidth="1.6" opacity="0.7" />
          <rect x="8" y="30" width="24" height="2.4" fill="url(#logoGrad)" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[0.18em] text-white font-display">
          MEP BIM PMS
        </span>
        <span className="block text-[9px] tracking-[0.32em] text-cyan/70 mt-0.5">
          CONSULTANCY SERVICES
        </span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-base/85 backdrop-blur-xl border-b border-cyan/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-[12px] uppercase tracking-[0.14em] text-white/65 hover:text-cyan-bright transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-2 rounded-full border border-cyan/40 text-cyan-bright text-[12px] uppercase tracking-[0.14em] px-5 py-2.5 hover:bg-cyan/10 hover:border-cyan transition-all"
        >
          Get in Touch <ArrowRight size={14} />
        </a>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-base/95 backdrop-blur-xl border-t border-cyan/10 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[13px] uppercase tracking-[0.14em] text-white/75"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full border border-cyan/40 text-cyan-bright text-[12px] uppercase tracking-[0.14em] px-5 py-3 text-center"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  )
}
