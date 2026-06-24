'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDownIcon } from './Icons'

function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// Fewer beans on mobile — rendered via CSS, counts fixed server-side
const BEANS = Array.from({ length: 12 }, (_, i) => ({
  id:       i,
  size:     Math.round((8 + seededRand(i * 3) * 12) * 10) / 10,
  left:     Math.round(seededRand(i * 3 + 1) * 100 * 10) / 10,
  delay:    Math.round(seededRand(i * 3 + 2) * 8 * 10) / 10,
  duration: Math.round((10 + seededRand(i * 3 + 3) * 12) * 10) / 10,
}))

export default function Hero() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return               // disable parallax on mobile
    const onScroll = () => {
      if (!parallaxRef.current) return
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative w-full h-screen-safe overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100svh', paddingBottom: '8vh' }}>

      {/* Parallax background */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <Image
          src="/assets/cafe1.jpg"
          alt="The Brewyard Coffee"
          fill priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(232,217,196,0.6) 0%, rgba(28,10,4,0.6) 55%, rgba(28,10,4,0.9) 100%)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(28,10,4,0.95) 100%)' }}
        />
      </div>

      {/* Lens glow — desktop only */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[12%] right-[18%] w-48 md:w-72 h-48 md:h-72 rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(196,146,42,0.22) 0%, transparent 70%)', filter: 'blur(20px)' }}
      />

      {/* Floating beans — hidden on small mobile */}
      <div className="hidden sm:block">
        {BEANS.map((b) => (
          <div key={b.id} className="bean-particle pointer-events-none"
            style={{ width: b.size, height: b.size * 0.65, left: `${b.left}%`,
              animationDelay: `${b.delay}s`, animationDuration: `${b.duration}s` }}
          />
        ))}
      </div>

      {/* Steam — positioned for mobile */}
      <div className="absolute bottom-[30%] left-[28%] sm:left-[30%] flex gap-4 sm:gap-6">
        {[50, 70, 40].map((h, i) => (
          <div key={i} className="steam-wsp" style={{ height: h, animationDelay: `${i * 0.8}s` }} />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto w-full">

        {/* Headline */}
        <div className="overflow-hidden mb-4 sm:mb-6">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-light leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 12vw, 7.5rem)', color: '#F5ECD7' }}
          >
            Every Cup
            <br />
            <span className="gradient-text italic">Has A Story</span>
          </motion.h1>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="font-accent leading-relaxed mb-8 sm:mb-12"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', color: 'rgba(245,236,215,0.68)' }}
        >
          Crafted with Passion.&nbsp; Brewed with Precision.&nbsp; Served with Soul.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center"
        >
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300 min-h-[48px]"
            style={{ background: '#B85C38', color: '#FAF6F0' }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4734A'}
            onMouseLeave={e => e.currentTarget.style.background = '#B85C38'}
          >
            Explore Menu
          </button>
          <a
            href="tel:+917820893140"
            className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.25em] uppercase text-center transition-all duration-300 min-h-[48px] flex items-center justify-center"
            style={{ border: '1px solid rgba(245,236,215,0.32)', color: 'rgba(245,236,215,0.82)' }}
          >
            Reserve A Table
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] tracking-[0.45em] uppercase" style={{ color: 'rgba(245,236,215,0.38)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDownIcon size={18} color="rgba(196,146,42,0.6)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
