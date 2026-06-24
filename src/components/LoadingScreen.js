'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let start = null
    const duration = 2600
    const step = (ts) => {
      if (!start) start = ts
      const elapsed = ts - start
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)
      if (p < 100) requestAnimationFrame(step)
      else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 800)
        }, 200)
      }
    }
    requestAnimationFrame(step)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at 50% 55%, #F5ECD7 0%, #E8D9C4 60%, #D9C8B0 100%)' }}
        >
          {/* Animated cup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 relative"
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <motion.path
                d="M16 30 L22 68 Q22 72 26 72 L54 72 Q58 72 58 68 L64 30 Z"
                fill="none" stroke="#B85C38" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
              <motion.ellipse
                cx="40" cy="74" rx="24" ry="4"
                fill="none" stroke="#B85C38" strokeWidth="1.5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
              <motion.path
                d="M64 38 Q80 38 80 50 Q80 62 64 62"
                fill="none" stroke="#B85C38" strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              />
              <motion.path d="M30 24 Q33 16 30 8" fill="none" stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                transition={{ duration: 2, delay: 1.4, repeat: Infinity, repeatDelay: 0.4 }} />
              <motion.path d="M40 22 Q43 14 40 6" fill="none" stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                transition={{ duration: 2, delay: 1.7, repeat: Infinity, repeatDelay: 0.4 }} />
              <motion.path d="M50 24 Q53 16 50 8" fill="none" stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0] }}
                transition={{ duration: 2, delay: 2.0, repeat: Infinity, repeatDelay: 0.4 }} />
              <motion.ellipse cx="40" cy="38" rx="20" ry="4"
                fill="#C4922A" fillOpacity="0.3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }} />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-2"
          >
            <div className="font-display text-4xl md:text-5xl text-espresso tracking-[0.15em] font-light">
              THE BREWYARD
            </div>
            <div className="font-accent text-sm tracking-[0.5em] text-ink-muted mt-1 uppercase">
              Speciality Coffee
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-xs text-coffee-medium tracking-[0.3em] uppercase mb-12"
          >
            Pune, India
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 220 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative h-[1px] rounded-full overflow-hidden"
            style={{ background: 'rgba(184,92,56,0.2)' }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #B85C38, #DFB245)',
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-[10px] text-ink-muted tracking-widest font-mono"
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
