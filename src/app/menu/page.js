'use client'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default function MenuPage() {
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
        <Menu />
      </main>
      <Footer />
    </>
  )
}
