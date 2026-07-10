'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './page.module.css'

// Fixed shuffled order — randomized once and baked in, so the server-rendered
// HTML matches every client load and the layout stays stable.
const images = [
  { src: '/images/Archive/DSCF9030.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 96.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-2.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/3-Edit.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/DSCF7748.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 83.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-1.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-11.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/TRVL-23-5.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/8-Edit.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-15.jpg', ratio: 3 / 2 },
  { src: '/images/Archive/image 93.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-6.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/DSCF7891.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-8.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-12.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/image 92.jpg', ratio: 1 / 1 },
  { src: '/images/Archive/image 137.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 108.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/DSCF7842.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/IMG_4221 2.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/intersects 4.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/3od-2 4.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/DSCF1151.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-7.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-4.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-10.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/image 234.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Nekhla 3.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/image 150.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-13.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/Ismail-El-Aaddioui-5.jpg', ratio: 5 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-16.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/image 159.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/inter23.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/DSCF8974-2.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/Ismail-El-Aaddioui-3.jpg', ratio: 4 / 5 },
  { src: '/images/Archive/inter24 1.jpg', ratio: 3 / 4 },
  { src: '/images/Archive/Ismail-El-Aaddioui-9.jpg', ratio: 4 / 3 },
  { src: '/images/Archive/image 120.jpg', ratio: 4 / 5 },
]

export default function PersonalWorks() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  // Fixed order — identical on the server and every client load.
  const orderedImages = images
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

  // Masked reveal: each image stays perfectly still while a mask edge slides up
  // over it, uncovering it in place — one after another with a small gap. Sets
  // both the hidden start and the fully-visible end in JS (via clip-path) so
  // images are never left clipped if anything reorders mid-flight.
  const revealed = useRef(false)
  useEffect(() => {
    if (revealed.current) return
    const imgs = containerRef.current?.querySelectorAll(`.${styles.imageInner}`)
    if (!imgs?.length) return
    revealed.current = true
    gsap.fromTo(imgs,
      // Start: clipped to nothing (top edge sits at the bottom) → image hidden.
      { clipPath: 'inset(100% 0 0 0)' },
      {
        // End: no clip → image fully shown. The top edge wipes up to reveal it.
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08, // small timing gap between each image
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
      // +1 accounts for the leading clone at track position 0.
      gsap.set(track, { xPercent: -(idx + 1) * 100 })

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

  // The track has a clone of the last image prepended and the first appended,
  // so real image `i` lives at track position `i + 1`. Sliding into a clone
  // animates a single step, then we snap (no animation) to the matching real
  // slide — so last → first (and first → last) loops seamlessly in one step
  // instead of rewinding across every slide.
  const slideStep = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    if (!track || animating.current) return
    const len = orderedImages.length
    const i = currentRef.current
    if (i === null) return
    animating.current = true

    const fromPos = i + 1
    const toPos = fromPos + dir // may land on a clone (0 or len+1)
    const realTarget = (i + dir + len) % len

    currentRef.current = realTarget
    setLightbox(realTarget)

    gsap.to(track, {
      xPercent: -toPos * 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        // If we landed on a clone, jump instantly to its real twin.
        if (toPos !== realTarget + 1) {
          gsap.set(track, { xPercent: -(realTarget + 1) * 100 })
        }
        animating.current = false
      },
    })
  }, [orderedImages.length])

  const prev = useCallback(() => slideStep(-1), [slideStep])
  const next = useCallback(() => slideStep(1), [slideStep])

  // Lock page scroll while the lightbox is open (desktop + mobile).
  useEffect(() => {
    document.body.classList.toggle('no-scroll', lightbox !== null)
    return () => document.body.classList.remove('no-scroll')
  }, [lightbox])

  // Touch swipe to change image on mobile. Record the start point; on release,
  // a mostly-horizontal drag past the threshold advances one image.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    touchStart.current = { x: t.clientX, y: t.clientY }
  }, [])
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchStart.current
    if (!start) return
    touchStart.current = null
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    // Ignore taps and predominantly-vertical swipes.
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) next()
    else prev()
  }, [next, prev])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close, prev, next])

  // Trackpad horizontal swipe (two-finger) to change image on desktop. Wheel
  // events with horizontal delta drive one step per gesture; a cooldown gate
  // keeps a single swipe from flipping through several images.
  useEffect(() => {
    if (lightbox === null) return
    let cooling = false
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return // vertical → ignore
      e.preventDefault()
      if (cooling || Math.abs(e.deltaX) < 8) return
      cooling = true
      setTimeout(() => { cooling = false }, 500)
      if (e.deltaX > 0) next()
      else prev()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [lightbox, next, prev])

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>
      {orderedImages.map((item, idx) => (
        <div
          key={idx}
          ref={el => { cellRefs.current[idx] = el }}
          className={styles.cell}
          style={{ paddingBottom: `${(1 / item.ratio) * 100}%` }}
          onClick={e => open(idx, (e.currentTarget as HTMLElement).getBoundingClientRect())}
        >
          <div className={styles.imageInner}>
            <Image src={item.src} alt="" fill className={styles.image} sizes="(max-width: 768px) 50vw, 17vw" />
          </div>
        </div>
      ))}

      {lightbox !== null && (
        <div ref={overlayRef} className={styles.lightbox} onClick={close}>
          <button className={styles.lbPrev} onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">
            <Image src="/Assets/Left.svg" alt="" width={71} height={127} className={styles.lbArrowIcon} />
          </button>
          <div
            ref={imgWrapRef}
            className={styles.lbImgWrap}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div ref={trackRef} className={styles.lbTrack}>
              {/* Leading clone of the last image, then all real images, then a
                  trailing clone of the first — enables a seamless one-step loop. */}
              {[
                orderedImages[orderedImages.length - 1],
                ...orderedImages,
                orderedImages[0],
              ].map((im, i) => (
                <div key={i} className={styles.lbSlide}>
                  <Image src={im.src} alt="" fill className={styles.lbImg} sizes="90vw" priority={i === lightbox + 1} />
                </div>
              ))}
            </div>
          </div>
          <button className={styles.lbNext} onClick={e => { e.stopPropagation(); next() }} aria-label="Next">
            <Image src="/Assets/right.svg" alt="" width={71} height={127} className={styles.lbArrowIcon} />
          </button>
          <button className={styles.lbClose} onClick={close} aria-label="Close">
            <Image src="/Assets/close.svg" alt="" width={106} height={106} className={styles.lbCloseIcon} />
          </button>
        </div>
      )}
    </div>
  )
}
