import type { Metadata } from 'next'

const description = 'Fine art prints by photographer Ismail El Aaddioui, based in Marrakesh, Morocco.'

export const metadata: Metadata = {
  title: 'Prints',
  description,
  alternates: {
    canonical: '/prints',
  },
  openGraph: {
    title: 'Prints — Ismail El Aaddioui',
    description,
    url: 'https://www.ismailelaaddioui.com/prints',
  },
  twitter: {
    title: 'Prints — Ismail El Aaddioui',
    description,
  },
}

export default function PrintsLayout({ children }: { children: React.ReactNode }) {
  return children
}
