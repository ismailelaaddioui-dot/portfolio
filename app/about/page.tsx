'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './page.module.css'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)

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
        stagger: { amount: 0.9, from: 'start' },
      }
    )
  }, [])

  return (
    <div ref={containerRef} className={`${styles.container} page-enter`}>

      <div className={`${styles.portraitWrapper} ${styles.reveal}`}>
        <Image
          src="/images/Ismail Elaaddioui portrait.jpg"
          alt="Ismail El Aaddioui"
          fill
          className={styles.portrait}
          sizes="45vw"
          priority
        />
      </div>

      <div className={`${styles.content} ${styles.reveal}`}>
        <div className={styles.section}>
          <p className={styles.bioText}>
            <strong>
              Ismail El Aaddioui (b. 2001, Ouled Teima) is a photographer based in Marrakesh, Morocco.
            </strong>
          </p>
          <p className={styles.bioText}>
            His work has appeared in GQ Middle East, M Le Monde, and Nataal, and he has collaborated with Boiler Room, Oasis Festival, and brands across Europe and North Africa. He has been exhibited at Fez Art Lab, Lblassa Art Space, IF Marrakech, and Izza House of Friends, where he published his photozine Inter in 2024. He is co-founder of Artists For Morocco.
          </p>
          <p className={styles.bioText}>
            Self-taught and working outside conventional academic routes, he develops his practice through direct engagement with his surroundings and shifting light, quiet geometry, and human connections. Whether photographing landscapes, architecture, or people, his work lives in the interplay between light, form, and environment, finding meaning in the familiar and the overlooked.
          </p>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Clients &amp; Collaborators</p>
          <p className={styles.bioText}>
            M Le Monde · GQ Middle East · Nataal · Boiler Room · Soursoup ·{' '}
            <a
              href="https://moroccanguides.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Moroccan Guides Travel
            </a>
            <br />
            Artists For Morocco ·{' '}
            <a
              href="https://somniicultr.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Somnii Cultr
            </a>{' '}
            ·{' '}
            <a
              href="https://touda.fr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Touda Ecolodge
            </a>{' '}
            · Oasis Festival · I came for couscous
          </p>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Email</p>
          <a href="mailto:Ismailelaaddioui@gmail.com" className={styles.contactLink}>
            Ismailelaaddioui@gmail.com
          </a>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Instagram</p>
          <a
            href="https://instagram.com/Ismailelaaddioui"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            @Ismailelaaddioui
          </a>
        </div>
      </div>

    </div>
  )
}
