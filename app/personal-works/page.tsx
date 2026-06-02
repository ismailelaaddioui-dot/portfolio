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
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Live DOM node for each photo's grid cell, so we can read its rect at any
  // time (open animates from it; close shrinks back to the *current* one).
  const cellRefs = useRef<(HTMLDivElement | null)[]>([])
  const animating = useRef(false)
  // Mirror of `lightbox` for use inside callbacks without stale closures.
  const currentRef = useRef<number | null>(null)
  useEffect(() => { currentRef.current = lightbox }, [lightbox])

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

  const stageTarget = () => {
    const padding = 32
    return {
      left: padding,
      top: padding,
      width: window.innerWidth - padding * 2,
      height: window.innerHeight - padding * 2,
    }
  }

  const open = useCallback((idx: number, rect: DOMRect) => {
    currentRef.current = idx
    setLightbox(idx)

    requestAnimationFrame(() => {
      const wrap = imgWrapRef.current
      const overlay = overlayRef.current
      const track = trackRef.current
      if (!wrap || !overlay || !track) return

      // Overlay (blurred backdrop) appears instantly — no crossfade.
      gsap.set(overlay, { autoAlpha: 1 })
      // Track jumps straight to the clicked slide (no slide-in on open).
      gsap.set(track, { xPercent: -idx * 100 })

      // Grow the stage from the thumbnail's position into the centered box.
      const t = stageTarget()
      gsap.set(wrap, { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      gsap.to(wrap, { ...t, duration: 0.8, ease: 'power3.inOut' })
    })
  }, [])

  const close = useCallback(() => {
    const wrap = imgWrapRef.current
    const overlay = overlayRef.current
    if (!wrap || !overlay) return

    // Shrink back to the *currently shown* image's grid cell.
    const cur = currentRef.current
    const rect = (cur !== null ? cellRefs.current[cur] : null)?.getBoundingClientRect() ?? null
    const t = stageTarget()

    // Mirror the open animation exactly: same geometry tween (power3.inOut,
    // 0.8s), and the backdrop disappears instantly at the end — no fade.
    gsap.to(wrap, {
      left: rect ? rect.left : t.left,
      top: rect ? rect.top : t.top,
      width: rect ? rect.width : t.width,
      height: rect ? rect.height : t.height,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0 })
        setLightbox(null)
      },
    })
  }, [])

  // Horizontal carousel slide to a given absolute index.
  const slideTo = useCallback((target: number) => {
    const track = trackRef.current
    if (!track || animating.current) return
    animating.current = true
    currentRef.current = target
    setLightbox(target)
    gsap.to(track, {
      xPercent: -target * 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => { animating.current = false },
    })
  }, [])

  const prev = useCallback(() => {
    const i = currentRef.current
    if (i === null) return
    slideTo((i - 1 + images.length) % images.length)
  }, [slideTo])
  const next = useCallback(() => {
    const i = currentRef.current
    if (i === null) return
    slideTo((i + 1) % images.length)
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
            ref={el => { cellRefs.current[idx] = el }}
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
            <div ref={trackRef} className={styles.lbTrack}>
              {images.map((im, i) => (
                <div key={i} className={styles.lbSlide}>
                  <Image src={im.src} alt="" fill className={styles.lbImg} sizes="90vw" priority={i === lightbox} />
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
