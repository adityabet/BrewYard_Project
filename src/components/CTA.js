'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { PhoneIcon, MapPinIcon, ArrowRightIcon } from './Icons'

export default function CTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])

  return (
    <section ref={ref} className="relative overflow-hidden h-screen-safe min-h-[540px] max-h-[900px]">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image src="/assets/cafe1.jpg" alt="The Brewyard" fill
          className="object-cover" quality={90} sizes="100vw" priority />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(28,10,4,0.55) 0%, rgba(28,10,4,0.8) 60%, rgba(28,10,4,0.92) 100%)' }}
        />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[9px] tracking-[0.6em] uppercase mb-4" style={{ color: 'rgba(245,236,215,0.5)' }}>
          Bibwewadi · Pune
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="font-display font-light mb-5 max-w-lg"
          style={{ fontSize: 'clamp(2.2rem, 9vw, 5rem)', color: '#F5ECD7', lineHeight: 1.08 }}>
          Your next great <em style={{ color: '#DFB245' }}>cup</em> awaits.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="font-accent max-w-xs sm:max-w-sm mb-8 leading-relaxed"
          style={{ color: 'rgba(245,236,215,0.62)', fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)' }}>
          Open daily 8:30 AM – 11:00 PM. Walk in or call ahead — we're always ready.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.32 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <a href="tel:+917820893140"
            className="flex items-center justify-center gap-2.5 px-7 py-4 text-xs tracking-[0.28em] uppercase font-medium
              transition-all duration-300 min-h-[52px]"
            style={{ background: '#B85C38', color: '#FAF6F0' }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4734A'}
            onMouseLeave={e => e.currentTarget.style.background = '#B85C38'}>
            <PhoneIcon size={15} color="#FAF6F0" /> Call Now
          </a>
          <a href="https://www.google.com/maps/place/The+Brewyard+Speciality+Coffee/@18.4751611,73.8618864,16z/data=!3m1!4b1!4m6!3m5!1s0x3bc2eb2f7a228a93:0x7ddc7a54f15b739b!8m2!3d18.4751611!4d73.8618864!16s%2Fg%2F11x1w5gsfy!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-7 py-4 text-xs tracking-[0.28em] uppercase
              transition-all duration-300 min-h-[52px]"
            style={{ border: '1px solid rgba(245,236,215,0.28)', color: 'rgba(245,236,215,0.7)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,236,215,0.7)'; e.currentTarget.style.color = '#F5ECD7' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,236,215,0.28)'; e.currentTarget.style.color = 'rgba(245,236,215,0.7)' }}>
            <MapPinIcon size={15} color="currentColor" /> Directions <ArrowRightIcon size={13} />
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-10 flex items-center gap-1.5 text-[10px] tracking-widest uppercase"
          style={{ color: 'rgba(245,236,215,0.32)' }}>
          <MapPinIcon size={10} color="rgba(245,236,215,0.32)" /> Soba Savera Complex, Bibwewadi
        </motion.div>
      </div>
    </section>
  )
}
