'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HeartIcon, StarIcon, ClockIcon, BeanIcon } from './Icons'

const STATS = [
  { value: 366,  suffix: '+',  label: 'Happy Coffee Lovers', sub: 'And counting every day',    Icon: HeartIcon,  decimal: false },
  { value: 4.8,  suffix: '',   label: 'Google Rating',        sub: 'Consistently top-rated',   Icon: StarIcon,   decimal: true  },
  { value: null, display: '8:30–11PM', label: 'Open Daily',  sub: 'Seven days a week',         Icon: ClockIcon               },
  { value: null, display: 'Premium',  label: 'Specialty',     sub: 'Single-origin · Artisan',  Icon: BeanIcon                },
]

function CountUp({ value, suffix, decimal, inView }) {
  const [count, setCount] = useState(0)
  const start = useRef(null)
  useEffect(() => {
    if (!inView) return
    const dur = 2000
    const step = (ts) => {
      if (!start.current) start.current = ts
      const eased = 1 - Math.pow(1 - Math.min((ts - start.current) / dur, 1), 3)
      setCount(decimal ? +(eased * value).toFixed(1) : Math.round(eased * value))
      if (eased < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, decimal])
  return <span>{decimal ? count.toFixed(1) : count}{suffix}</span>
}

export default function Stats() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="relative py-20 md:py-36 overflow-hidden bg-linen-dark">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(184,92,56,0.06) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-terra">
            By The Numbers
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="font-display font-light text-ink mt-3"
            style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
            Why Choose <span className="gradient-text italic">Brewyard</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '1px', background: 'rgba(184,92,56,0.1)' }}>
          {STATS.map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="flex flex-col items-center text-center gap-3 p-6 md:p-10 transition-colors duration-300"
              style={{ background: '#FAF6F0' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F2E8D8'}
              onMouseLeave={e => e.currentTarget.style.background = '#FAF6F0'}
            >
              <motion.div
                animate={inView ? { scale: [0.5, 1.2, 1] } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.12 }}
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ background: 'rgba(184,92,56,0.1)' }}
              >
                <stat.Icon size={18} color="#B85C38" />
              </motion.div>

              <div className="font-display font-light leading-none" style={{ color: '#B85C38', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)' }}>
                {stat.value != null
                  ? <CountUp value={stat.value} suffix={stat.suffix} decimal={stat.decimal} inView={inView} />
                  : <span style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)' }}>{stat.display}</span>
                }
              </div>

              <div className="text-ink text-xs sm:text-sm font-medium tracking-wide">{stat.label}</div>
              <div className="text-ink-faint text-[10px] sm:text-xs tracking-wider">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Certs */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-5 md:gap-14">
          {['Specialty Grade','Expert Baristas','Artisan Recipes','Freshly Roasted'].map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-ink-faint">
              <span className="text-terra text-sm">✦</span>{c}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
