import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navigation from './components/Navigation'
import ImageProtection from './components/ImageProtection'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ismailelaaddioui.com'),
  title: {
    default: 'Ismail El Aaddioui — Photographer & Filmmaker, Marrakesh',
    template: '%s — Ismail El Aaddioui',
  },
  description: 'Photographer & Filmmaker based in Marrakesh. Editorial, fashion, travel. GQ Middle East · M Le Monde · Nataal.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ismail El Aaddioui — Photographer & Filmmaker, Marrakesh',
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
    title: 'Ismail El Aaddioui — Photographer & Filmmaker, Marrakesh',
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M5KN7DFWCN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M5KN7DFWCN');
          `}
        </Script>
      </head>
      <body>
        <ImageProtection />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
