'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './page.module.css'

const slides = [
  { type: 'video' as const, src: '/images/Photozine/Inter-video.mp4' },
  { type: 'image' as const, src: '/images/Photozine/book-scan-file_01.jpg' },
  { type: 'image' as const, src: '/images/Photozine/book-scan-file_02.jpg' },
  { type: 'image' as const, src: '/images/Photozine/book-scan-file_03.jpg' },
  { type: 'image' as const, src: '/images/Photozine/book-scan-file_04.jpg' },
  { type: 'image' as const, src: '/images/Photozine/book-scan-file_05.jpg' },
]

export default function Publications() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(`.${styles.reveal}`)
    if (!items) return
    gsap.fromTo(items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { amount: 0.5, from: 'start' },
      }
    )
  }, [])

  // Lock page scroll — the slider is the only thing that scrolls here.
  useEffect(() => {
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [])

  // Vertical scroll/wheel anywhere over the slider pans it horizontally.
  // Only hijack when the gesture is predominantly vertical — horizontal
  // trackpad swipes pass straight through to the native scroll, so panning
  // never feels laggy or fights the browser's own momentum scrolling.
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      slider.scrollLeft += e.deltaY
    }
    slider.addEventListener('wheel', onWheel, { passive: false })
    return () => slider.removeEventListener('wheel', onWheel)
  }, [])

  // Clicking the far left/right edge of the slider advances to the
  // previous/next slide instead of just panning.
  const onSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = sliderRef.current
    if (!slider) return
    const rect = slider.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const edge = Math.min(160, rect.width * 0.15)
    let dir: 1 | -1 | null = null
    if (clickX < edge) dir = -1
    else if (clickX > rect.width - edge) dir = 1
    if (!dir) return

    const slideEls = Array.from(slider.children) as HTMLElement[]
    const center = slider.scrollLeft + slider.clientWidth / 2
    const currentIndex = slideEls.findIndex(
      (el) => el.offsetLeft <= center && el.offsetLeft + el.offsetWidth >= center
    )
    const targetIndex = Math.min(
      Math.max((currentIndex === -1 ? 0 : currentIndex) + dir, 0),
      slideEls.length - 1
    )
    slider.scrollTo({ left: slideEls[targetIndex].offsetLeft, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>
      <div
        ref={sliderRef}
        className={`${styles.slider} ${styles.reveal}`}
        onClick={onSliderClick}
      >
        {slides.map((slide, i) => (
          <div key={i} className={styles.slide}>
            {slide.type === 'video' ? (
              <video
                className={styles.slideMedia}
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.slideMedia} src={slide.src} alt="" draggable={false} />
            )}
          </div>
        ))}
      </div>

      <div className={`${styles.info} ${styles.reveal}`}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Inter</h1>
          <p className={styles.producedBy}>
            Produced by <strong>IZZA</strong>
          </p>

          <p className={styles.details}>
            160mm x 230mm | 150 Signed Editions,
            <br />
            72 pages
          </p>
        </div>

        <div className={styles.description}>
          <p>
            This project delves into the duality of being, exploring my inner self while
            transcending physical form. It reflects how I navigate a universe where every
            action, emotion, and thought is interconnected and resonates.
          </p>
          <p>
            These images are created, not taken, deliberately composed to bring a sense of
            relief—like the quiet satisfaction of perfectly folded clothes.
          </p>
        </div>

        <div className={styles.links}>
          <a
            href="mailto:Ismailelaaddioui@gmail.com?subject=Photozine"
            className={styles.orderLink}
          >
            [ Order a copy ]
          </a>
        </div>
      </div>
    </div>
  )
}
