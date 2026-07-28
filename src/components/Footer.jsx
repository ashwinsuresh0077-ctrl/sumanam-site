import { ArrowRight } from 'lucide-react'

const socialPaths = {
  LinkedIn:
    'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.33a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 18v-4.57c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.13h-2.67V18h2.67v-4.62c0-1.22.23-2.4 1.74-2.4 1.49 0 1.51 1.39 1.51 2.48V18h2.66z',
  Instagram:
    'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.678 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.8c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.467.181-.8.398-1.15.748-.35.35-.567.683-.748 1.15-.137.353-.3.882-.344 1.857C3.81 9.014 3.8 9.33 3.8 12s.01 2.986.058 4.04c.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.683.566 1.15.747.353.137.882.3 1.857.345 1.055.048 1.37.058 4.041.058s2.986-.01 4.04-.058c.976-.045 1.505-.208 1.858-.345.466-.181.8-.397 1.15-.747.35-.35.566-.684.747-1.15.137-.353.3-.882.345-1.857.048-1.055.058-1.37.058-4.041s-.01-2.986-.058-4.04c-.045-.976-.208-1.505-.345-1.858a3.1 3.1 0 0 0-.747-1.15 3.1 3.1 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344C14.986 3.81 14.67 3.8 12 3.8zm0 3.065a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.8a3.335 3.335 0 1 0 0 6.67 3.335 3.335 0 0 0 0-6.67zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z',
  Facebook:
    'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.991 22 12z',
  YouTube:
    'M23.5 6.507a2.99 2.99 0 0 0-2.104-2.117C19.545 3.887 12 3.887 12 3.887s-7.545 0-9.396.503A2.99 2.99 0 0 0 .5 6.507C0 8.37 0 12.26 0 12.26s0 3.89.5 5.753a2.99 2.99 0 0 0 2.104 2.117c1.851.503 9.396.503 9.396.503s7.545 0 9.396-.503a2.99 2.99 0 0 0 2.104-2.117c.5-1.863.5-5.753.5-5.753s0-3.89-.5-5.753zM9.6 15.812V8.708l6.3 3.552-6.3 3.552z',
}

const columns = [
  {
    title: 'Quick Links',
    items: ['Home', 'Services', 'About Us', 'Projects', 'Technology', 'Insights', 'Careers', 'Contact'],
  },
  {
    title: 'Our Services',
    items: [
      'MEP Design',
      'BIM Modeling',
      'BIM Coordination',
      'PMS Services',
      'Quantity & Estimation',
      'Facility Management Support',
    ],
  },
  {
    title: 'Industries',
    items: [
      'Commercial',
      'Residential',
      'Healthcare',
      'Industrial',
      'Hospitality',
      'Infrastructure',
      'Education',
      'Airports',
    ],
  },
]

const socials = Object.entries(socialPaths)

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 shrink-0">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <defs>
            <linearGradient id="fLogo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#38e5ff" />
              <stop offset="1" stopColor="#2f7dff" />
            </linearGradient>
          </defs>
          <path d="M8 30 V14 L20 7 L32 14 V30" fill="none" stroke="url(#fLogo)" strokeWidth="2.4" />
          <path d="M14 30 V19 L20 15.5 L26 19 V30" fill="none" stroke="#38e5ff" strokeWidth="1.6" opacity="0.7" />
          <rect x="8" y="30" width="24" height="2.4" fill="url(#fLogo)" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold tracking-[0.18em] text-white font-display">
          MEP BIM PMS
        </span>
        <span className="block text-[9px] tracking-[0.3em] text-cyan/70 mt-0.5">CONSULTANCY</span>
      </span>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#040914] border-t border-cyan/10 px-6 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-5 gap-10">
        {/* brand */}
        <div className="col-span-2 lg:col-span-1">
          <FooterLogo />
          <p className="text-white/45 text-sm leading-relaxed mt-5 max-w-xs">
            Delivering innovative MEP, BIM and PMS solutions for a smarter and sustainable built
            environment.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {socials.map(([name, d]) => (
              <a
                key={name}
                href="#"
                className="w-9 h-9 rounded-lg border border-cyan/20 flex items-center justify-center text-white/50 hover:text-cyan-bright hover:border-cyan transition-all"
                aria-label={name}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-white/45 text-sm hover:text-cyan-bright transition-colors">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
          <ul className="space-y-2.5 text-white/45 text-sm">
            <li>+91 98765 43210</li>
            <li>info@mepbimpms.com</li>
            <li>Bangalore, India</li>
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-cyan/40 text-cyan-bright text-[11px] uppercase tracking-widest px-4 py-2.5 mt-5 hover:bg-cyan/10 transition-all"
          >
            Get Directions <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/30 text-xs">
          &copy; {year} MEP BIM PMS Consultancy Services. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6 text-white/30 text-xs">
          <a href="#" className="hover:text-cyan-bright transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-cyan-bright transition-colors">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}
