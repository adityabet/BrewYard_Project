'use client'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Location from '@/components/Location'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function VisitPage() {
  useEffect(() => {
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
      return () => lenis.destroy()
    })
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Location />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
