import type { Metadata } from 'next'

const description = 'A personal photography gallery by Ismail El Aaddioui — landscapes, architecture, and portraits shot across Morocco.'

export const metadata: Metadata = {
  title: 'Gallery',
  description,
  alternates: {
    canonical: '/personal-works',
  },
  openGraph: {
    title: 'Gallery — Ismail El Aaddioui',
    description,
    url: 'https://www.ismailelaaddioui.com/personal-works',
  },
  twitter: {
    title: 'Gallery — Ismail El Aaddioui',
    description,
  },
}

export default function PersonalWorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
