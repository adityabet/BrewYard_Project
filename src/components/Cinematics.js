'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const SCENES = [
  { img: '/assets/cafe1.jpg',  label: '01', heading: ['Beans selected', 'with obsessive care.'],   sub: 'Single-origin. Specialty grade. Hand-picked.', align: 'left'   },
  { img: '/assets/cafe5.jpeg', label: '02', heading: ['Steam rises.', 'The ritual begins.'],        sub: 'Every brew is a ceremony, not a shortcut.',     align: 'right'  },
  { img: '/assets/cafe8.jpeg', label: '03', heading: ['Milk pours', 'in perfect arcs.'],            sub: 'Latte art is love made visible.',                align: 'left'   },
  { img: '/assets/cafe9.jpeg', label: '04', heading: ['Coffee swirls', 'into perfection.'],         sub: 'Extraction is our obsession, precision our art.', align: 'right' },
  { img: '/assets/cafe4.jpg',  label: '05', heading: ['Your cup.', 'Your moment.'],                 sub: 'Every cup has a story. This one is yours.',     align: 'center' },
]

/* ─── Mobile: vertical scroll → horizontal pan ─── */
function MobileCinematics() {
  const wrapRef   = useRef(null)
  const stickyRef = useRef(null)
  const trackRef  = useRef(null)
  const dotRefs   = useRef([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const wrap   = wrapRef.current
    const sticky = stickyRef.current
    const track  = trackRef.current
    if (!wrap || !sticky || !track) return

    const total = SCENES.length

    const onScroll = () => {
      const rect      = wrap.getBoundingClientRect()
      const wrapH     = wrap.offsetHeight
      const stickyH   = sticky.offsetHeight
      const scrolled  = -rect.top                       // px scrolled into section
      const maxScroll = wrapH - stickyH                 // total scrollable distance
      const progress  = Math.min(Math.max(scrolled / maxScroll, 0), 1)

      // Each slide is exactly one viewport wide; move (total-1) viewports total
      const maxX = (total - 1) * window.innerWidth
      track.style.transform = `translateX(-${progress * maxX}px)`

      // Active dot
      const idx = Math.min(Math.floor(progress * total + 0.15), total - 1)
      setCurrent(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    /* Outer wrapper — tall enough to drive the scroll */
    <div ref={wrapRef} style={{ height: `${SCENES.length * 100}dvh`, position: 'relative' }}>

      {/* Sticky viewport */}
      <div ref={stickyRef} className="sticky top-0 overflow-hidden"
        style={{ height: '100dvh', background: '#1C0A04' }}>

        {/* Top label */}
        <div className="absolute top-6 left-0 right-0 text-center z-20 pointer-events-none">
          <p className="text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(245,236,215,0.38)' }}>
            The Art of Coffee
          </p>
          <p className="font-display text-base font-light mt-0.5" style={{ color: 'rgba(245,236,215,0.65)' }}>
            Coffee <em style={{ color: '#B85C38' }}>Cinematics</em>
          </p>
        </div>

        {/* Horizontal track — translated by scroll */}
        <div ref={trackRef} className="absolute top-0 left-0 flex"
          style={{ width: `${SCENES.length * 100}vw`, height: '100dvh', willChange: 'transform', transition: 'transform 0.05s linear' }}>
          {SCENES.map((scene, i) => (
            <div key={i} className="relative flex-shrink-0 overflow-hidden"
              style={{ width: '100vw', height: '100dvh' }}>
              <Image src={scene.img} alt={scene.heading.join(' ')} fill
                sizes="100vw" className="object-cover" quality={85} priority={i === 0} />

              {/* Overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, rgba(28,10,4,0.45) 0%, rgba(28,10,4,0.25) 40%, rgba(28,10,4,0.88) 100%)'
              }} />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-20">
                <div className="font-display font-light select-none"
                  style={{ fontSize: '5rem', color: 'rgba(184,92,56,0.1)', lineHeight: 0.8, marginBottom: '-0.2em' }}>
                  {scene.label}
                </div>
                <h3 className="font-display font-light leading-tight mb-2.5"
                  style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', color: '#F5ECD7' }}>
                  {scene.heading[0]}<br />
                  <em style={{ color: '#DFB245' }}>{scene.heading[1]}</em>
                </h3>
                <div className="w-8 h-px mb-2.5" style={{ background: 'linear-gradient(90deg, #B85C38, #DFB245)' }} />
                <p className="font-accent text-sm leading-snug" style={{ color: 'rgba(245,236,215,0.6)' }}>
                  {scene.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
          style={{ background: 'rgba(245,236,215,0.08)' }}>
          <div className="h-full transition-all duration-100"
            style={{ width: `${((current + 1) / SCENES.length) * 100}%`,
              background: 'linear-gradient(90deg, #B85C38, #DFB245)' }} />
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-20">
          {SCENES.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{
                width:  i === current ? 18 : 5,
                height: 5,
                background: i === current ? '#DFB245' : 'rgba(245,236,215,0.22)',
              }} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-12 right-5 z-20 pointer-events-none flex flex-col items-center gap-1"
          style={{ opacity: current === 0 ? 1 : 0, transition: 'opacity 0.4s' }}>
          <div className="w-px h-6 animate-pulse" style={{ background: 'linear-gradient(to bottom, rgba(245,236,215,0.4), transparent)' }} />
          <p className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(245,236,215,0.3)' }}>scroll</p>
        </div>

        {/* Scene counter */}
        <div className="absolute top-6 right-5 z-20 font-mono text-[10px] tracking-widest pointer-events-none"
          style={{ color: 'rgba(245,236,215,0.22)' }}>
          0{current + 1} / 0{SCENES.length}
        </div>
      </div>
    </div>
  )
}

/* ─── Desktop: GSAP pinned cinematic scroll ─── */
function DesktopCinematics() {
  const wrapRef    = useRef(null)
  const stickyRef  = useRef(null)
  const panelsRef  = useRef([])
  const imgsRef    = useRef([])
  const textsRef   = useRef([])
  const counterRef = useRef(null)

  useEffect(() => {
    import('gsap').then(({ gsap: g }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => {
        g.registerPlugin(ST)
        const wrap   = wrapRef.current
        const sticky = stickyRef.current
        if (!wrap || !sticky) return

        const total = SCENES.length
        const tl = g.timeline({
          scrollTrigger: {
            trigger: wrap, start: 'top top',
            end: `+=${window.innerHeight * (total + 0.5)}`,
            scrub: 0.8, pin: sticky, anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(Math.floor(self.progress * total), total - 1)
              if (counterRef.current) counterRef.current.textContent = `0${idx + 1} / 0${total}`
            },
          },
        })

        panelsRef.current.forEach((panel, i) => {
          const img  = imgsRef.current[i]
          const text = textsRef.current[i]
          if (!panel) return
          g.set(panel, { autoAlpha: i === 0 ? 1 : 0 })
          g.set(img,   { scale: i === 0 ? 1.08 : 1.12 })
          g.set(text,  { y: i === 0 ? 0 : 40, autoAlpha: i === 0 ? 1 : 0 })
          tl.to(panel, { autoAlpha: 1, duration: 0.4 }, i)
          tl.to(img,   { scale: 1.0, duration: 1.0, ease: 'none' }, i)
          tl.to(text,  { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, i + 0.1)
          tl.to(img,   { y: '-4%', duration: 0.9, ease: 'none' }, i + 0.15)
          if (i < total - 1) {
            tl.to(text,  { y: -28, autoAlpha: 0, duration: 0.28 }, i + 0.66)
            tl.to(panel, { autoAlpha: 0, duration: 0.22 }, i + 0.76)
          }
        })
        return () => ST.getAll().forEach(t => t.kill())
      })
    )
    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => ST.getAll().forEach(t => t.kill()))
    }
  }, [])

  return (
    <section ref={wrapRef} className="relative" style={{ height: `${(SCENES.length + 1.5) * 100}vh` }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: '#1C0A04' }}>
        {/* Top label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
          <div className="text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(245,236,215,0.38)' }}>
            The Art of Coffee
          </div>
          <div className="font-display text-lg font-light mt-1" style={{ color: 'rgba(245,236,215,0.7)' }}>
            Coffee <em style={{ color: '#B85C38' }}>Cinematics</em>
          </div>
        </div>
        {/* Counter */}
        <div ref={counterRef} className="absolute bottom-10 right-8 z-30 font-mono text-xs tracking-widest"
          style={{ color: 'rgba(245,236,215,0.28)' }}>01 / 05</div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30"
          style={{ background: 'linear-gradient(90deg, #B85C38, #DFB245)', transformOrigin: 'left' }} />

        {/* Panels */}
        {SCENES.map((scene, i) => (
          <div key={i} ref={el => panelsRef.current[i] = el} className="absolute inset-0" style={{ willChange: 'opacity' }}>
            <div ref={el => imgsRef.current[i] = el} className="absolute inset-0 scale-[1.12]" style={{ willChange: 'transform' }}>
              <Image src={scene.img} alt={scene.heading.join(' ')} fill
                className="object-cover" priority={i === 0} quality={90} sizes="100vw" />
            </div>
            <div className="absolute inset-0" style={{
              background: scene.align === 'center'
                ? 'linear-gradient(180deg, rgba(28,10,4,0.72) 0%, rgba(28,10,4,0.5) 50%, rgba(28,10,4,0.82) 100%)'
                : scene.align === 'left'
                  ? 'linear-gradient(90deg, rgba(28,10,4,0.88) 0%, rgba(28,10,4,0.5) 55%, transparent 100%)'
                  : 'linear-gradient(270deg, rgba(28,10,4,0.88) 0%, rgba(28,10,4,0.5) 55%, transparent 100%)',
            }} />
            <div ref={el => textsRef.current[i] = el} className="absolute inset-0 flex items-center pointer-events-none"
              style={{ justifyContent: scene.align === 'center' ? 'center' : scene.align === 'left' ? 'flex-start' : 'flex-end', willChange: 'opacity,transform' }}>
              <div className={`px-12 md:px-20 max-w-xl ${scene.align === 'center' ? 'text-center' : ''}`}>
                <div className="font-display font-light leading-none mb-0 select-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', color: 'rgba(184,92,56,0.1)', lineHeight: 0.8, marginBottom: '-0.3em' }}>
                  {scene.label}
                </div>
                <h3 className="font-display font-light leading-[1.05]"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4.2rem)', color: '#F5ECD7' }}>
                  {scene.heading[0]}<br />
                  <em style={{ color: '#DFB245' }}>{scene.heading[1]}</em>
                </h3>
                <div className={`my-5 h-px ${scene.align === 'center' ? 'mx-auto' : ''}`}
                  style={{ width: 48, background: 'linear-gradient(90deg, #B85C38, #DFB245)' }} />
                <p className="font-accent text-base md:text-lg leading-relaxed" style={{ color: 'rgba(245,236,215,0.62)' }}>
                  {scene.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Cinematics() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile ? <MobileCinematics /> : <DesktopCinematics />
}
