'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { StarIcon, ChatIcon } from './Icons'

const REVIEWS = [
  { name: 'Pratik S.',    rating: 5, text: 'Best specialty coffee in Pune. The pour-over was flawless and the ambience is just perfect.' },
  { name: 'Ankita M.',   rating: 5, text: 'Absolutely love this place! The Espresso Tonic is something I never knew I needed in my life.' },
  { name: 'Rohan D.',    rating: 5, text: 'Great selection of manual brews. Staff is knowledgeable and genuinely passionate about coffee.' },
  { name: 'Sneha K.',    rating: 5, text: 'The Hazelnut Cappuccino is divine. Cosy atmosphere, great music, and even better coffee.' },
  { name: 'Vikram P.',   rating: 5, text: 'Had the Cold Brew and a sandwich. Both were outstanding. Will definitely be coming back.' },
  { name: 'Megha R.',    rating: 5, text: 'Brewyard feels like a hidden gem. Every visit is a treat. The baristas really know their craft.' },
  { name: 'Arjun T.',    rating: 5, text: 'Vietnamese Salted Coffee is a must-try. Unique flavour, great vibe, lovely staff.' },
  { name: 'Priya N.',    rating: 5, text: 'The Syphon Brew was a whole experience. Loved watching the process — tasted incredible too!' },
]

function Stars({ n }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <StarIcon key={i} size={12} color="#DFB245" filled />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="relative flex-shrink-0 w-[80vw] max-w-[280px] sm:max-w-[320px] p-5 sm:p-6 mx-2"
      style={{ background: 'rgba(250,246,240,0.82)', border: '1px solid rgba(184,92,56,0.1)',
        boxShadow: '0 4px 18px rgba(28,10,4,0.06)' }}>
      <div className="mb-3">
        <ChatIcon size={18} color="rgba(184,92,56,0.25)" />
      </div>
      <div className="mb-3">
        <Stars n={review.rating} />
      </div>
      <p className="font-accent text-ink-soft text-sm leading-relaxed mb-4 line-clamp-4">
        "{review.text}"
      </p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium"
          style={{ background: 'rgba(184,92,56,0.1)', color: '#B85C38' }}>
          {review.name[0]}
        </div>
        <div>
          <div className="text-xs font-medium text-ink">{review.name}</div>
          <div className="text-[9px] tracking-widest uppercase text-ink-faint">Google Review</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const trackRef = useRef(null)
  const animRef  = useRef(null)
  const posRef   = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const half = track.scrollWidth / 2

    const tick = () => {
      posRef.current += 0.4
      if (posRef.current >= half) posRef.current = 0
      track.style.transform = `translateX(-${posRef.current}px)`
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)

    const pause  = () => cancelAnimationFrame(animRef.current)
    const resume = () => { animRef.current = requestAnimationFrame(tick) }
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', resume)
    track.addEventListener('touchstart', pause, { passive: true })
    track.addEventListener('touchend',   resume)

    return () => {
      cancelAnimationFrame(animRef.current)
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', resume)
      track.removeEventListener('touchstart', pause)
      track.removeEventListener('touchend',   resume)
    }
  }, [])

  const doubled = [...REVIEWS, ...REVIEWS]

  return (
    <section className="relative py-16 md:py-32 overflow-hidden bg-cream">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(196,146,42,0.06) 0%, transparent 60%)' }}
      />

      <div className="text-center mb-10 md:mb-14 px-5">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[10px] tracking-[0.5em] uppercase text-terra">Real Reviews</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="font-display font-light text-ink mt-3 mb-3"
          style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
          Loved by <span className="gradient-text italic">Coffee Lovers</span>
        </motion.h2>
        <p className="text-ink-muted font-accent" style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)' }}>
          4.8★ rating from 366+ happy guests on Google
        </p>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex items-stretch py-2" style={{ width: 'max-content' }}>
          {doubled.map((r, i) => <ReviewCard key={i} review={r} />)}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-10 md:mt-14 px-5">
        <a href="https://www.google.com/maps/place/The+Brewyard+Speciality+Coffee/@18.4751611,73.8618864,16z/data=!4m8!3m7!1s0x3bc2eb2f7a228a93:0x7ddc7a54f15b739b!8m2!3d18.4751611!4d73.8618864!9m1!1b1!16s%2Fg%2F11x1w5gsfy!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-terra hover:text-terra-light transition-colors min-h-[44px]">
          <StarIcon size={13} color="#B85C38" /> Read all reviews on Google
        </a>
      </motion.div>
    </section>
  )
}
