'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HorizontalStrip.module.css'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { src: '/images/DSCF1187 2.jpg', alt: 'Photo 1' },
  { src: '/images/Sidi-Black Suit-24 2.jpg', alt: 'Photo 2' },
  { src: '/images/LDT-54 2.jpg', alt: 'Photo 3' },
  { src: '/images/Sidi-Atelier-34 2.jpg', alt: 'Photo 4' },
  { src: '/images/Sidi-Grey Suit-24 2.jpg', alt: 'Photo 5' },
  { src: '/images/DSCF1792 2.jpg', alt: 'Photo 6' },
  { src: '/images/Travel-51 1.jpg', alt: 'Photo 7' },
  { src: '/images/T-182 2.jpg', alt: 'Photo 8' },
  { src: '/images/DSCF3835 2.jpg', alt: 'Photo 9' },
  { src: '/images/SXZ-75 2.jpg', alt: 'Photo 10' },
  { src: '/images/LDT-40 1.jpg', alt: 'Photo 11' },
  { src: '/images/Sidi-Black Suit-32 2.jpg', alt: 'Photo 12' },
]

// Duplicate for seamless loop
const LOOPED = [...IMAGES, ...IMAGES]

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

    const getOneSetWidth = () => track.scrollWidth / 2

    const cards = Array.from(track.querySelectorAll<HTMLElement>(`.${styles.card}`))

    const getTargetHeight = (card: HTMLElement) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const minH = vh * 0.10
      const maxH = vh * 0.70
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const t = Math.min(1, Math.max(0, 1 - (cardCenter - vw * 0.5) / (vw * 0.5)))
      return minH + (maxH - minH) * t
    }

    const updateScales = () => {
      cards.forEach((card) => {
        gsap.set(card, { height: getTargetHeight(card) })
      })
    }

    const tick = () => {
      const oneSetWidth = getOneSetWidth()
      renderedXRef.current += (targetXRef.current - renderedXRef.current) * 0.03

      if (renderedXRef.current >= oneSetWidth) {
        renderedXRef.current -= oneSetWidth
        targetXRef.current -= oneSetWidth
      }
      if (renderedXRef.current < 0) {
        renderedXRef.current += oneSetWidth
        targetXRef.current += oneSetWidth
      }

      gsap.set(track, { x: -renderedXRef.current })
      updateScales()
      rafRef.current = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetXRef.current += e.deltaY * 0.35
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=5000',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetXRef.current += self.getVelocity() * 0.0015
      },
    })

    // Intro: cards start at height 0 and rise to their natural position
    gsap.set(cards, { height: 0 })
    gsap.to(cards, {
      height: (i, card) => getTargetHeight(card),
      duration: 1.4,
      ease: 'power3.out',
      stagger: {
        each: 0.08,
        from: 'center',
      },
      onComplete: () => {
        section.addEventListener('wheel', onWheel, { passive: false })
        rafRef.current = requestAnimationFrame(tick)
      },
    })

    return () => {
      st.kill()
      cancelAnimationFrame(rafRef.current)
      section.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div ref={sectionRef} className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        {LOOPED.map((img, i) => (
          <div key={i} className={styles.card}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              className={styles.img}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
