import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Publications',
  alternates: {
    canonical: '/publications',
  },
}

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children
}
