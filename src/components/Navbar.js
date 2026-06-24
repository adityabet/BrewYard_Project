'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon } from './Icons'

const links = [
  { label: 'Story',   href: '#experience' },
  { label: 'Menu',    href: '#menu'       },
  { label: 'Gallery', href: '#ambience'   },
  { label: 'Visit',   href: '#location'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (href) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, open ? 300 : 0)
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-400 ${scrolled ? 'py-3 shadow-sm' : 'py-4 md:py-5'}`}
        style={scrolled
          ? { background: 'rgba(250,246,240,0.94)', backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(184,92,56,0.1)' }
          : {}
        }
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col min-h-0" aria-label="The Brewyard — back to top">
            <span className="font-display leading-none"
              style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)', letterSpacing: '0.18em',
                color: scrolled ? '#1C0A04' : '#F5ECD7' }}>
              THE BREWYARD
            </span>
            <span className="font-accent text-[8px] tracking-[0.45em] uppercase mt-0.5 hidden sm:block"
              style={{ color: scrolled ? '#7A5A48' : 'rgba(245,236,215,0.5)' }}>
              Speciality Coffee · Pune
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 relative group min-h-0 py-1"
                style={{ color: scrolled ? '#7A5A48' : 'rgba(245,236,215,0.85)' }}>
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-terra group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a href="tel:+917820893140"
              className="flex items-center gap-2 px-4 py-2 border text-[10px] tracking-[0.2em] uppercase
                transition-all duration-300 rounded-sm min-h-[40px]"
              style={scrolled
                ? { borderColor: 'rgba(184,92,56,0.4)', color: '#B85C38' }
                : { borderColor: 'rgba(245,236,215,0.45)', color: 'rgba(245,236,215,0.9)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#B85C38'; e.currentTarget.style.color = '#FAF6F0'; e.currentTarget.style.borderColor = '#B85C38' }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = scrolled ? '#B85C38' : 'rgba(245,236,215,0.9)'
                e.currentTarget.style.borderColor = scrolled ? 'rgba(184,92,56,0.4)' : 'rgba(245,236,215,0.45)'
              }}
            >
              <PhoneIcon size={12} /> Reserve
            </a>
          </nav>

          {/* Mobile right side */}
          <div className="flex items-center gap-3 md:hidden">
            <a href="tel:+917820893140"
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background: 'rgba(184,92,56,0.1)' }}
              aria-label="Call The Brewyard">
              <PhoneIcon size={16} color="#B85C38" />
            </a>
            <button onClick={() => setOpen(!open)}
              className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              aria-label={open ? 'Close menu' : 'Open menu'}>
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8.5 : 0 }}
                className="block w-5 h-px origin-center"
                style={{ background: scrolled ? '#1C0A04' : '#F5ECD7' }} />
              <motion.span animate={{ opacity: open ? 0 : 1 }}
                className="block w-5 h-px"
                style={{ background: scrolled ? '#1C0A04' : '#F5ECD7' }} />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8.5 : 0 }}
                className="block w-5 h-px origin-center"
                style={{ background: scrolled ? '#1C0A04' : '#F5ECD7' }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[190] md:hidden flex flex-col items-center justify-center gap-6 px-6"
            style={{ background: 'rgba(250,246,240,0.98)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          >
            {links.map((l, i) => (
              <motion.button key={l.href}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(l.href)}
                className="font-display font-light text-ink tracking-wider min-h-[56px]"
                style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)' }}>
                {l.label}
              </motion.button>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-4 flex flex-col items-center gap-3 w-full max-w-xs">
              <a href="tel:+917820893140"
                className="w-full flex items-center justify-center gap-2.5 py-4 text-sm tracking-[0.25em] uppercase min-h-[52px]"
                style={{ background: '#B85C38', color: '#FAF6F0' }}>
                <PhoneIcon size={16} color="#FAF6F0" /> +91 78208 93140
              </a>
              <a href="https://wa.me/917820893140" target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs tracking-[0.25em] uppercase min-h-[48px]"
                style={{ border: '1px solid rgba(184,92,56,0.3)', color: '#7A5A48' }}>
                WhatsApp Us
              </a>
            </motion.div>
            <div className="absolute inset-0 -z-10" onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
