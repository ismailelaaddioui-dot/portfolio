import type { Metadata } from 'next'

const description = 'Ismail El Aaddioui (b. 2001) is a self-taught photographer and filmmaker based in Marrakesh, Morocco, whose work has appeared in GQ Middle East, M Le Monde, and Nataal.'

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Ismail El Aaddioui',
    description,
    url: 'https://www.ismailelaaddioui.com/about',
  },
  twitter: {
    title: 'About — Ismail El Aaddioui',
    description,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
