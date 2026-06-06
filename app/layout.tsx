import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ismailelaaddioui.com'),
  title: 'Ismail El Aaddioui — Photographer',
  description: 'Photography portfolio of Ismail El Aaddioui',
  openGraph: {
    title: 'Ismail El Aaddioui — Photographer',
    description: 'Photography portfolio of Ismail El Aaddioui',
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
    description: 'Photography portfolio of Ismail El Aaddioui',
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
