'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    { href: '/prints', label: 'Prints' },
    { href: '/publications', label: 'Publications' },
  ]

  return (
    <nav ref={navRef} className={styles.nav}>
      <Link href="/" data-nav-item className={`${styles.logo} ${styles.reveal}`}>
        <h1 className={styles.logoLatin}>Ismail El Aaddioui</h1>
        <span className={styles.logoArabic} lang="ar">
          إسماعيل العدوي
        </span>
      </Link>

      <div className={styles.navRow}>
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
      </div>

      <ul className={styles.socialList}>
        <li data-nav-item className={styles.reveal}>
          <a
            href="https://instagram.com/Ismailelaaddioui"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.navLink} nav-link`}
          >
            [ Instagram ]
          </a>
        </li>
        <li data-nav-item className={styles.reveal}>
          <a href="mailto:Ismailelaaddioui@gmail.com" className={`${styles.navLink} nav-link`}>
            [ Email ]
          </a>
        </li>
      </ul>
    </nav>
  )
}
