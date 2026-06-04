'use client'

import styles from './page.module.css'
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

const commissionWorks = [
  {
    title: 'Khadija Ouarzaziya x Somnii',
    ratio: 1661 / 2214,
    images: [
      '/images/Khadija Ouarzaziya/KW-1.jpg',
      '/images/Khadija Ouarzaziya/KW-2.jpg',
      '/images/Khadija Ouarzaziya/KW-3.jpg',
      '/images/Khadija Ouarzaziya/KW-4.jpg',
      '/images/Khadija Ouarzaziya/KW-5.jpg',
      '/images/Khadija Ouarzaziya/KW-6.jpg',
      '/images/Khadija Ouarzaziya/KW-7.jpg',
      '/images/Khadija Ouarzaziya/KW-8.jpg',
      '/images/Khadija Ouarzaziya/KW-9.jpg',
      '/images/Khadija Ouarzaziya/KW-10.jpg',
      '/images/Khadija Ouarzaziya/KW-11.jpg',
      '/images/Khadija Ouarzaziya/KW-12.jpg',
      '/images/Khadija Ouarzaziya/KW-13.jpg',
      '/images/Khadija Ouarzaziya/KW-14.jpg',
      '/images/Khadija Ouarzaziya/KW-15.jpg',
    ],
  },
  {
    title: 'Moroccan Guides Travel',
    ratio: 1847 / 1477,
    images: [
      '/images/Moroccan Guides Travel/MGT-1.jpg',
      '/images/Moroccan Guides Travel/MGT-2.jpg',
      '/images/Moroccan Guides Travel/MGT-3.jpg',
      '/images/Moroccan Guides Travel/MGT-4.jpg',
      '/images/Moroccan Guides Travel/MGT-5.jpg',
      '/images/Moroccan Guides Travel/MGT-6.jpg',
      '/images/Moroccan Guides Travel/MGT-7.jpg',
      '/images/Moroccan Guides Travel/MGT-8.jpg',
      '/images/Moroccan Guides Travel/MGT-9.jpg',
      '/images/Moroccan Guides Travel/MGT-10.jpg',
      '/images/Moroccan Guides Travel/MGT-11.jpg',
      '/images/Moroccan Guides Travel/MGT-12.jpg',
      '/images/Moroccan Guides Travel/MGT-13.jpg',
      '/images/Moroccan Guides Travel/MGT-14.jpg',
      '/images/Moroccan Guides Travel/MGT-15.jpg',
      '/images/Moroccan Guides Travel/MGT-16.jpg',
      '/images/Moroccan Guides Travel/MGT-17.jpg',
      '/images/Moroccan Guides Travel/MGT-18.jpg',
      '/images/Moroccan Guides Travel/MGT-19.jpg',
      '/images/Moroccan Guides Travel/MGT-20.jpg',
      '/images/Moroccan Guides Travel/MGT-21.jpg',
      '/images/Moroccan Guides Travel/MGT-22.jpg',
      '/images/Moroccan Guides Travel/MGT-23.jpg',
      '/images/Moroccan Guides Travel/MGT-24.jpg',
      '/images/Moroccan Guides Travel/MGT-25.jpg',
      '/images/Moroccan Guides Travel/MGT-26.jpg',
      '/images/Moroccan Guides Travel/MGT-27.jpg',
      '/images/Moroccan Guides Travel/MGT-28.jpg',
      '/images/Moroccan Guides Travel/MGT-29.jpg',
    ],
  },
  {
    title: 'M Le Monde Magazine',
    ratio: 1920 / 1440,
    images: [
      '/images/M le Monde/M le Monde-1.jpg',
      '/images/M le Monde/M le Monde-2.jpg',
      '/images/M le Monde/M le Monde-3.jpg',
      '/images/M le Monde/M le Monde-4.jpg',
      '/images/M le Monde/M le Monde-5.jpg',
      '/images/M le Monde/M le Monde-6.jpg',
      '/images/M le Monde/M le Monde-7.jpg',
      '/images/M le Monde/M le Monde-8.jpg',
      '/images/M le Monde/M le Monde-9.jpg',
      '/images/M le Monde/M le Monde-10.jpg',
      '/images/M le Monde/M le Monde-11.jpg',
      '/images/M le Monde/M le Monde-12.jpg',
      '/images/M le Monde/M le Monde-13.jpg',
      '/images/M le Monde/M le Monde-14.jpg',
      '/images/M le Monde/M le Monde-15.jpg',
      '/images/M le Monde/M le Monde-16.jpg',
    ],
  },
  {
    title: 'Shop Travel',
    ratio: 1536 / 1920,
    images: [
      '/images/Travel/Travel-1.jpg',
      '/images/Travel/Travel-2.jpg',
      '/images/Travel/Travel-3.jpg',
      '/images/Travel/Travel-4.jpg',
      '/images/Travel/Travel-5.jpg',
      '/images/Travel/Travel-7.jpg',
      '/images/Travel/Travel-8.jpg',
      '/images/Travel/Travel-9.jpg',
      '/images/Travel/Travel-10.jpg',
      '/images/Travel/Travel-11.jpg',
      '/images/Travel/Travel-12.jpg',
      '/images/Travel/Travel-13.jpg',
      '/images/Travel/Travel-14.jpg',
    ],
  },
  {
    title: 'Sidi Tailoring',
    ratio: 1344 / 1075,
    images: [
      '/images/SIDI/DSCF3241 2.jpg',
      '/images/SIDI/DSCF3313 2.jpg',
      '/images/SIDI/Sidi-Beige Suit-50 2.jpg',
      '/images/SIDI/Sidi-Beige Suit-62 2.jpg',
      '/images/SIDI/Sidi-Black Suit-8 2.jpg',
      '/images/SIDI/Sidi-Black Suit-32 2.jpg',
      '/images/SIDI/Sidi-Black Suit-36 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-2 11.jpg',
      '/images/SIDI/Sidi-Grey Suit-10 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-12 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-16 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-24 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-39 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-41 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-43 2.jpg',
    ],
  },
  {
    title: 'Folks and Clans',
    ratio: 1670 / 1335,
    images: [
      '/images/Folks & Clans/F&C-1.jpg',
      '/images/Folks & Clans/F&C-2.jpg',
      '/images/Folks & Clans/F&C-3.jpg',
      '/images/Folks & Clans/F&C-4.jpg',
      '/images/Folks & Clans/F&C-5.jpg',
      '/images/Folks & Clans/F&C-6.jpg',
      '/images/Folks & Clans/F&C-7.jpg',
      '/images/Folks & Clans/F&C-8.jpg',
      '/images/Folks & Clans/F&C-9.jpg',
      '/images/Folks & Clans/F&C-10.jpg',
      '/images/Folks & Clans/F&C-11.jpg',
      '/images/Folks & Clans/F&C-12.jpg',
      '/images/Folks & Clans/F&C-13.jpg',
      '/images/Folks & Clans/F&C-14.jpg',
      '/images/Folks & Clans/F&C-15.jpg',
      '/images/Folks & Clans/F&C-16.jpg',
    ],
  },
]

export default function Commissions() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // Which project's lightbox is open (null = closed)
  const [openWork, setOpenWork] = useState<number | null>(null)
  // Index within that project's own images
  const [slide, setSlide] = useState(0)

  const overlayRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const previewRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRefs = useRef<(HTMLLIElement | null)[]>([])
  const animating = useRef(false)
  const openWorkRef = useRef<number | null>(null)
  const slideRef = useRef(0)
  useEffect(() => { openWorkRef.current = openWork }, [openWork])
  useEffect(() => { slideRef.current = slide }, [slide])

  const stageTarget = () => {
    const padding = 32
    return {
      left: padding,
      top: padding,
      width: window.innerWidth - padding * 2,
      height: window.innerHeight - padding * 2,
    }
  }

  // Stagger the titles upward (bottom → top), reverse on close.
  const animateTitles = (out: boolean) => {
    const els = titleRefs.current.filter(Boolean) as HTMLLIElement[]
    if (out) {
      gsap.to(els, {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: { each: 0.05, from: 'end' },
      })
    } else {
      gsap.to(els, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: { each: 0.05, from: 'start' },
      })
    }
  }

  const open = useCallback((workIdx: number) => {
    const previewEl = previewRefs.current[workIdx]
    const rect = previewEl
      ? previewEl.getBoundingClientRect()
      : { left: window.innerWidth / 2 - 100, top: window.innerHeight / 2 - 100, width: 200, height: 200 }

    openWorkRef.current = workIdx
    slideRef.current = 0
    setOpenWork(workIdx)
    setSlide(0)
    animateTitles(true)

    requestAnimationFrame(() => {
      const wrap = imgWrapRef.current
      const overlay = overlayRef.current
      const track = trackRef.current
      if (!wrap || !overlay || !track) return
      gsap.set(overlay, { autoAlpha: 1 })
      gsap.set(track, { xPercent: 0 })
      const t = stageTarget()
      gsap.set(wrap, { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      gsap.to(wrap, { ...t, duration: 0.8, ease: 'power3.inOut' })
    })
  }, [])

  const close = useCallback(() => {
    const wrap = imgWrapRef.current
    const overlay = overlayRef.current
    if (!wrap || !overlay) return

    const workIdx = openWorkRef.current
    const previewEl = workIdx !== null ? previewRefs.current[workIdx] : null
    const rect = previewEl?.getBoundingClientRect()
    const t = stageTarget()

    animateTitles(false)

    gsap.to(wrap, {
      left: rect ? rect.left : t.left,
      top: rect ? rect.top : t.top,
      width: rect ? rect.width : t.width,
      height: rect ? rect.height : t.height,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0 })
        setOpenWork(null)
      },
    })
  }, [])

  const slideTo = useCallback((target: number) => {
    const track = trackRef.current
    const workIdx = openWorkRef.current
    if (!track || workIdx === null || animating.current) return
    animating.current = true
    slideRef.current = target
    setSlide(target)
    gsap.to(track, {
      xPercent: -target * 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => { animating.current = false },
    })
  }, [])

  // Loop within the current project's own images.
  const prev = useCallback(() => {
    const workIdx = openWorkRef.current
    if (workIdx === null) return
    const len = commissionWorks[workIdx].images.length
    slideTo((slideRef.current - 1 + len) % len)
  }, [slideTo])

  const next = useCallback(() => {
    const workIdx = openWorkRef.current
    if (workIdx === null) return
    const len = commissionWorks[workIdx].images.length
    slideTo((slideRef.current + 1) % len)
  }, [slideTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, prev, next])

  return (
    <div className={`${styles.container} page-enter`}>
      <div className={styles.stage}>
        {/* Page-centered preview layer — sits behind all titles, blends with them */}
        {commissionWorks.map((work, wi) => (
          <div
            key={wi}
            ref={el => { previewRefs.current[wi] = el }}
            className={`${styles.preview} ${hoveredIndex === wi ? styles.previewVisible : ''}`}
            style={{ '--ratio': work.ratio } as React.CSSProperties}
          >
            <Image
              src={work.images[0]}
              alt={work.title}
              fill
              className={styles.previewImage}
              sizes="416px"
            />
          </div>
        ))}

        <ul className={styles.list}>
          {commissionWorks.map((work, wi) => {
            const isHovered = hoveredIndex === wi
            const anyHovered = hoveredIndex !== null
            return (
              <li
                key={wi}
                ref={el => { titleRefs.current[wi] = el }}
                className={`${styles.item} ${anyHovered && !isHovered ? styles.dimmed : ''}`}
                onMouseEnter={() => setHoveredIndex(wi)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => open(wi)}
              >
                <span className={`${styles.title} ${isHovered ? styles.inverting : ''}`}>{work.title}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {openWork !== null && (
        <div ref={overlayRef} className={styles.lightbox} onClick={close}>
          <button className={styles.lbPrev} onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <div ref={imgWrapRef} className={styles.lbImgWrap} onClick={e => e.stopPropagation()}>
            <div ref={trackRef} className={styles.lbTrack}>
              {commissionWorks[openWork].images.map((src, i) => (
                <div key={i} className={styles.lbSlide}>
                  <Image src={src} alt="" fill className={styles.lbImg} sizes="90vw" priority={i === slide} />
                </div>
              ))}
            </div>
          </div>
          <button className={styles.lbNext} onClick={e => { e.stopPropagation(); next() }}>›</button>
          <button className={styles.lbClose} onClick={close}>✕</button>
        </div>
      )}
    </div>
  )
}
