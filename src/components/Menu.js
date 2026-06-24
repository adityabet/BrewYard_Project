'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  CoffeeIcon, FlaskIcon, IceIcon, WaveIcon, CocktailIcon,
  TeaIcon, EggIcon, SandwichIcon, BurgerIcon, FriesIcon,
  SparkleIcon, CakeIcon,
} from './Icons'

const CATEGORIES = [
  { id: 'coffee',     label: 'Speciality Coffee', Icon: CoffeeIcon,   img: '/assets/cafe6.jpg',   items: ['Espresso','Americano','Cappuccino','Latte','Flat White','Mocha','Cortado','Macchiato','Vanilla Cappuccino','Hazelnut Cappuccino','Tiramisu Cappuccino','Spanish Cappuccino'] },
  { id: 'manual',     label: 'Manual Brews',       Icon: FlaskIcon,    img: '/assets/cafe7.jpeg',  items: ['Pour Over','French Press','Aeropress','Syphon Brew','Cold Drip'] },
  { id: 'iced',       label: 'Iced Coffee',         Icon: IceIcon,      img: '/assets/cafe8.jpeg',  items: ['Iced Americano','Classic Espresso Tonic','Strawberry Espresso Tonic','Passion Fruit Espresso Tonic','Berry Bee Espresso Tonic','Coffee Beer','Coconut Espresso Tonic','Espresso Smoothie'] },
  { id: 'cold',       label: 'Cold Brews',          Icon: WaveIcon,     img: '/assets/cafe9.jpeg',  items: ['Cold Brew','Coconut Cold Brew','Iced Berry Brew','Cinnamon Cold Brew','Bastilla Beet Cream Cold Brew'] },
  { id: 'mocktails',  label: 'Coffee Mocktails',    Icon: CocktailIcon, img: '/assets/cafe10.jpeg', items: ['Espresso Martini','Vietnamese Espresso','Vietnamese Salted Coffee','Coffee Mojito','Coffee Citrus Cooler'] },
  { id: 'tea',        label: 'Tea & Refreshers',    Icon: TeaIcon,      img: '/assets/cafe11.jpeg', items: ['Lemon Iced Tea','Peach Iced Tea','Matcha Latte','Strawberry Matcha Latte'] },
  { id: 'breakfast',  label: 'All Day Breakfast',   Icon: EggIcon,      img: '/assets/cafe12.jpeg', items: ['English Breakfast','Korean Egg Toast','Cheese Chilly Toast','Bagel Sandwich','Cheesy Garlic Bread','Chicken Pesto Flatbread'] },
  { id: 'sandwiches', label: 'Sandwiches',           Icon: SandwichIcon, img: '/assets/cafe1.jpg',   items: ['Caramelized Veggie Sandwich','Harissa Mushroom Melt','Fiery Grilled Cheese','Chicken Pesto Sandwich'] },
  { id: 'burgers',    label: 'Burgers',              Icon: BurgerIcon,   img: '/assets/cafe2.jpg',   items: ['Spicy Chicken Burger','Grilled Chicken Burger','Classic Veg Burger'] },
  { id: 'fries',      label: 'Fries & Sides',        Icon: FriesIcon,    img: '/assets/cafe3.jpg',   items: ['Salted Fries','Peri Peri Fries','Bacon Fries'] },
  { id: 'specials',   label: 'Seasonal Specials',    Icon: SparkleIcon,  img: '/assets/cafe4.jpg',   items: ['Strawberry Chocolate','Mulled Coffee','Strawberry and Basil Cold Brew'] },
  { id: 'desserts',   label: 'Desserts',             Icon: CakeIcon,     img: '/assets/cafe5.jpeg',  items: ['Brownies','Cheesecake','Coffee Desserts','Seasonal Desserts'] },
]

const PICKS = ['Pour Over Coffee','Vietnamese Salted Coffee','Espresso Martini','Classic Cold Brew','Strawberry Espresso Tonic','Harissa Mushroom Melt','Chicken Pesto Sandwich','Spicy Chicken Burger','Peri Peri Fries','Cheesecake']

export default function Menu() {
  const [active, setActive] = useState('coffee')
  const activeCat = CATEGORIES.find(c => c.id === active)

  return (
    <section id="menu" className="relative py-16 md:py-32 overflow-hidden bg-linen">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(184,92,56,0.05) 0%, transparent 60%)' }}
      />

      {/* Header */}
      <div className="text-center mb-10 md:mb-14 px-5">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-[10px] tracking-[0.5em] uppercase text-terra">
          Our Offerings
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className="font-display font-light text-ink mt-3 mb-3"
          style={{ fontSize: 'clamp(2rem, 7vw, 4rem)' }}>
          Signature <span className="gradient-text italic">Creations</span>
        </motion.h2>
        <p className="text-ink-muted font-accent max-w-md mx-auto" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
          Every item curated with intention — from bean to plate.
        </p>
      </div>

      {/* Marquee */}
      <div className="mb-10 md:mb-14 overflow-hidden py-3"
        style={{ borderTop: '1px solid rgba(184,92,56,0.1)', borderBottom: '1px solid rgba(184,92,56,0.1)' }}>
        <div className="animate-marquee flex whitespace-nowrap gap-10 w-max">
          {[...PICKS, ...PICKS].map((p, i) => (
            <span key={i} className="text-xs tracking-[0.3em] uppercase font-accent"
              style={{ color: 'rgba(184,92,56,0.5)' }}>
              ✦ {p}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Category tabs — scrollable on mobile */}
        <div className="flex gap-2 flex-wrap justify-start sm:justify-center mb-8 md:mb-10
          overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-[10px] tracking-widest uppercase transition-all duration-250
                border rounded-sm flex-shrink-0 min-h-[40px]"
              style={active === cat.id
                ? { background: '#B85C38', color: '#FAF6F0', borderColor: '#B85C38', fontWeight: 500 }
                : { borderColor: 'rgba(184,92,56,0.22)', color: '#7A5A48' }
              }
            >
              <cat.Icon size={13} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Active category */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-6 md:gap-14 items-start"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden"
              style={{ boxShadow: '0 16px 48px rgba(28,10,4,0.12)' }}>
              <Image src={activeCat.img} alt={activeCat.label} fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover" quality={80} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(28,10,4,0.7) 0%, transparent 55%)' }} />
              <div className="absolute inset-0" style={{ border: '1px solid rgba(184,92,56,0.1)' }} />
              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(184,92,56,0.85)' }}>
                  <activeCat.Icon size={18} color="#FAF6F0" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream">{activeCat.label}</h3>
                  <div className="text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(196,146,42,0.8)' }}>
                    {activeCat.items.length} items
                  </div>
                </div>
              </div>
            </div>

            {/* Items list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {activeCat.items.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.35 }}
                  className="group flex items-center gap-3 py-3.5 px-3 transition-colors duration-200 cursor-default min-h-[48px]"
                  style={{ borderBottom: '1px solid rgba(184,92,56,0.07)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,92,56,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(184,92,56,0.35)' }} />
                  <span className="font-accent text-ink-soft group-hover:text-ink transition-colors text-sm leading-snug flex-1">
                    {item}
                  </span>
                  {PICKS.includes(item) && (
                    <span className="text-[9px] tracking-widest uppercase flex-shrink-0 px-1.5 py-0.5 rounded-sm"
                      style={{ color: '#B85C38', border: '1px solid rgba(184,92,56,0.28)' }}>
                      Pick
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
