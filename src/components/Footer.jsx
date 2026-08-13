import { Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

const socials = [
  {
    name: 'Facebook',
    path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.991 22 12z',
  },
  {
    name: 'Instagram',
    path: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.249.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.216 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.249-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.216-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.249-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.216-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.012 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.058-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.747 1.15-.137.352-.3.881-.345 1.857-.048 1.053-.058 1.37-.058 4.041 0 2.67.01 2.987.058 4.04.045.976.208 1.505.345 1.858.181.466.397.8.747 1.15.35.35.684.566 1.15.747.353.137.882.3 1.858.345 1.053.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.208 1.858-.345.466-.181.8-.397 1.15-.747.35-.35.566-.684.747-1.15.137-.353.3-.882.345-1.858.048-1.053.058-1.37.058-4.04 0-2.67-.01-2.988-.058-4.041-.045-.976-.208-1.505-.345-1.857a3.097 3.097 0 0 0-.747-1.15 3.097 3.097 0 0 0-1.15-.748c-.353-.137-.882-.3-1.858-.344-1.053-.048-1.37-.058-4.04-.058zM12 7.27a4.73 4.73 0 1 1 0 9.46 4.73 4.73 0 0 1 0-9.46zm0 1.802a2.928 2.928 0 1 0 0 5.856 2.928 2.928 0 0 0 0-5.856zm5.815-3.272a1.105 1.105 0 1 1 0 2.21 1.105 1.105 0 0 1 0-2.21z',
  },
  {
    name: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
]

const companyLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Clients', href: '/#clients' },
  { name: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-deep border-t border-ink/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/#home" className="flex items-center gap-2.5">
              <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-gold -rotate-45" />
              </div>
              <span className="text-ink font-semibold tracking-[0.2em]">SUMANAM</span>
            </Link>
            <p className="text-ink/65 text-sm leading-relaxed max-w-xs">
              Integrated MEP, BIM and project management consultancy delivering across
              Kerala and Tamil Nadu for over 30 years.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-11 h-11 rounded-lg border border-ink/10 flex items-center justify-center text-ink/65 hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-ink font-semibold mb-5 text-sm">Services</h3>
            <ul className="space-y-3 text-sm text-ink/65">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="hover:text-ink transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-ink font-semibold mb-5 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-ink/65">
              {companyLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.href} className="hover:text-ink transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-ink font-semibold mb-5 text-sm">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-ink/65">
              <li className="flex items-start gap-3">
                <MapPin className="text-ink/70 shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                <span>Aditya Apartment, Kowdiar, Thiruvananthapuram, Kerala 695003</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-ink/70 shrink-0 mt-0.5" size={16} strokeWidth={1.5} />
                <span>Thoraipakkam, Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-ink/70 shrink-0" size={16} strokeWidth={1.5} />
                <a href="tel:+919846150055" className="hover:text-ink transition-colors">+91 98461 50055</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-ink/70 shrink-0" size={16} strokeWidth={1.5} />
                <a href="mailto:info@sumanam.co.in" className="hover:text-ink transition-colors">info@sumanam.co.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink/65">
          <p>&copy; {new Date().getFullYear()} Sumanam Engineering Services (P) Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
