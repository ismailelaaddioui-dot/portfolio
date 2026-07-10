import type { Metadata } from 'next'

const description = 'Editorial and commercial commissions by Ismail El Aaddioui, including work for GQ Middle East, M Le Monde, Moroccan Guides Travel, and Sidi Tailoring.'

export const metadata: Metadata = {
  title: 'Commissions',
  description,
  alternates: {
    canonical: '/commissions',
  },
  openGraph: {
    title: 'Commissions — Ismail El Aaddioui',
    description,
    url: 'https://www.ismailelaaddioui.com/commissions',
  },
  twitter: {
    title: 'Commissions — Ismail El Aaddioui',
    description,
  },
}

export default function CommissionLayout({ children }: { children: React.ReactNode }) {
  return children
}
