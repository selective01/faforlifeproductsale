import type { Metadata } from 'next'
import { Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google'
import '@/styles/globals.css'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' })
const barlow = Barlow({ weight: ['400', '600', '700'], subsets: ['latin'], variable: '--font-barlow' })
const condensed = Barlow_Condensed({ weight: ['500', '700'], subsets: ['latin'], variable: '--font-condensed' })

export const metadata: Metadata = {
  title: 'Faforlife Products',
  description: 'Natural health and wellness products by Faforlife.',
  metadataBase: new URL('https://www.faforlifeproductsale.online'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${barlow.variable} ${condensed.variable}`}>
        {children}
      </body>
    </html>
  )
}
