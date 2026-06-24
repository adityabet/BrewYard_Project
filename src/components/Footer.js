'use client'
import { MapPinIcon, ClockIcon, PhoneIcon } from './Icons'

const NAV = [
  { label: 'Our Story', href: '#experience' },
  { label: 'Menu',      href: '#menu'       },
  { label: 'Gallery',   href: '#ambience'   },
  { label: 'Visit Us',  href: '#location'   },
]

const HIGHLIGHTS = [
  'Pour Over Coffee', 'Vietnamese Salted Coffee', 'Espresso Martini',
  'Cold Brew', 'Strawberry Espresso Tonic', 'Harissa Mushroom Melt',
  'Chicken Pesto Sandwich', 'Spicy Chicken Burger', 'Cheesecake',
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#1C0A04', borderTop: '1px solid rgba(184,92,56,0.15)' }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(184,92,56,0.5), rgba(196,146,42,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 md:pt-20 pb-8 md:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12 md:mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col mb-6"
            >
              <span className="font-display text-3xl tracking-[0.15em] leading-none" style={{ color: '#F5ECD7' }}>
                THE BREWYARD
              </span>
              <span className="font-accent text-xs tracking-[0.5em] uppercase mt-1" style={{ color: 'rgba(245,236,215,0.3)' }}>
                Speciality Coffee · Pune
              </span>
            </button>
            <p className="font-accent leading-relaxed max-w-xs mb-8 text-sm" style={{ color: 'rgba(245,236,215,0.45)' }}>
              A destination for coffee lovers, creators, and dreamers. Every cup crafted with obsessive care and served with soul.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3" style={{ color: 'rgba(245,236,215,0.45)' }}>
                <MapPinIcon size={15} color="rgba(245,236,215,0.35)" />
                <span>Soba Savera Complex, Near Chintamani Hospital, Bibwewadi, Pune</span>
              </div>
              <div className="flex items-center gap-3" style={{ color: 'rgba(245,236,215,0.45)' }}>
                <ClockIcon size={15} color="rgba(245,236,215,0.35)" />
                <span>Open Daily · 8:30 AM – 11:00 PM</span>
              </div>
              <a href="tel:+917820893140"
                className="flex items-center gap-3 transition-colors min-h-[44px]"
                style={{ color: 'rgba(245,236,215,0.45)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#B85C38'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,236,215,0.45)'}
              >
                <PhoneIcon size={15} color="rgba(245,236,215,0.35)" /> +91 78208 93140
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(184,92,56,0.7)' }}>Navigate</h4>
            <ul className="flex flex-col gap-3">
              {NAV.map(link => (
                <li key={link.href}>
                  <a href={link.href}
                    className="font-accent text-sm tracking-wide transition-colors"
                    style={{ color: 'rgba(245,236,215,0.5)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#B85C38'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,236,215,0.5)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(184,92,56,0.7)' }}>Highlights</h4>
            <ul className="flex flex-col gap-2">
              {HIGHLIGHTS.map(item => (
                <li key={item} className="font-accent text-sm transition-colors cursor-default"
                  style={{ color: 'rgba(245,236,215,0.4)' }}>
                  <span style={{ color: 'rgba(184,92,56,0.4)' }} className="mr-2">·</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(184,92,56,0.2), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider"
          style={{ color: 'rgba(245,236,215,0.25)' }}>
          <div>© {new Date().getFullYear()} The Brewyard Speciality Coffee. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span style={{ color: '#B85C38' }} className="text-xs">✦</span>
            <span>Crafted with Passion · Bibwewadi, Pune</span>
            <span style={{ color: '#B85C38' }} className="text-xs">✦</span>
          </div>
          <a href="https://www.google.com/maps/place/The+Brewyard+Speciality+Coffee/@18.4751611,73.8618864,16z/data=!3m1!4b1!4m6!3m5!1s0x3bc2eb2f7a228a93:0x7ddc7a54f15b739b!8m2!3d18.4751611!4d73.8618864!16s%2Fg%2F11x1w5gsfy!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer"
            className="transition-colors"
            onMouseEnter={e => e.currentTarget.style.color = '#B85C38'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,236,215,0.25)'}
          >
            View on Google Maps →
          </a>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 right-0 font-display font-light leading-none pointer-events-none select-none"
        style={{ fontSize: '18vw', color: 'rgba(184,92,56,0.04)', transform: 'translateY(30%)' }}>
        BREW
      </div>
    </footer>
  )
}
