'use client'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Ambience from '@/components/Ambience'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function GalleryPage() {
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
        <Ambience />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
