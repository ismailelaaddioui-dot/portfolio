'use client'

import styles from './page.module.css'
import Image from 'next/image'
import { useState, useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'

const commissionWorks = [
  {
    title: 'Khadija Ouarzaziya x Somnii',
    // Cover is KW-1 (1661x2215).
    ratio: 1661 / 2215,
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
      '/images/M le Monde/M le Monde-17.jpg',
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
    // Cover is Sidi-Grey Suit-16 (darkest, 1032x1289) for a brighter
    // difference-blend title.
    ratio: 1032 / 1289,
    images: [
      '/images/SIDI/Sidi-Grey Suit-16 2.jpg',
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
      '/images/SIDI/Sidi-Grey Suit-24 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-39 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-41 2.jpg',
      '/images/SIDI/Sidi-Grey Suit-43 2.jpg',
    ],
  },
  {
    title: 'Folks and Clans',
    // Cover is F&C-6 (portrait, 1336x1670).
    ratio: 1336 / 1670,
    images: [
      '/images/Folks & Clans/F&C-6.jpg',
      '/images/Folks & Clans/F&C-1.jpg',
      '/images/Folks & Clans/F&C-2.jpg',
      '/images/Folks & Clans/F&C-3.jpg',
      '/images/Folks & Clans/F&C-4.jpg',
      '/images/Folks & Clans/F&C-5.jpg',
      '/images/Folks & Clans/F&C-7.jpg',
      '/images/Folks & Clans/F&C-8.jpg',
      '/images/Folks & Clans/F&C-9.jpg',
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

  // Decode every cover image up front. Without this, the first hover decodes
  // the cover mid-fade, which janks; subsequent hovers are smooth because the
  // image is cached. Pre-decoding makes the very first hover smooth too.
  useEffect(() => {
    commissionWorks.forEach((work) => {
      const img = new window.Image()
      img.src = work.images[0]
      img.decode?.().catch(() => {})
    })
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

  // Titles + nav/logos animate as ONE group. DOM order is nav (top of page)
  // then titles (below); for a unified bottom → top rise the titles lead and
  // the nav comes in last. Same set fans out top → bottom on open.
  const groupEls = () => {
    const titles = titleRefs.current.filter(Boolean) as HTMLElement[]
    const nav = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-item]'))
    // Ordered bottom → top: titles (lower on the page) first, nav (top) last.
    // With stagger from: 'start' this plays as one continuous upward sweep.
    return [...titles, ...nav]
  }

  // On open: stagger the titles + nav up and out (bottom → top sweep). On close
  // they aren't animated back — the closing image mask simply uncovers them in
  // place (see close()).
  const animateTitlesOut = () => {
    const els = groupEls()
    if (!els.length) return
    gsap.to(els, {
      yPercent: -120,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      // Array is bottom → top; 'start' sweeps from the bottom title upward.
      stagger: { each: 0.05, from: 'start' },
    })
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
    animateTitlesOut()

    requestAnimationFrame(() => {
      const wrap = imgWrapRef.current
      const overlay = overlayRef.current
      const track = trackRef.current
      if (!wrap || !overlay || !track) return
      gsap.set(overlay, { autoAlpha: 1 })
      // Opens at slide 0, which sits at track position 1 (after the leading clone).
      gsap.set(track, { xPercent: -100 })
      const t = stageTarget()
      gsap.set(wrap, { left: rect.left, top: rect.top, width: rect.width, height: rect.height })
      gsap.to(wrap, { ...t, duration: 0.8, ease: 'power3.inOut' })
    })
  }, [])

  const close = useCallback(() => {
    const wrap = imgWrapRef.current
    const overlay = overlayRef.current
    const track = trackRef.current
    if (!wrap || !overlay || !track) return

    // Titles + nav are already in their final resting state underneath — the
    // closing mask simply uncovers them, so put them there instantly (no
    // stagger-in). opacity:1 is exactly 1 → no stacking context, so the titles'
    // mix-blend-mode keeps working.
    const els = groupEls()
    gsap.set(els, { opacity: 1, clearProps: 'transform' })

    // Pin the track to the wrap's current pixel size so the image holds still
    // while the wrap (overflow: hidden) collapses over it like a closing mask.
    const r = wrap.getBoundingClientRect()
    gsap.set(track, { width: r.width, height: r.height })

    // Fade the blurred backdrop out alongside the mask wipe.
    gsap.to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.inOut' })

    // Mask closes bottom → top: top edge holds, bottom edge rises to meet it,
    // wiping the still image away upward and revealing the titles/nav beneath.
    gsap.to(wrap, {
      height: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0, clearProps: 'opacity' })
        gsap.set(track, { clearProps: 'width,height' })
        setOpenWork(null)
      },
    })
  }, [])

  // The track has a clone of the last image prepended and the first appended,
  // so real slide `i` lives at track position `i + 1`. Sliding into a clone
  // animates a single step, then we snap (no animation) to the matching real
  // slide — so last → first (and first → last) loops seamlessly in one step
  // instead of rewinding across every slide.
  const slideStep = useCallback((dir: 1 | -1) => {
    const track = trackRef.current
    const workIdx = openWorkRef.current
    if (!track || workIdx === null || animating.current) return
    const len = commissionWorks[workIdx].images.length
    const cur = slideRef.current
    animating.current = true

    const fromPos = cur + 1
    const toPos = fromPos + dir // may land on a clone (0 or len+1)
    const realTarget = (cur + dir + len) % len

    slideRef.current = realTarget
    setSlide(realTarget)

    gsap.to(track, {
      xPercent: -toPos * 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        if (toPos !== realTarget + 1) {
          gsap.set(track, { xPercent: -(realTarget + 1) * 100 })
        }
        animating.current = false
      },
    })
  }, [])

  // Loop within the current project's own images.
  const prev = useCallback(() => slideStep(-1), [slideStep])
  const next = useCallback(() => slideStep(1), [slideStep])

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
                <span className={`${styles.title} ${isHovered ? styles.titleHovered : ''}`}>{work.title}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {openWork !== null && (
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
                commissionWorks[openWork].images[commissionWorks[openWork].images.length - 1],
                ...commissionWorks[openWork].images,
                commissionWorks[openWork].images[0],
              ].map((src, i) => (
                <div key={i} className={styles.lbSlide}>
                  <Image src={src} alt="" fill className={styles.lbImg} sizes="90vw" priority={i === slide + 1} />
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
