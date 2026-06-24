'use client'
import { motion } from 'framer-motion'
import { MapPinIcon, ClockIcon, PhoneIcon, DirectionsIcon, ChatIcon } from './Icons'

const INFO = [
  { Icon: MapPinIcon, label: 'Address',      lines: ['Soba Savera Complex,', 'Near Chintamani Hospital,', 'Bibwewadi, Pune – 411 037'] },
  { Icon: ClockIcon,  label: 'Hours',        lines: ['Monday – Sunday', '8:30 AM – 11:00 PM', 'Open All Year'] },
  { Icon: PhoneIcon,  label: 'Reservations', lines: ['+91 78208 93140', 'Call or WhatsApp'], link: 'tel:+917820893140' },
]

export default function Location() {
  return (
    <section id="location" className="relative py-16 md:py-32 overflow-hidden bg-linen-dark">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 80%, rgba(184,92,56,0.06) 0%, transparent 60%)' }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[10px] tracking-[0.5em] uppercase text-terra">Find Us</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="font-display font-light text-ink mt-3"
            style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
            Visit <span className="gradient-text italic">The Brewyard</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-14 items-start">

          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="relative overflow-hidden"
            style={{ aspectRatio: '4/3', border: '1px solid rgba(184,92,56,0.15)',
              boxShadow: '0 16px 48px rgba(28,10,4,0.1)' }}>
            <iframe
              title="The Brewyard Speciality Coffee"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.6!2d73.8618864!3d18.4751611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb2f7a228a93%3A0x7ddc7a54f15b739b!2sThe%20Brewyard%20Speciality%20Coffee!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-3 left-3 px-3 py-2.5 pointer-events-none"
              style={{ background: 'rgba(250,246,240,0.94)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(184,92,56,0.18)' }}>
              <div className="text-[10px] tracking-widest uppercase font-medium text-terra flex items-center gap-1.5">
                <MapPinIcon size={11} color="#B85C38" /> The Brewyard
              </div>
              <div className="text-[9px] mt-0.5 text-ink-muted">Speciality Coffee · Pune</div>
            </div>
          </motion.div>

          {/* Info + CTAs */}
          <div className="flex flex-col gap-4">
            {INFO.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.12 }}
                className="p-5 sm:p-6 transition-colors duration-300"
                style={{ background: 'rgba(250,246,240,0.82)', border: '1px solid rgba(184,92,56,0.1)',
                  boxShadow: '0 4px 18px rgba(28,10,4,0.05)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,92,56,0.28)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,92,56,0.1)'}
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(184,92,56,0.1)' }}>
                    <item.Icon size={16} color="#B85C38" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] tracking-[0.4em] uppercase mb-1.5 text-terra">{item.label}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} className={`text-sm leading-relaxed ${j === 0 ? 'text-ink font-medium' : 'text-ink-muted'}`}>
                        {line}
                      </div>
                    ))}
                    {item.link && (
                      <a href={item.link}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-terra hover:text-terra-light transition-colors">
                        Call Now <span style={{ fontSize: 10 }}>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Action buttons */}
            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.55 }}
              href="https://www.google.com/maps/place/The+Brewyard+Speciality+Coffee/@18.4751611,73.8618864,16z/data=!3m1!4b1!4m6!3m5!1s0x3bc2eb2f7a228a93:0x7ddc7a54f15b739b!8m2!3d18.4751611!4d73.8618864!16s%2Fg%2F11x1w5gsfy!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 text-sm tracking-[0.22em] uppercase font-medium transition-colors duration-300 min-h-[52px]"
              style={{ background: '#B85C38', color: '#FAF6F0' }}
              onMouseEnter={e => e.currentTarget.style.background = '#D4734A'}
              onMouseLeave={e => e.currentTarget.style.background = '#B85C38'}
            >
              <DirectionsIcon size={17} color="#FAF6F0" /> Get Directions
            </motion.a>

            <motion.a initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.65 }}
              href="https://wa.me/917820893140" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 py-4 text-sm tracking-[0.22em] uppercase transition-all duration-300 min-h-[52px]"
              style={{ border: '1px solid rgba(184,92,56,0.28)', color: '#7A5A48' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B85C38'; e.currentTarget.style.color = '#B85C38' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,92,56,0.28)'; e.currentTarget.style.color = '#7A5A48' }}
            >
              <ChatIcon size={17} /> Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
