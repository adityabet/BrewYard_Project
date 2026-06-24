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

/* ─── Mobile: pinned crossfade driven by vertical scroll ─── */
function MobileCinematics() {
  const wrapRef  = useRef(null)
  const panelRefs = useRef([])
  const textRefs  = useRef([])
  const barRef    = useRef(null)
  const counterRef = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const total = SCENES.length

    const onScroll = () => {
      const rect      = wrap.getBoundingClientRect()
      const wrapH     = wrap.offsetHeight
      const vh        = window.innerHeight
      const scrolled  = Math.max(-rect.top, 0)
      const maxScroll = wrapH - vh
      const prog      = Math.min(scrolled / maxScroll, 1)  // 0→1 over whole section

      const sceneF = prog * total
      const idx    = Math.min(Math.floor(sceneF), total - 1)
      const local  = sceneF - Math.floor(sceneF)           // 0→1 within current scene

      setCurrent(idx)

      // Update progress bar
      if (barRef.current) barRef.current.style.width = `${prog * 100}%`
      if (counterRef.current) counterRef.current.textContent = `0${idx + 1} / 0${total}`

      // Animate each panel
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return
        const text = textRefs.current[i]

        if (i === idx) {
          // Active scene: fade in + Ken Burns scale down
          const enterP  = Math.min(local / 0.25, 1)
          const scale   = 1.06 - enterP * 0.06  // 1.06 → 1.00
          const textY   = (1 - Math.min(local / 0.3, 1)) * 30
          const textOp  = Math.min(local / 0.3, 1)

          panel.style.opacity  = String(i === 0 ? 1 : enterP)
          panel.style.zIndex   = '2'
          panel.children[0].style.transform = `scale(${scale})`
          if (text) { text.style.transform = `translateY(${textY}px)`; text.style.opacity = String(i === 0 && local < 0.01 ? 1 : textOp) }

        } else if (i === idx - 1) {
          // Previous scene: fade out
          const exitP  = Math.min(local / 0.3, 1)
          const textY  = exitP * -28
          const textOp = 1 - exitP

          panel.style.opacity = String(1 - exitP)
          panel.style.zIndex  = '1'
          panel.children[0].style.transform = `scale(1)`
          if (text) { text.style.transform = `translateY(${textY}px)`; text.style.opacity = String(textOp) }

        } else {
          panel.style.opacity = i < idx ? '0' : (i === 0 ? '1' : '0')
          panel.style.zIndex  = '0'
          panel.children[0].style.transform = `scale(1.06)`
          if (text) { text.style.transform = 'translateY(30px)'; text.style.opacity = i === 0 && idx === 0 ? '1' : '0' }
        }
      })

      // First panel: always show at start
      if (panelRefs.current[0] && idx === 0 && scrolled === 0) {
        panelRefs.current[0].style.opacity = '1'
        if (textRefs.current[0]) { textRefs.current[0].style.transform = 'translateY(0px)'; textRefs.current[0].style.opacity = '1' }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} style={{ height: `${(SCENES.length + 0.8) * 100}dvh`, position: 'relative' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100dvh', background: '#1C0A04' }}>

        {/* Panels — stacked absolutely */}
        {SCENES.map((scene, i) => (
          <div key={i} ref={el => panelRefs.current[i] = el}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 0, willChange: 'opacity' }}>

            {/* Image wrapper for Ken Burns */}
            <div className="absolute inset-0" style={{ transform: 'scale(1.06)', willChange: 'transform', transition: 'transform 0.08s linear' }}>
              <Image src={scene.img} alt={scene.heading.join(' ')} fill
                sizes="100vw" className="object-cover" quality={85} priority={i === 0} />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(28,10,4,0.42) 0%, rgba(28,10,4,0.22) 38%, rgba(28,10,4,0.9) 100%)'
            }} />

            {/* Text */}
            <div ref={el => textRefs.current[i] = el}
              className="absolute bottom-0 left-0 right-0 p-6 pb-24"
              style={{ transform: i === 0 ? 'translateY(0px)' : 'translateY(30px)', opacity: i === 0 ? 1 : 0, willChange: 'transform,opacity' }}>
              <div className="font-display font-light select-none"
                style={{ fontSize: '5.5rem', color: 'rgba(184,92,56,0.1)', lineHeight: 0.78, marginBottom: '-0.15em' }}>
                {scene.label}
              </div>
              <h3 className="font-display font-light leading-tight mb-3"
                style={{ fontSize: 'clamp(1.7rem, 6.5vw, 2.2rem)', color: '#F5ECD7' }}>
                {scene.heading[0]}<br />
                <em style={{ color: '#DFB245' }}>{scene.heading[1]}</em>
              </h3>
              <div className="w-10 h-px mb-3" style={{ background: 'linear-gradient(90deg, #B85C38, #DFB245)' }} />
              <p className="font-accent text-sm leading-relaxed" style={{ color: 'rgba(245,236,215,0.62)' }}>
                {scene.sub}
              </p>
            </div>
          </div>
        ))}

        {/* Top label */}
        <div className="absolute top-7 left-0 right-0 text-center z-30 pointer-events-none">
          <p className="text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(245,236,215,0.35)' }}>The Art of Coffee</p>
          <p className="font-display text-sm font-light mt-0.5" style={{ color: 'rgba(245,236,215,0.6)' }}>
            Coffee <em style={{ color: '#B85C38' }}>Cinematics</em>
          </p>
        </div>

        {/* Counter top-right */}
        <div ref={counterRef} className="absolute top-7 right-5 z-30 font-mono text-[10px] tracking-widest pointer-events-none"
          style={{ color: 'rgba(245,236,215,0.22)' }}>01 / 05</div>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30 pointer-events-none">
          {SCENES.map((_, i) => (
            <div key={i} className="rounded-full"
              style={{
                width: i === current ? 20 : 5, height: 5,
                background: i === current ? '#DFB245' : 'rgba(245,236,215,0.2)',
                transition: 'width 0.35s ease, background 0.35s ease',
              }} />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30" style={{ background: 'rgba(245,236,215,0.07)' }}>
          <div ref={barRef} className="h-full" style={{ width: '0%', background: 'linear-gradient(90deg,#B85C38,#DFB245)', transition: 'width 0.08s linear' }} />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-14 right-5 z-30 pointer-events-none flex flex-col items-center gap-1"
          style={{ opacity: current === 0 ? 0.55 : 0, transition: 'opacity 0.5s' }}>
          <div className="w-px h-7 animate-pulse" style={{ background: 'linear-gradient(to bottom,rgba(245,236,215,0.5),transparent)' }} />
          <p className="text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(245,236,215,0.35)' }}>scroll</p>
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
