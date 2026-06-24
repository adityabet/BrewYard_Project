'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onEnter = () => {
      if (ringRef.current) { ringRef.current.style.transform += ' scale(2.4)'; ringRef.current.style.borderColor = '#B85C38'; ringRef.current.style.opacity = '0.5' }
      if (dotRef.current)  { dotRef.current.style.transform  += ' scale(0)' }
    }
    const onLeave = () => {
      if (ringRef.current) { ringRef.current.style.borderColor = 'rgba(184,92,56,0.4)'; ringRef.current.style.opacity = '1' }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full z-[9998] pointer-events-none"
        style={{ background: '#B85C38', willChange: 'transform' }}
      />
      <div ref={ringRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full z-[9997] pointer-events-none transition-[border-color,opacity] duration-300"
        style={{ border: '1px solid rgba(184,92,56,0.4)', willChange: 'transform' }}
      />
    </>
  )
}
