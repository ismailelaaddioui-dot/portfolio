'use client'

import { useEffect, useRef } from 'react'
import styles from './HorizontalStrip.module.css'

const ASPECT = 4 / 5 // card width:height ratio (vertical)

const IMAGES = [
  '/images/Slider/IMG_7246-Edit 1.jpg',
  '/images/Slider/SXZ-337 3.jpg',
  '/images/Slider/Sidi-Black Suit-32 3.jpg',
  '/images/Slider/Sidi-Grey Suit-24 3.jpg',
  '/images/Slider/Travel-51 3.jpg',
  '/images/Slider/fuji-2 1.jpg',
  '/images/Slider/image 142.jpg',
  '/images/Slider/image 156.jpg',
  '/images/Slider/image 159.jpg',
  '/images/Slider/image 86.jpg',
  '/images/Slider/img-7 3.jpg',
  '/images/Slider/intersects 1.jpg',
]

// A fixed pool of recyclable card slots. Smaller cards on the right mean more
// of them fit across the screen, so we keep a generous pool to always cover it.
const POOL_SIZE = 40

export default function HorizontalStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const targetXRef = useRef(0)
  const renderedXRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // Lock the page to a single screen while the homepage slider is mounted.
    document.body.classList.add('no-scroll')

    const cards = Array.from(track.querySelectorAll<HTMLElement>(`.${styles.card}`))

    // Scale range: smallest on the right, biggest on the left.
    const MIN_SCALE = 0.35
    const MAX_SCALE = 1

    let baseSlotW = 0 // width of a full-size (scale 1) 4:5 card

    const computeLayout = () => {
      // A full-size card is a 4:5 vertical rectangle filling the section height.
      const slotH = section.clientHeight
      baseSlotW = slotH * ASPECT
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetXRef.current += e.deltaY * 0.5
    }

    // Scale as a function of horizontal screen position (0 = left edge,
    // 1 = right edge): big on the left, small on the right.
    const scaleAt = (frac: number) => {
      let f = frac
      if (f < 0) f = 0
      else if (f > 1) f = 1
      return MAX_SCALE + (MIN_SCALE - MAX_SCALE) * f
    }

    // Lay out a recycling window of cards, packed edge-to-edge with no gaps.
    //
    // `scroll` is a virtual position measured in base-width units: increasing it
    // moves content right-to-left. We map it to an integer "lead" image index
    // plus a fractional offset, then walk our pool of DOM cards left-to-right
    // across the screen, assigning each the next cyclic image. Because widths
    // depend on screen position (big left, small right), we accumulate real
    // pixel widths as we go. Cards that fall off either edge are parked, so the
    // same pool recycles forever — seamless loop, gap-free.
    const layoutFrame = () => {
      const vw = window.innerWidth
      const scroll = renderedXRef.current / baseSlotW // in card units

      // Index of the image whose left edge sits nearest the screen's left edge,
      // and how far past it we've scrolled (0..1 of a base width).
      const lead = Math.floor(scroll)
      const frac = scroll - lead

      // Start the first visible card slightly off the left edge so there's
      // never a gap on the left as we scroll.
      let x = -frac * baseSlotW * scaleAt(0)

      let pool = 0
      let imgIdx = lead
      while (x < vw && pool < cards.length) {
        const card = cards[pool]
        // Scale from this card's center.
        const provW = baseSlotW * scaleAt((x + baseSlotW / 2) / vw)
        const scale = scaleAt((x + provW / 2) / vw)
        const w = baseSlotW * scale

        const src = IMAGES[((imgIdx % IMAGES.length) + IMAGES.length) % IMAGES.length]
        const img = card.querySelector('img') as HTMLImageElement
        if (img && img.getAttribute('data-src-idx') !== String(imgIdx)) {
          img.src = src
          img.setAttribute('data-src-idx', String(imgIdx))
        }

        card.style.display = ''
        card.style.width = w + 'px'
        card.style.transform = `translateX(${x}px)`
        const inner = card.firstElementChild as HTMLElement
        if (inner) inner.style.height = scale * 100 + '%'

        x += w
        imgIdx++
        pool++
      }

      // Park any unused cards out of view.
      for (let i = pool; i < cards.length; i++) {
        cards[i].style.display = 'none'
      }
    }

    const tick = () => {
      renderedXRef.current += (targetXRef.current - renderedXRef.current) * 0.1
      layoutFrame()
      rafRef.current = requestAnimationFrame(tick)
    }

    computeLayout()
    const onResize = () => computeLayout()
    window.addEventListener('resize', onResize)

    section.addEventListener('wheel', onWheel, { passive: false })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div ref={sectionRef} className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        {Array.from({ length: POOL_SIZE }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.inner}>
              <img alt="" className={styles.img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
