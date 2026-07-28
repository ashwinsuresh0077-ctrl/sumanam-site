import { motion } from 'framer-motion'
import { Layers, Wind, Zap, Droplets, Flame } from 'lucide-react'

const panel = {
  hidden: { opacity: 0, x: 40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: 0.4 + i * 0.15, ease: 'easeOut' },
  }),
}

/* Small isometric BIM wireframe drawn in SVG */
function BimWire() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-24">
      <g stroke="#38e5ff" strokeWidth="1" fill="none" opacity="0.85">
        <path d="M40 30 L100 12 L160 30 L100 48 Z" />
        <path d="M40 30 L40 90 L100 108 L100 48" />
        <path d="M160 30 L160 90 L100 108" />
        <path d="M40 60 L100 78 L160 60" opacity="0.5" />
        <path d="M70 21 L70 99" opacity="0.4" />
        <path d="M130 21 L130 99" opacity="0.4" />
        <path d="M100 12 L100 48" opacity="0.4" />
      </g>
      <g fill="#38e5ff">
        <circle cx="40" cy="30" r="1.8" />
        <circle cx="160" cy="30" r="1.8" />
        <circle cx="100" cy="12" r="1.8" />
        <circle cx="100" cy="108" r="1.8" />
      </g>
    </svg>
  )
}

const mepRows = [
  { icon: Wind, label: 'HVAC', color: '#38e5ff' },
  { icon: Zap, label: 'ELECTRICAL', color: '#ffc857' },
  { icon: Droplets, label: 'PLUMBING', color: '#4d9fff' },
  { icon: Flame, label: 'FIRE PROTECTION', color: '#ff5d5d' },
]

const timelineBars = [28, 34, 30, 42, 46, 52, 60, 66, 78, 96, 70]
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV']

export default function DashboardPanels() {
  return (
    <div className="hidden xl:flex flex-col gap-4 w-[340px]">
      {/* BIM MODEL */}
      <motion.div variants={panel} custom={0} initial="hidden" animate="show" className="glass rounded-2xl p-5">
        <p className="text-[11px] tracking-[0.25em] text-cyan-bright/90 mb-2">BIM MODEL</p>
        <BimWire />
        <div className="mt-3 flex items-center gap-2">
          {[Layers, Layers, Layers, Layers, Layers].map((Icon, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-lg border border-cyan/20 bg-white/[0.03] flex items-center justify-center"
            >
              <Icon size={14} className="text-cyan/70" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* MEP SYSTEMS */}
      <motion.div variants={panel} custom={1} initial="hidden" animate="show" className="glass rounded-2xl p-5">
        <p className="text-[11px] tracking-[0.25em] text-cyan-bright/90 mb-3">MEP SYSTEMS</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          {mepRows.map((r) => {
            const Icon = r.icon
            return (
              <div key={r.label} className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `${r.color}1f` }}
                >
                  <Icon size={12} style={{ color: r.color }} />
                </span>
                <span className="text-[10px] tracking-wider text-white/70">{r.label}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* PROJECT TIMELINE */}
      <motion.div variants={panel} custom={2} initial="hidden" animate="show" className="glass rounded-2xl p-5">
        <div className="flex items-end justify-between">
          <p className="text-[11px] tracking-[0.25em] text-cyan-bright/90">PROJECT TIMELINE</p>
          <span className="text-[9px] text-cyan/70 tracking-wider">WE ARE HERE</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-semibold text-white font-display">68%</span>
          <span className="text-[10px] text-white/40 tracking-widest">COMPLETE</span>
        </div>
        <div className="flex items-end gap-[5px] h-16 mt-3">
          {timelineBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === 9
                    ? 'linear-gradient(180deg,#38e5ff,#2f7dff)'
                    : 'linear-gradient(180deg,#2f7dff99,#1656d655)',
              }}
            />
          ))}
        </div>
        <div className="flex gap-[5px] mt-1">
          {months.map((m) => (
            <span key={m} className="flex-1 text-[6px] text-white/30 text-center">
              {m}
            </span>
          ))}
        </div>
      </motion.div>

      {/* COST MANAGEMENT */}
      <motion.div variants={panel} custom={3} initial="hidden" animate="show" className="glass rounded-2xl p-5">
        <p className="text-[11px] tracking-[0.25em] text-cyan-bright/90 mb-3">COST MANAGEMENT</p>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#16233c" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="url(#costGrad)"
                strokeWidth="4"
                strokeDasharray="72 100"
                strokeLinecap="round"
                pathLength="100"
              />
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#38e5ff" />
                  <stop offset="1" stopColor="#2f7dff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-semibold text-white leading-none">72%</span>
              <span className="text-[7px] text-emerald-400 tracking-widest mt-0.5">ON TRACK</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { c: '#2f7dff', l: 'LABOR' },
              { c: '#ff7ab0', l: 'MATERIAL' },
              { c: '#7CFC00', l: 'EQUIPMENT' },
              { c: '#38e5ff', l: 'OTHER' },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: x.c }} />
                <span className="text-[10px] tracking-wider text-white/60">{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
