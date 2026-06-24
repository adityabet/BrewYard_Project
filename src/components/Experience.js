'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ClockIcon, MapPinIcon, BeanIcon, StarIcon } from './Icons'

const WORDS = 'The Brewyard is a destination for coffee lovers, creators, dreamers, and conversations. Every cup is crafted with specialty beans, expert brewing techniques, and an obsession for quality.'.split(' ')

const DETAILS = [
  { Icon: ClockIcon,  label: 'Open Daily',      value: '8:30 AM – 11:00 PM' },
  { Icon: MapPinIcon, label: 'Bibwewadi, Pune',  value: 'Near Chintamani Hospital' },
  { Icon: BeanIcon,   label: 'Specialty Grade',  value: 'Single Origin Beans' },
]

export default function Experience() {
  const ref    = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="experience" className="relative py-20 md:py-40 overflow-hidden bg-linen-dark">
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(196,146,42,0.12) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-24 items-center">

        {/* Image */}
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 24px 64px rgba(28,10,4,0.16)' }}
        >
          <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
            <Image src="/assets/cafe5.jpeg" alt="Brewyard barista" fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover" quality={85} />
          </motion.div>
          <div className="absolute inset-0" style={{ border: '1px solid rgba(184,92,56,0.15)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(242,232,216,0.9), transparent)' }}
          />
          {/* Floating rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 right-5 sm:bottom-8 sm:right-8 px-4 py-3 shadow-lg"
            style={{ background: 'rgba(250,246,240,0.94)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(184,92,56,0.2)' }}
          >
            <div className="flex items-center gap-1.5">
              <StarIcon size={16} color="#C4922A" filled />
              <span className="font-display text-xl font-light" style={{ color: '#B85C38' }}>4.8</span>
            </div>
            <div className="text-[9px] tracking-widest uppercase mt-0.5" style={{ color: '#7A5A48' }}>Google Rating</div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div ref={ref} className="flex flex-col gap-6 sm:gap-8">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-terra"
          >
            Our Philosophy
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-light leading-tight text-ink"
              style={{ fontSize: 'clamp(2.4rem, 8vw, 4rem)' }}
            >
              More Than
              <br />
              <span className="gradient-text italic">Coffee</span>
            </motion.h2>
          </div>

          {/* Word-by-word */}
          <p className="font-accent leading-relaxed text-ink-muted" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
            aria-label={WORDS.join(' ')}>
            {WORDS.map((word, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.035 }}
                className="inline-block mr-1.5"
              >{word}</motion.span>
            ))}
          </p>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-4 pt-4"
            style={{ borderTop: '1px solid rgba(184,92,56,0.15)' }}
          >
            {DETAILS.map(({ Icon, label, value }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + i * 0.12 }}
                className="flex items-center gap-4"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(184,92,56,0.1)' }}>
                  <Icon size={16} color="#B85C38" />
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-terra">{label}</div>
                  <div className="text-sm mt-0.5 text-ink-soft">{value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
