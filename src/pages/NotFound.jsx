import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSeo } from '../lib/seo'

// Catch-all for any URL the router doesn't recognise. Without this, an
// unmatched path rendered an empty <Routes> — a blank white page with no
// header, no footer and no way back, which is what a visitor got from any
// stale link or typo.
//
// Layout mirrors the "not found" state already used by the detail pages so a
// missing service, project and route all fail the same way.
export default function NotFound() {
  useSeo({
    title: 'Page not found | Sumanam Engineering Services',
    description: 'The page you were looking for does not exist.',
    path: '/404',
    // Nothing here should ever land in search results.
    noindex: true,
  })

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-32 text-center">
        <p className="eyebrow" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}>
          Error 404
        </p>
        <h1
          className="font-black uppercase leading-none tracking-tight text-ink"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}
        >
          Page not found
        </h1>
        <p className="max-w-md font-light leading-relaxed text-ink/65">
          The page you were looking for has moved or never existed. The work, services and
          contact details are all still here.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold text-[#060d18] font-semibold px-6 py-3 rounded-full hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={18} /> Back to home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 font-medium text-ink transition-colors hover:bg-ink/10"
            style={{ borderColor: 'color-mix(in srgb, var(--color-ink) 30%, transparent)' }}
          >
            View projects
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
