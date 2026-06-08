'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Navigation.module.css'

export default function Navigation() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  // Staggered entrance for the nav (logos + links), matching the page reveals.
  useEffect(() => {
    const items = navRef.current?.querySelectorAll(`.${styles.reveal}`)
    if (!items) return
    gsap.fromTo(items,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { amount: 0.5, from: 'start' },
      }
    )
  }, [])

  // Publish the nav's real rendered height so the homepage slider can size
  // itself to fill exactly the remaining viewport (calc(100vh - nav-height)).
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const setVar = () => {
      // Use the exact fractional height (rect), not offsetHeight, which rounds
      // to an integer and can leave a sub-pixel gap below the slider.
      document.documentElement.style.setProperty('--nav-height', nav.getBoundingClientRect().height + 'px')
    }
    setVar()
    const ro = new ResizeObserver(setVar)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [])

  const links = [
    { href: '/personal-works', label: 'Gallery' },
    { href: '/commissions', label: 'Commissions' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav ref={navRef} className={styles.nav}>
      <Link href="/" data-nav-item className={`${styles.logo} ${styles.reveal}`}>
        <Image
          src="/Assets/logo lt.svg"
          alt="Ismail El Aaddioui"
          width={176}
          height={66}
          className={styles.logoLatin}
          priority
        />
        <Image
          src="/Assets/logo ar.svg"
          alt="إسماعيل العديوي"
          width={176}
          height={66}
          className={styles.logoArabic}
          priority
        />
      </Link>

      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.href} data-nav-item className={styles.reveal}>
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
