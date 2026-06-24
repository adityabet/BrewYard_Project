/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        /* Warm nude backgrounds */
        linen:       '#FAF6F0',
        'linen-dark':'#F2E8D8',
        parchment:   '#E8D9C4',
        'warm-white':'#FDF9F4',

        /* Deep warm sections */
        espresso:    '#1C0A04',
        'espresso-2':'#2A1208',
        'espresso-3':'#140702',

        /* Browns */
        'coffee-brown':  '#8B5E3C',
        'coffee-medium': '#A67C52',
        'coffee-light':  '#C4A882',

        /* Text */
        'ink':        '#1C0A04',
        'ink-soft':   '#3D1E0E',
        'ink-muted':  '#7A5A48',
        'ink-faint':  '#A68B78',

        /* Warm cream (text on dark) */
        cream:        '#F5ECD7',
        'cream-soft': '#E8D9C4',

        /* Primary accent — terracotta */
        terra:        '#B85C38',
        'terra-light':'#D4734A',
        'terra-pale': '#F0C4B0',

        /* Secondary accent — honey/amber */
        honey:        '#C4922A',
        'honey-light':'#DFB245',
        gold:         '#C4922A',
        'gold-light': '#DFB245',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent:  ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      animation: {
        marquee:      'marquee 40s linear infinite',
        'float-bean': 'floatBean 8s ease-in-out infinite',
        shimmer:      'shimmer 3s linear infinite',
        'steam-rise': 'steamRise 3s ease-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatBean: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':     { transform: 'translateY(-30px) rotate(180deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        steamRise: {
          '0%':   { transform: 'translateY(0) translateX(0) scaleX(1)', opacity: 0 },
          '20%':  { opacity: 0.4 },
          '100%': { transform: 'translateY(-90px) translateX(12px) scaleX(2)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
