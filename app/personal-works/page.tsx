'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './page.module.css'

const images = [
  { src: '/images/DSCF1187 2.jpg', ratio: 4 / 5 },
  { src: '/images/Travel-51 1.jpg', ratio: 2 / 3 },
  { src: '/images/img-7 2.jpg', ratio: 1 / 1 },
  { src: '/images/Sidi-Black Suit-24 2.jpg', ratio: 2 / 3 },
  { src: '/images/DSCF1792 2.jpg', ratio: 4 / 5 },
  { src: '/images/SXZ-75 2.jpg', ratio: 3 / 4 },
  { src: '/images/LDT-54 2.jpg', ratio: 4 / 5 },
  { src: '/images/Sidi-Atelier-34 2.jpg', ratio: 3 / 4 },
  { src: '/images/img-10 2.jpg', ratio: 1 / 1 },
  { src: '/images/T-182 2.jpg', ratio: 4 / 5 },
  { src: '/images/Sidi-Grey Suit-24 2.jpg', ratio: 2 / 3 },
  { src: '/images/DSCF3835 2.jpg', ratio: 3 / 2 },
  { src: '/images/img-8 2.jpg', ratio: 4 / 5 },
  { src: '/images/Sidi-Black Suit-32 2.jpg', ratio: 2 / 3 },
  { src: '/images/LDT-40 1.jpg', ratio: 3 / 4 },
  { src: '/images/Sidi-Grey Suit-10 2.jpg', ratio: 4 / 5 },
  { src: '/images/SXZ-309 2.jpg', ratio: 2 / 3 },
  { src: '/images/img-19 2.jpg', ratio: 1 / 1 },
  { src: '/images/Sidi-Atelier-5 2.jpg', ratio: 4 / 5 },
  { src: '/images/DSCF3839 2.jpg', ratio: 3 / 4 },
  { src: '/images/LDT-26 2.jpg', ratio: 2 / 3 },
  { src: '/images/Sidi-Black Suit-25 2.jpg', ratio: 3 / 4 },
  { src: '/images/SXZ-337 2.jpg', ratio: 2 / 3 },
  { src: '/images/Sidi-Grey Suit-2 11.jpg', ratio: 4 / 5 },
]

const EMPTY_SLOTS = new Set([2, 5, 9, 13, 17, 20, 23, 27, 30])

function buildGrid() {
  const grid: (typeof images[0] | null)[] = []
  let imgIdx = 0, slot = 0
  while (imgIdx < images.length) {
    grid.push(EMPTY_SLOTS.has(slot) ? null : images[imgIdx++])
    slot++
  }
  return grid
}

const grid = buildGrid()

export default function PersonalWorks() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const originRect = useRef<DOMRect | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cells = containerRef.current?.querySelectorAll(`.${styles.cell}`)
    if (!cells) return
    gsap.fromTo(cells,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'expo.out',
        stagger: { amount: 1.2, from: 'start' },
      }
    )
  }, [])

  const open = useCallback((idx: number, rect: DOMRect) => {
    originRect.current = rect
    setLightbox(idx)

    requestAnimationFrame(() => {
      const wrap = imgWrapRef.current
      const overlay = overlayRef.current
      if (!wrap || !overlay) return

      const padding = 32
      const vw = window.innerWidth
      const vh = window.innerHeight
      const targetH = vh - padding * 2
      const targetW = vw - padding * 2
      const targetX = padding
      const targetY = padding

      gsap.set(wrap, { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      gsap.set(overlay, { autoAlpha: 0 })

      gsap.to(wrap, { left: targetX, top: targetY, width: targetW, height: targetH, duration: 1, ease: 'expo.out' })
      gsap.to(overlay, { autoAlpha: 1, duration: 1, ease: 'expo.out' })
    })
  }, [])

  const close = useCallback(() => {
    const wrap = imgWrapRef.current
    const overlay = overlayRef.current
    if (!wrap || !overlay) return
    const rect = originRect.current

    const padding = 32
    const vw = window.innerWidth
    const vh = window.innerHeight
    const targetH = vh - padding * 2
    const targetW = vw - padding * 2
    const targetX = padding
    const targetY = padding

    gsap.to(wrap, {
      left: rect ? rect.left : targetX,
      top: rect ? rect.top : targetY,
      width: rect ? rect.width : 0,
      height: rect ? rect.height : 0,
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => setLightbox(null),
    })
    gsap.to(overlay, { autoAlpha: 0, duration: 1, ease: 'expo.inOut' })
  }, [])

  const prev = useCallback(() => setLightbox(i => i !== null ? (i - 1 + images.length) % images.length : null), [])
  const next = useCallback(() => setLightbox(i => i !== null ? (i + 1) % images.length : null), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, prev, next])

  let photoIdx = -1

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>
      {grid.map((item, i) => {
        if (!item) return <div key={i} className={styles.emptyCell} />
        photoIdx++
        const idx = photoIdx
        return (
          <div
            key={i}
            className={styles.cell}
            style={{ paddingBottom: `${(1 / item.ratio) * 100}%` }}
            onClick={e => open(idx, (e.currentTarget as HTMLElement).getBoundingClientRect())}
          >
            <Image src={item.src} alt="" fill className={styles.image} sizes="(max-width: 768px) 50vw, 17vw" />
          </div>
        )
      })}

      {lightbox !== null && (
        <div ref={overlayRef} className={styles.lightbox} onClick={close}>
          <button className={styles.lbPrev} onClick={e => { e.stopPropagation(); prev() }}>‹</button>
          <div ref={imgWrapRef} className={styles.lbImgWrap} onClick={e => e.stopPropagation()}>
            <Image src={images[lightbox].src} alt="" fill className={styles.lbImg} sizes="90vw" priority />
          </div>
          <button className={styles.lbNext} onClick={e => { e.stopPropagation(); next() }}>›</button>
          <button className={styles.lbClose} onClick={close}>✕</button>
        </div>
      )}
    </div>
  )
}
