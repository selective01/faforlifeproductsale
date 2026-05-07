import type { Metadata } from 'next'
import { Bebas_Neue, Barlow, Barlow_Condensed } from 'next/font/google'
import '../styles/globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const condensed = Barlow_Condensed({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Faforlife Products',
  description: 'Natural health and wellness products by Faforlife.',
  metadataBase: new URL('https://www.faforlifeproductsale.online'),
  openGraph: {
    title: 'Faforlife — Natural Health Products',
    description: 'Natural health and wellness products trusted by millions across Nigeria.',
    url: 'https://www.faforlifeproductsale.online',
    siteName: 'Faforlife',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Faforlife Natural Health Products',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faforlife — Natural Health Products',
    description: 'Natural health and wellness products trusted by millions across Nigeria.',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${bebas.variable} ${barlow.variable} ${condensed.variable}`}>
        {children}
      </body>
    </html>
  )
}