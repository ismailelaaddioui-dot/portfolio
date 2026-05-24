'use client'

import styles from './page.module.css'
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'

const commissionWorks = [
  {
    images: ['/images/DSCF1187 2.jpg', '/images/DSCF1792 2.jpg', '/images/DSCF3835 2.jpg', '/images/DSCF3839 2.jpg'],
    title: 'Khadija Ouarzaziya x Somnii',
  },
  {
    images: ['/images/SXZ-309 2.jpg', '/images/SXZ-337 2.jpg', '/images/SXZ-75 2.jpg'],
    title: 'Moroccan Guides Travel',
  },
  {
    images: ['/images/LDT-26 2.jpg', '/images/LDT-40 1.jpg', '/images/LDT-54 2.jpg'],
    title: 'M Le Monde Magazine',
  },
  {
    images: ['/images/Sidi-Black Suit-24 2.jpg', '/images/Sidi-Black Suit-25 2.jpg', '/images/Sidi-Black Suit-32 2.jpg', '/images/Travel-51 1.jpg', '/images/T-182 2.jpg'],
    title: 'Shop Travel',
  },
  {
    images: ['/images/Sidi-Grey Suit-10 2.jpg', '/images/Sidi-Grey Suit-2 11.jpg', '/images/Sidi-Grey Suit-24 2.jpg', '/images/Sidi-Atelier-34 2.jpg', '/images/Sidi-Atelier-5 2.jpg'],
    title: 'Sidi Tailoring',
  },
  {
    images: ['/images/img-7 2.jpg', '/images/img-8 2.jpg', '/images/img-10 2.jpg', '/images/img-19 2.jpg'],
    title: 'Folks and Clans',
  },
]

export default function Commissions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const [closing, setClosing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const openProject = (index: number) => {
    setSlideIndex(0)
    setOpenIndex(index)
    setClosing(false)
  }

  const closeProject = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setOpenIndex(null)
      setClosing(false)
    }, 500)
  }, [])

  const handleSliderClick = (e: React.MouseEvent) => {
    if (openIndex === null) return
    const images = commissionWorks[openIndex].images
    if (images.length <= 1) return
    const isRight = e.clientX > window.innerWidth / 2
    setSlideIndex(prev => isRight
      ? (prev + 1) % images.length
      : (prev - 1 + images.length) % images.length
    )
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeProject])

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>
      {/* List view */}
      <div className={`${styles.listLayout} ${openIndex !== null ? styles.listHidden : ''}`}>
        <ul className={styles.list}>
          {commissionWorks.map((work, index) => (
            <li
              key={index}
              className={`${styles.item} ${hoveredIndex !== null && hoveredIndex !== index ? styles.dimmed : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openProject(index)}
            >
              <span className={styles.title}>{work.title}</span>
            </li>
          ))}
        </ul>

        <div className={styles.previewArea}>
          {hoveredIndex !== null && (
            <div className={styles.preview}>
              <Image
                src={commissionWorks[hoveredIndex].images[0]}
                alt={commissionWorks[hoveredIndex].title}
                fill
                className={styles.previewImage}
                sizes="380px"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen slider */}
      {openIndex !== null && (
        <div
          className={`${styles.slider} ${closing ? styles.sliderClosing : styles.sliderOpen}`}
          onClick={handleSliderClick}
        >
          <button className={styles.closeBtn} onClick={(e) => { e.stopPropagation(); closeProject() }}>
            ✕
          </button>

          {commissionWorks[openIndex].images.map((src, i) => (
            <div
              key={src}
              className={`${styles.slide} ${i === slideIndex ? styles.slideActive : ''}`}
            >
              <Image
                src={src}
                alt={`${commissionWorks[openIndex].title} ${i + 1}`}
                fill
                className={styles.slideImage}
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}

          {commissionWorks[openIndex].images.length > 1 && (
            <div className={styles.dots}>
              {commissionWorks[openIndex].images.map((_, i) => (
                <span key={i} className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ''}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
