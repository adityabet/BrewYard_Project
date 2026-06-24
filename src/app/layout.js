import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata = {
  title: 'The Brewyard Speciality Coffee | Bibwewadi, Pune',
  description:
    'Experience specialty coffee crafted with passion, brewed with precision, served with soul. Visit The Brewyard in Bibwewadi, Pune. Open daily 8:30 AM – 11 PM.',
  keywords:
    'specialty coffee pune, pour over coffee, cold brew pune, espresso, café bibwewadi, best coffee shop pune',
  openGraph: {
    title: 'The Brewyard Speciality Coffee',
    description: 'Every Cup Has A Story. Crafted with Passion. Brewed with Precision. Served with Soul.',
    type: 'website',
    locale: 'en_IN',
  },
}

export const viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="font-sans bg-espresso text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
