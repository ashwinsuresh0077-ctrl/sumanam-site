import { motion } from 'framer-motion'
import { asset } from '../lib/asset.js'

// Client logos live in public/clients/. `name` is the accessible label only:
// the wall shows marks, never printed brand names.
//
// Every entry is a client that appears in data/work.js — the wall is a claim
// about real engagements, so nothing goes here that the project record cannot
// back up. Order alternates corporate / public-sector so the marquee reads
// varied rather than clustered.
const clients = [
  { name: 'Adani', file: 'adani.png' },
  { name: 'Indian Space Research Organisation', file: 'isro.png' },
  { name: 'Taj', file: 'taj.png' },
  { name: 'Larsen & Toubro', file: 'lt.png' },
  { name: 'Apollo Hospitals', file: 'apollo-hospitals.png' },
  { name: 'IndianOil', file: 'indian-oil.png' },
  { name: 'Mahindra', file: 'mahindra.png' },
  { name: 'Canara Bank', file: 'canara-bank.png' },
  { name: 'TVS', file: 'tvs.png' },
  { name: 'MRF', file: 'mrf.png' },
  { name: 'Singapore Airlines', file: 'singapore-airlines.png' },
  { name: 'Punjab National Bank', file: 'pnb.png' },
  { name: 'Technopark', file: 'technopark.png' },
  { name: 'Federal Bank', file: 'federal-bank.png' },
  { name: 'Tata Elxsi', file: 'tata-elxsi.png' },
  { name: 'Tata Consultancy Services', file: 'tcs.png' },
  { name: 'Kerala IT Mission', file: 'kerala-it-mission.png' },
  { name: 'KSEB', file: 'kseb.png' },
  { name: 'Chettinad Builders', file: 'chettinad-builders.png' },
]

export default function Clients() {
  // Duplicate the list so the marquee track loops seamlessly.
  const track = [...clients, ...clients]

  return (
    <section id="clients" className="relative py-24 bg-bg-alt border-y border-ink/5 overflow-hidden">
      <style>{`
        @keyframes sumanam-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: sumanam-marquee 48s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* The supplied marks are dark artwork on opaque white, so on a
           near-black ground they read as bright plates — the loudest thing
           on a page whose hero spends no colour at all. Resting them back
           lets them sit in the composition; hover restores them fully. */
        /* Some source PNGs carry a circular alpha mask and some are fully
           opaque squares, so the wall rendered as a mix of circles and
           squares. Clipping every mark to a circle makes the set consistent
           regardless of how each file was cut. */
        .client-mark {
          border-radius: 50%;
          opacity: 0.55;
          transition: opacity 0.3s ease;
        }
        .client-mark:hover { opacity: 1; }
        [data-theme='light'] .client-mark { opacity: 0.8; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; }
        }
      `}</style>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow text-sm mb-12 text-center px-6"
      >
        Trusted By Industry Leaders
      </motion.p>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 z-10 bg-gradient-to-r from-bg-alt to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 z-10 bg-gradient-to-l from-bg-alt to-transparent" />

        <div className="marquee-track">
          {track.map((c, i) => (
            <div
              key={`${c.file}-${i}`}
              className="shrink-0 px-6 md:px-8 flex items-center justify-center"
              // The duplicated half is decorative; keep it off the a11y tree.
              aria-hidden={i >= clients.length || undefined}
            >
              <img
                src={asset(`/clients/${c.file}`)}
                alt={i >= clients.length ? '' : c.name}
                loading="lazy"
                width="112"
                height="112"
                className="client-mark w-20 h-20 md:w-28 md:h-28 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
