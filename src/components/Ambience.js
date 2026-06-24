'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { DirectionsIcon } from './Icons'

const IMAGES = [
  { src: '/assets/cafe1.jpg',   h: 'h-[52vw] md:h-[420px]', label: 'The Space'      },
  { src: '/assets/cafe2.jpg',   h: 'h-[36vw] md:h-[200px]', label: 'Artisan Brews'  },
  { src: '/assets/cafe3.jpg',   h: 'h-[36vw] md:h-[200px]', label: 'Warm Vibes'     },
  { src: '/assets/cafe4.jpg',   h: 'h-[36vw] md:h-[200px]', label: 'Food & Coffee'  },
  { src: '/assets/cafe5.jpeg',  h: 'h-[52vw] md:h-[420px]', label: 'Morning Light'  },
  { src: '/assets/cafe6.jpg',   h: 'h-[36vw] md:h-[200px]', label: 'Pour Over Bar'  },
  { src: '/assets/cafe7.jpeg',  h: 'h-[36vw] md:h-[200px]', label: 'Cosy Corners'   },
  { src: '/assets/cafe8.jpeg',  h: 'h-[44vw] md:h-[320px]', label: 'The Craft'      },
  { src: '/assets/cafe9.jpeg',  h: 'h-[44vw] md:h-[320px]', label: 'Social Space'   },
  { src: '/assets/cafe10.jpeg', h: 'h-[36vw] md:h-[200px]', label: 'Iced Delights'  },
  { src: '/assets/cafe11.jpeg', h: 'h-[36vw] md:h-[200px]', label: 'Urban Feel'     },
  { src: '/assets/cafe12.jpeg', h: 'h-[42vw] md:h-[260px]', label: 'Evenings'       },
]

export default function Ambience() {
  return (
    <section id="ambience" className="relative py-16 md:py-32 overflow-hidden bg-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-terra">Visual Story</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="font-display font-light text-ink mt-3 mb-3"
            style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
            The <span className="gradient-text italic">Ambience</span>
          </motion.h2>
          <p className="text-ink-muted font-accent max-w-sm mx-auto" style={{ fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)' }}>
            Feel the warmth, the aroma, the craft — before you even take a sip.
          </p>
        </div>

        {/* Masonry */}
        <div className="masonry">
          {IMAGES.map((img, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-4%' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="masonry-item group relative overflow-hidden"
              style={{ boxShadow: '0 4px 20px rgba(28,10,4,0.08)' }}
            >
              <div className={`relative w-full ${img.h} overflow-hidden`}>
                <Image src={img.src} alt={img.label} fill
                  sizes="(max-width:480px) 50vw, (max-width:900px) 50vw, 33vw"
                  className="object-cover transition-transform duration-600 group-hover:scale-108"
                  quality={75}
                  style={{ transitionDuration: '600ms' }}
                />
                <div className="absolute inset-0 transition-opacity duration-400"
                  style={{ background: 'rgba(28,10,4,0)', opacity: 0 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1' }
                  onMouseLeave={e => e.currentTarget.style.opacity = '0' }
                />
                {/* Label — always visible on mobile, hover on desktop */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3
                  translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-350"
                  style={{ background: 'linear-gradient(to top, rgba(28,10,4,0.82), transparent)' }}>
                  <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(245,236,215,0.88)' }}>
                    {img.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-12 md:mt-16">
          <p className="text-ink-muted font-accent mb-5" style={{ fontSize: '1rem' }}>
            Come experience it in person
          </p>
          <a href="https://www.google.com/maps/place/The+Brewyard+Speciality+Coffee/@18.4751611,73.8618864,16z/data=!3m1!4b1!4m6!3m5!1s0x3bc2eb2f7a228a93:0x7ddc7a54f15b739b!8m2!3d18.4751611!4d73.8618864!16s%2Fg%2F11x1w5gsfy!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs tracking-[0.28em] uppercase
              transition-all duration-350 min-h-[48px]"
            style={{ border: '1px solid rgba(184,92,56,0.38)', color: '#B85C38' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B85C38'; e.currentTarget.style.color = '#FAF6F0' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B85C38' }}
          >
            <DirectionsIcon size={15} /> Get Directions
          </a>
        </motion.div>
      </div>
    </section>
  )
}
