import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Clients', href: '#clients' },
  { name: 'Contact', href: '#contact' },
]

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
        scrolled ? 'bg-[#060d18]/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-9 h-9 border border-gold rotate-45 flex items-center justify-center">
            <div className="w-4 h-4 bg-gold -rotate-45" />
          </div>
          <span className="text-xl font-semibold tracking-[0.2em] text-white">SUMANAM</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-gold transition-colors"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block border border-gold text-gold text-sm uppercase tracking-widest px-5 py-2.5 hover:bg-gold hover:text-[#060d18] transition-all duration-300"
        >
          Get a Quote
        </a>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#060d18] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest text-white/80"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="border border-gold text-gold text-sm uppercase tracking-widest px-5 py-2.5 text-center"
          >
            Get a Quote
          </a>
        </div>
      )}
    </header>
  )
}
