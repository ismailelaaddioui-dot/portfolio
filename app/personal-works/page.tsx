'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './page.module.css'

const images = [
  { src: '/images/Archive/3od-2 4.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/IMG_4221 2.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-1.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-2.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-3.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-4.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-5.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-6.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-7.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-8.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-9.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/Ismail-El-Aaddioui-10.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/Ismail-El-Aaddioui-11.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-12.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-13.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/Ismail-El-Aaddioui-14.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-15.jpg', ratio: 3 / 2 },
  { src: '/images/Archive/Ismail-El-Aaddioui-16.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Nekhla 3.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/image 108.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/image 120.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 137.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 150.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/image 159.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 234.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/image 83.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/image 92.jpg', ratio: 1 / 1 },
  { src: '/images/Archive/image 93.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/image 96.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/inter23.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/inter24 1.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/intersects 4.jpg', ratio: 3 / 4 },
]

// Fisher–Yates shuffle (returns a new array, leaves the source untouched).
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Scatter empty cells through the grid: roughly one gap per `EMPTY_EVERY`
// slots, jittered so no two layouts line up. Never an empty in slot 0.
function buildEmptySlots(imageCount: number): Set<number> {
  const EMPTY_EVERY = 3
  const slots = new Set<number>()
  let slot = 2 + Math.floor(Math.random() * 2)
  // Leave room for `imageCount` real cells plus the gaps we insert.
  while (slot < imageCount + slots.size + 2) {
    slots.add(slot)
    slot += EMPTY_EVERY + Math.floor(Math.random() * 2) // 3–4 apart
  }
  return slots
}

// Shuffle order + gaps once at module load — stable across re-renders (so the
// lightbox/cell indices stay consistent), reshuffled on each full page load.
const shuffledImages = shuffle(images)

function buildGrid() {
  const emptySlots = buildEmptySlots(shuffledImages.length)
  const grid: (typeof images[0] | null)[] = []
  let imgIdx = 0, slot = 0
  while (imgIdx < shuffledImages.length) {
    grid.push(emptySlots.has(slot) ? null : shuffledImages[imgIdx++])
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
    slideTo((i - 1 + shuffledImages.length) % shuffledImages.length)
  }, [slideTo])
  const next = useCallback(() => {
    const i = currentRef.current
    if (i === null) return
    slideTo((i + 1) % shuffledImages.length)
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
              {shuffledImages.map((im, i) => (
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
