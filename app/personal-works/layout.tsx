import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personal Works',
  alternates: {
    canonical: '/personal-works',
  },
}

export default function PersonalWorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
