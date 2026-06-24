'use client'
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Journey from '@/components/Journey'
import Menu from '@/components/Menu'
import Cinematics from '@/components/Cinematics'
import Stats from '@/components/Stats'
import Ambience from '@/components/Ambience'
import Testimonials from '@/components/Testimonials'
import Location from '@/components/Location'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Journey />
        <Menu />
        <Cinematics />
        <Stats />
        <Ambience />
        <Testimonials />
        <Location />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
