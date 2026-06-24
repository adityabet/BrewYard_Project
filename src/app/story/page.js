'use client'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Experience from '@/components/Experience'
import Journey from '@/components/Journey'
import Cinematics from '@/components/Cinematics'
import Stats from '@/components/Stats'
import Footer from '@/components/Footer'

export default function StoryPage() {
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
        <Experience />
        <Journey />
        <Cinematics />
        <Stats />
      </main>
      <Footer />
    </>
  )
}
