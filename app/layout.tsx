import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ismailelaaddioui.com'),
  title: 'Ismail El Aaddioui — Photographer',
  description: 'Photographer & Filmmaker based in Marrakesh. Editorial, fashion, travel. GQ Middle East · M Le Monde · Nataal.',
  openGraph: {
    title: 'Ismail El Aaddioui — Photographer',
    description: 'Photographer & Filmmaker based in Marrakesh. Editorial, fashion, travel. GQ Middle East · M Le Monde · Nataal.',
    url: 'https://www.ismailelaaddioui.com',
    siteName: 'Ismail El Aaddioui',
    images: [
      {
        url: '/images/Slider/IMG_7246-Edit 1.jpg',
        width: 1441,
        height: 1920,
        alt: 'Ismail El Aaddioui — Photographer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ismail El Aaddioui — Photographer',
    description: 'Photographer & Filmmaker based in Marrakesh. Editorial, fashion, travel. GQ Middle East · M Le Monde · Nataal.',
    images: ['/images/Slider/IMG_7246-Edit 1.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
