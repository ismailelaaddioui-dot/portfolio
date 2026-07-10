'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './page.module.css'

export default function Prints() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(`.${styles.reveal}`)
    if (!items) return
    gsap.fromTo(items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }
    )
  }, [])

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>
      <p className={`${styles.comingSoon} ${styles.reveal}`}>Prints coming soon.</p>
    </div>
  )
}
