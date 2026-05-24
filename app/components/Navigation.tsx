'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import styles from './Navigation.module.css'

export default function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: '/personal-works', label: 'Gallery' },
    { href: '/commission', label: 'Commissions' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/Assets/logo.png"
          alt="Ismail El Aaddioui"
          width={176}
          height={66}
          className={styles.logoImg}
          priority
        />
      </Link>

      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${styles.navLink} nav-link ${pathname === link.href ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
