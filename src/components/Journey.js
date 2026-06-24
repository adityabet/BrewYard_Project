'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BeanIcon, FlameIcon, FlaskIcon, DropIcon, CoffeeIcon } from './Icons'

const STEPS = [
  { num: '01', Icon: BeanIcon,   title: 'Select Premium Beans',  desc: 'We source specialty-grade single-origin beans from the finest estates across India and the world — hand-picked for flavor, aroma, and character.', accent: '#B85C38' },
  { num: '02', Icon: FlameIcon,  title: 'Expert Roasting',        desc: 'Each batch is roasted to a precise profile — light, medium, or dark — unlocking the full potential of the bean\'s terroir and flavor notes.',       accent: '#C4922A' },
  { num: '03', Icon: FlaskIcon,  title: 'Precision Brewing',      desc: 'From pour-over to aeropress, syphon to cold drip — our baristas wield each brewing method like a craft, dialing in every variable with care.',        accent: '#8B5E3C' },
  { num: '04', Icon: DropIcon,   title: 'Perfect Extraction',     desc: 'Water temperature, contact time, grind size — the alchemy of extraction is our art. Every shot pulled, every filter poured, is extraordinary.',         accent: '#A67C52' },
  { num: '05', Icon: CoffeeIcon, title: 'Serve Happiness',         desc: 'The moment the cup reaches your hands, the story is complete. Warm, beautiful, honest — a moment of joy in every sip.',                                 accent: '#B85C38' },
]

export default function Journey() {
  const [isMobile, setIsMobile] = useState(false)
  const trackRef     = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (isMobile) return
    let cleanup = () => {}
    import('gsap').then(({ gsap: g }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => {
        g.registerPlugin(ST)
        const track     = trackRef.current
        const container = containerRef.current
        if (!track || !container) return
        const totalWidth = track.scrollWidth - container.offsetWidth
        const tween = g.to(track, {
          x: -totalWidth, ease: 'none',
          scrollTrigger: {
            trigger: container, start: 'top top',
            end: `+=${totalWidth * 1.2}`, scrub: 1,
            pin: true, anticipatePin: 1,
          },
        })
        cleanup = () => ST.getAll().forEach(t => t.kill())
      })
    )
    return () => cleanup()
  }, [isMobile])

  const header = (
    <div className="text-center pb-10 px-5">
      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-[10px] tracking-[0.5em] uppercase text-terra">
        From Bean to Cup
      </motion.span>
      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9 }}
        className="font-display font-light text-ink mt-3"
        style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
        The <span className="gradient-text italic">Craft Journey</span>
      </motion.h2>
    </div>
  )

  /* ── Mobile: vertical stack ── */
  if (isMobile) {
    return (
      <section className="py-16 bg-parchment">
        <div className="pt-8 pb-0">{header}</div>
        <div className="flex flex-col gap-4 px-5">
          {STEPS.map((step, i) => <MobileCard key={i} step={step} i={i} />)}
        </div>
      </section>
    )
  }

  /* ── Desktop: horizontal GSAP scroll ── */
  return (
    <section className="relative bg-parchment">
      <div ref={containerRef} className="overflow-hidden">
        <div className="pt-20 pb-0">{header}</div>
        <div ref={trackRef} className="h-track pl-16 pr-8 pb-20 pt-4 gap-6">
          {STEPS.map((step, i) => <DesktopCard key={i} step={step} i={i} />)}
          <div className="w-20 flex-shrink-0" />
        </div>
      </div>
    </section>
  )
}

function MobileCard({ step, i }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      className="relative overflow-hidden p-6 flex gap-5 items-start"
      style={{ background: 'rgba(250,246,240,0.9)', border: '1px solid rgba(184,92,56,0.1)',
        boxShadow: '0 4px 20px rgba(28,10,4,0.06)' }}
    >
      {/* Step indicator */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: `${step.accent}18`, border: `1.5px solid ${step.accent}40` }}>
          <step.Icon size={18} color={step.accent} />
        </div>
        {i < 4 && (
          <div className="w-px flex-1 min-h-[32px]"
            style={{ background: `linear-gradient(to bottom, ${step.accent}30, transparent)` }} />
        )}
      </div>
      <div className="flex-1 pt-1">
        <div className="font-display text-3xl font-light leading-none mb-2"
          style={{ color: `${step.accent}18` }}>{step.num}</div>
        <h3 className="font-display text-lg font-light text-ink mb-2">{step.title}</h3>
        <p className="font-accent text-sm text-ink-muted leading-relaxed">{step.desc}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${step.accent}60, transparent)` }} />
    </motion.div>
  )
}

function DesktopCard({ step, i }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="flex-shrink-0 w-72 lg:w-80 p-8 flex flex-col gap-5 relative overflow-hidden group"
      style={{ background: 'rgba(250,246,240,0.88)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(184,92,56,0.12)', boxShadow: '0 8px 40px rgba(28,10,4,0.06)' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${step.accent}12 0%, transparent 70%)` }} />
      <div className="font-display text-6xl font-light leading-none" style={{ color: `${step.accent}20` }}>
        {step.num}
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: `${step.accent}15`, border: `1px solid ${step.accent}35` }}>
        <step.Icon size={20} color={step.accent} />
      </div>
      <h3 className="font-display text-xl font-light text-ink">{step.title}</h3>
      <p className="font-accent text-sm text-ink-muted leading-relaxed">{step.desc}</p>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }} />
    </motion.div>
  )
}
