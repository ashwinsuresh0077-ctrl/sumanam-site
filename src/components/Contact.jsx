import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { asset } from '../lib/asset.js'

// The four offices as a checkerboard of photo + address panels — the same
// pinwheel the production site uses: photos on the left in the top row and on
// the right in the bottom row, light and dark cells alternating. Each photo is
// an office interior/exterior with the location pin and coordinates overlaid.
const OFFICES = [
  {
    city: 'TRIVANDRUM',
    photo: '/office/building.webp',
    coords: '8.52°N  76.94°E',
    phone: '+91 9745180055',
    tel: '+919745180055',
    address: ['Aditya Apartment, SH 2, Kowdiar,', 'Thiruvananthapuram, Kerala 695003'],
    photoSide: 'left',
    variant: 'light',
  },
  {
    city: 'COCHIN',
    photo: '/office/reception.webp',
    coords: '9.93°N  76.27°E',
    phone: '+91 97 45 92 0555',
    tel: '+919745920555',
    address: ['1-A,', 'Bluemoon Pearl-II, Ambelipadam', 'Road, Vyttila,', 'Cochin 682 019,', 'India'],
    photoSide: 'left',
    variant: 'dark',
  },
  {
    city: 'BANGALORE',
    photo: '/office/open-office.webp',
    coords: '12.97°N  77.59°E',
    phone: '+91 9846020055',
    tel: '+919846020055',
    address: ['1st Floor, Commercial Point, # 23,', 'Dispensary Road, Parallel to Commercial', 'Street, Bangalore 560 001, India'],
    photoSide: 'right',
    variant: 'dark',
  },
  {
    city: 'CHENNAI',
    photo: '/office/boardroom.webp',
    coords: '13.08°N  80.27°E',
    phone: '+91 98 84 520055',
    tel: '+919884520055',
    address: ['No.256, Second Floor, Continental', 'Plaza, Anna Salai, Thousand Light, Chennai', '600 006, India'],
    photoSide: 'right',
    variant: 'light',
  },
]

// A real office photograph with a dark scrim, so the location pin, coordinates
// and city name stay legible on top of the image.
function CityTile({ photo, name, coords }) {
  return (
    <div className="absolute inset-0 bg-[#0b0d12]">
      <img
        src={asset(photo)}
        alt={`${name} office`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* scrim: darker toward the bottom where the labels sit */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,9,16,0.25) 0%, rgba(6,9,16,0.42) 55%, rgba(6,9,16,0.72) 100%)',
        }}
        aria-hidden="true"
      />
      {/* pin + coordinates */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-24 w-24 rounded-full border border-white/25" />
          <MapPin size={44} strokeWidth={1.25} className="relative text-white drop-shadow-lg" />
        </div>
        <span className="text-[11px] font-medium tracking-[0.3em] text-white/80 drop-shadow">{coords}</span>
        <span className="text-xs font-semibold tracking-[0.35em] text-white/60 drop-shadow">{name}</span>
      </div>
    </div>
  )
}

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3 0-1.3-.1-2.45-.1-2.42 0-4.05 1.47-4.05 4.18v2.21H7.7V14h2.8v8h3z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M17.2 3h2.9l-6.35 7.26L21.5 21h-5.86l-4.6-6-5.25 6H2.9l6.8-7.77L2.6 3h6l4.15 5.49L17.2 3Zm-1.02 16.2h1.6L7.9 4.72H6.18l10 14.48Z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M6.94 8.5H4.07V20H6.94V8.5ZM5.5 4a1.67 1.67 0 1 0 0 3.34A1.67 1.67 0 0 0 5.5 4ZM20 13.37c0-2.9-1.55-4.25-3.62-4.25-1.67 0-2.42.92-2.84 1.56V8.5H10.7V20h2.84v-6.09c0-.32.02-.64.12-.87.26-.64.84-1.3 1.82-1.3 1.29 0 1.8 1 1.8 2.44V20H20v-6.63Z',
  },
]

function Social({ variant }) {
  const base =
    variant === 'dark'
      ? 'text-white/70 hover:text-white'
      : 'text-slate-600 hover:text-slate-900'
  return (
    <div className="flex items-center gap-4">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className={`transition-colors ${base}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}

function Office({ office }) {
  const photoLeft = office.photoSide === 'left'
  const dark = office.variant === 'dark'

  const panelBg = dark ? 'bg-[#0b0d12]' : 'bg-white'
  const cityClr = dark ? 'text-white' : 'text-[#0b1b34]'
  const phoneClr = dark ? 'text-white' : 'text-[#0b1b34]'
  const addrClr = dark ? 'text-white/55' : 'text-slate-500'
  // On desktop the top row reads left→right, the bottom row right→left.
  const align = photoLeft ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'

  const photo = (
    <div
      className={`relative h-56 w-full overflow-hidden order-1 sm:h-64 lg:h-auto lg:w-1/2 ${
        photoLeft ? 'lg:order-1' : 'lg:order-2'
      }`}
    >
      <CityTile photo={office.photo} name={office.city} coords={office.coords} />
    </div>
  )

  const text = (
    <div
      className={`relative flex w-full flex-col items-start gap-5 px-8 py-12 order-2 sm:px-12 lg:w-1/2 lg:justify-center ${
        photoLeft ? 'lg:order-2' : 'lg:order-1'
      } ${panelBg} ${align}`}
    >
      {/* A solid notch the colour of the panel, poking into the photo at the
          seam — the pinwheel accent from the production layout. */}
      <span
        className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block ${
          photoLeft ? '-left-[18px]' : '-right-[18px]'
        }`}
        style={{
          width: 0,
          height: 0,
          borderTop: '22px solid transparent',
          borderBottom: '22px solid transparent',
          ...(photoLeft
            ? { borderRight: `18px solid ${dark ? '#0b0d12' : '#ffffff'}` }
            : { borderLeft: `18px solid ${dark ? '#0b0d12' : '#ffffff'}` }),
        }}
        aria-hidden="true"
      />

      <h3 className={`text-2xl font-bold tracking-wide sm:text-3xl ${cityClr}`}>{office.city}</h3>
      <a href={`tel:${office.tel}`} className={`text-lg ${phoneClr} hover:underline`}>
        {office.phone}
      </a>
      <address className={`not-italic text-base leading-relaxed ${addrClr}`}>
        {office.address.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <Social variant={office.variant} />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row"
    >
      {photo}
      {text}
    </motion.div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="relative bg-bg">
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-14 text-center">
        <p className="eyebrow text-sm mb-3">Contact Us</p>
        <h2 className="text-3xl font-semibold text-ink md:text-5xl">Reach us across India</h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/60">
          Four offices, one team. Call the location nearest you, or write to us at{' '}
          <a href="mailto:info@sumanam.co.in" className="text-ink underline">
            info@sumanam.co.in
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {OFFICES.map((o, i) => (
          <Office key={o.city} office={{ ...o, index: i }} />
        ))}
        <Invite />
      </div>
    </section>
  )
}

// A fifth cell spanning the full width: an office photo with a glowing location
// pin beside a short call to action with the company's real general contact
// details. No fabricated office address.
function Invite() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:col-span-2 lg:flex-row"
    >
      {/* Photo side */}
      <div className="relative order-1 h-56 w-full overflow-hidden bg-[#0b0d12] sm:h-64 lg:h-auto lg:min-h-[320px] lg:w-1/2">
        <img
          src={asset('/office/lounge.webp')}
          alt="Sumanam workspace"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,9,16,0.25) 0%, rgba(6,9,16,0.42) 55%, rgba(6,9,16,0.72) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-40 w-40 rounded-full border border-white/15" />
            <span className="absolute h-28 w-28 rounded-full border border-white/25" />
            <MapPin size={60} strokeWidth={1.25} className="relative text-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Text side */}
      <div className="relative order-2 flex w-full flex-col items-start gap-5 bg-[#0b0d12] px-8 py-12 sm:px-12 lg:w-1/2 lg:justify-center">
        <span
          className="pointer-events-none absolute top-1/2 hidden -translate-y-1/2 -left-[18px] lg:block"
          style={{
            width: 0,
            height: 0,
            borderTop: '22px solid transparent',
            borderBottom: '22px solid transparent',
            borderRight: '18px solid #0b0d12',
          }}
          aria-hidden="true"
        />
        <p className="eyebrow text-xs text-white/60">New enquiries</p>
        <h3 className="text-2xl font-bold tracking-wide text-white sm:text-3xl">LET&apos;S BUILD</h3>
        <p className="max-w-sm leading-relaxed text-white/55">
          Wherever your project sits across Kerala, Tamil Nadu and Karnataka, our
          team can take it from design to handover. Tell us what you&apos;re planning.
        </p>
        <a href="mailto:info@sumanam.co.in" className="text-lg text-white hover:underline">
          info@sumanam.co.in
        </a>
        <a href="tel:+919846150055" className="text-lg text-white hover:underline">
          +91 98461 50055
        </a>
        <Social variant="dark" />
      </div>
    </motion.div>
  )
}
