import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'

const links = [
  { name: 'Home', href: '/#home' },
  { name: 'Services', href: '/#services' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
]

// Resolve the initial theme: saved choice → system preference → dark.
function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Apply the theme to <html> and persist it.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-50 px-4 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between gap-4 rounded-full border border-ink/10 pl-5 pr-3 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-alt/90 backdrop-blur-xl py-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            : 'bg-bg-alt/60 backdrop-blur-xl py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]'
        }`}
      >
        <Link to="/#home" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-gold -rotate-45" />
          </div>
          <span className="text-lg font-semibold tracking-[0.2em] text-ink">SUMANAM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.name}
              to={l.href}
              className="text-sm tracking-wide text-ink/70 hover:text-ink px-4 py-2 rounded-full hover:bg-ink/5 transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 flex items-center justify-center rounded-full border border-ink/10 text-ink/70 hover:text-gold hover:border-gold/40 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          <Link
            to="/#contact"
            className="hidden md:inline-flex items-center bg-gold text-[#060d18] text-sm font-semibold tracking-wide px-5 py-2.5 rounded-full hover:bg-gold-light transition-colors"
          >
            Get a Quote
          </Link>

          <button
            className="md:hidden text-ink w-11 h-11 flex items-center justify-center rounded-full hover:bg-ink/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden pointer-events-auto absolute top-full mt-3 left-4 right-4 bg-bg-alt/95 backdrop-blur-xl border border-ink/10 rounded-2xl px-6 py-6 flex flex-col gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {links.map((l) => (
            <Link
              key={l.name}
              to={l.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-wide text-ink/80 hover:text-gold-ink transition-colors py-2.5"
            >
              {l.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={() => setOpen(false)}
            className="bg-gold text-[#060d18] text-sm font-semibold tracking-wide px-5 py-3 rounded-full text-center hover:bg-gold-light transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}
