import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commissions',
  alternates: {
    canonical: '/commissions',
  },
}

export default function CommissionLayout({ children }: { children: React.ReactNode }) {
  return children
}
