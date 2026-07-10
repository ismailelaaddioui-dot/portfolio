'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './HorizontalStrip.module.css'

const ASPECT = 4 / 5 // card width:height ratio (vertical)

const IMAGES = [
  '/images/Slider/IMG_7246-Edit 1.jpg',
  '/images/Slider/SXZ-337 3.jpg',
  '/images/Slider/Sidi-Black Suit-32 3.jpg',
  '/images/Slider/image 142.jpg',
  '/images/Slider/Sidi-Grey Suit-24 3.jpg',
  '/images/Slider/image 156.jpg',
  '/images/Slider/Travel-51 3.jpg',
  '/images/Slider/image 159.jpg',
  '/images/Slider/intersects 1.jpg',
  '/images/Slider/fuji-2 1.jpg',
  '/images/Slider/image 86.jpg',
  '/images/Slider/img-7 3.jpg',
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

    // Preload + decode every image once up front. Swapping an <img>'s src to a
    // not-yet-decoded image leaves a blank/old frame for a frame or two, which
    // reads as a flicker as a card recycles into view. Once every source is
    // decoded in cache, assigning src is effectively instant and the flash is gone.
    const decoded = new Set<string>()
    const decodePromises = IMAGES.map((src) => {
      const pre = new Image()
      pre.src = src
      const markReady = () => decoded.add(src)
      return pre.decode
        ? pre.decode().then(markReady).catch(markReady)
        : new Promise<void>((resolve) => { pre.onload = () => { markReady(); resolve() } })
    })

    // Scale range: smallest on the right, biggest on the left.
    const MIN_SCALE = 0.35
    const MAX_SCALE = 1

    // On narrow (touch) viewports we drop the perspective effect so every card
    // is the same, normal size and the strip simply slides with a finger.
    const MOBILE_BREAKPOINT = 768
    let isMobile = false

    let baseSlotW = 0 // width of a full-size (scale 1) 4:5 card

    const computeLayout = () => {
      isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      // A full-size card is a 4:5 vertical rectangle filling the section height.
      const slotH = section.clientHeight
      baseSlotW = slotH * ASPECT
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetXRef.current += e.deltaY * 0.5
    }

    // Touch dragging: track the last X and move the strip by the delta, so the
    // content follows the finger. Dragging left (finger moves left) advances
    // forward, matching the wheel direction.
    let lastTouchX = 0
    let touchStartX = 0
    const onTouchStart = (e: TouchEvent) => {
      lastTouchX = e.touches[0].clientX
      touchStartX = e.touches[0].clientX
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const x = e.touches[0].clientX
      targetXRef.current += (lastTouchX - x) * 1.2
      lastTouchX = x
    }
    // On mobile, snap to a full image per swipe: a swipe with enough travel
    // advances exactly one card in its direction; a small drag settles back to
    // the current card. The eased tick() then animates to the snapped target.
    const onTouchEnd = (e: TouchEvent) => {
      if (!isMobile) return
      const totalDx = e.changedTouches[0].clientX - touchStartX
      const SWIPE_THRESHOLD = 40 // px of travel to count as a directional swipe
      const current = Math.round(targetXRef.current / baseSlotW)
      let snapped = current
      if (totalDx <= -SWIPE_THRESHOLD) snapped = Math.ceil(targetXRef.current / baseSlotW)
      else if (totalDx >= SWIPE_THRESHOLD) snapped = Math.floor(targetXRef.current / baseSlotW)
      targetXRef.current = snapped * baseSlotW
    }

    // Scale as a function of horizontal screen position (0 = left edge,
    // 1 = right edge): big on the left, small on the right.
    const scaleAt = (frac: number) => {
      if (isMobile) return MAX_SCALE // uniform, normal-size cards on mobile
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
        // Only swap once the new source is fully decoded; otherwise keep showing
        // the current frame so the card never flashes blank as it slides in.
        if (
          img &&
          img.getAttribute('data-src-idx') !== String(imgIdx) &&
          decoded.has(src)
        ) {
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

    // Load-in: the strip starts scrolled behind its resting position (content
    // shifted right) and eases forward to it — read as sliding right-to-left
    // into place — while each visible card's image unmasks bottom-to-top on
    // top of that motion. Both read as one continuous settle rather than two
    // separate animations. Every card image starts CSS-clipped (see .img), so
    // nothing flashes unstyled before this runs — we just wait for the
    // initially-visible images to finish decoding, assign them, then reveal.
    //
    // The horizontal settle itself is driven by a GSAP tween on targetXRef
    // (tick()'s lerp then trails it), timed to keep drifting for about 1s
    // after the mask reveal finishes, instead of snapping to rest early.
    const introStart = { x: -baseSlotW * 2.5 }
    renderedXRef.current = introStart.x
    targetXRef.current = introStart.x

    const REVEAL_DURATION = 1.1 // seconds, matches the mask reveal below
    const EXTRA_DRIFT = 1 // seconds of continued sliding after everything else settles

    gsap.to(introStart, {
      x: 0,
      duration: REVEAL_DURATION + EXTRA_DRIFT,
      ease: 'power2.out',
      onUpdate: () => { targetXRef.current = introStart.x },
    })

    Promise.all(decodePromises).then(() => {
      layoutFrame()
      // Reveal every pooled card, not just the ones on-screen at this exact
      // instant — the strip keeps drifting for a while after this (see
      // EXTRA_DRIFT above), so cards still off-screen now will slide into
      // view shortly after. Each is a persistent DOM node reused across
      // recycles, so it only ever needs unmasking once; excluding the
      // not-yet-visible ones left them permanently clipped once they later
      // scrolled in — the "smallest image on the right loads after" bug.
      const allImgs = cards
        .map((card) => card.querySelector('img'))
        .filter((img): img is HTMLImageElement => !!img)
      // Order the stagger left-to-right by each card's current on-screen
      // position, so the reveal still reads as sweeping across the row.
      const orderedImgs = allImgs.slice().sort((a, b) => {
        const ax = a.closest(`.${styles.card}`) as HTMLElement | null
        const bx = b.closest(`.${styles.card}`) as HTMLElement | null
        const aLeft = ax ? parseFloat(ax.style.transform.replace(/[^0-9.-]/g, '')) || 0 : 0
        const bLeft = bx ? parseFloat(bx.style.transform.replace(/[^0-9.-]/g, '')) || 0 : 0
        return aLeft - bLeft
      })
      gsap.fromTo(orderedImgs,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: REVEAL_DURATION,
          ease: 'power3.out',
          stagger: { amount: 0.4, from: 'start' },
        }
      )
      // Let the nav (mounted separately in layout) know the strip is revealing,
      // so both entrances play in lockstep instead of the nav firing early.
      window.dispatchEvent(new CustomEvent('strip:ready'))
    })

    section.addEventListener('wheel', onWheel, { passive: false })
    section.addEventListener('touchstart', onTouchStart, { passive: false })
    section.addEventListener('touchmove', onTouchMove, { passive: false })
    section.addEventListener('touchend', onTouchEnd, { passive: false })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('wheel', onWheel)
      section.removeEventListener('touchstart', onTouchStart)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
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
