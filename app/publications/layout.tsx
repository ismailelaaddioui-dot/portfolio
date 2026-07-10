import type { Metadata } from 'next'

const description = 'Inter, a photozine by Ismail El Aaddioui produced by IZZA — 150 signed editions, 72 pages, published in 2024.'

export const metadata: Metadata = {
  title: 'Publications',
  description,
  alternates: {
    canonical: '/publications',
  },
  openGraph: {
    title: 'Publications — Ismail El Aaddioui',
    description,
    url: 'https://www.ismailelaaddioui.com/publications',
  },
  twitter: {
    title: 'Publications — Ismail El Aaddioui',
    description,
  },
}

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
