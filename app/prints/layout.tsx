import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prints',
  alternates: {
    canonical: '/prints',
  },
}

export default function PrintsLayout({ children }: { children: React.ReactNode }) {
  return children
}
