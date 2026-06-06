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
          sizes="30vw"
          priority
        />
      </div>

      <div className={`${styles.section} ${styles.reveal}`}>
        <p className={styles.label}>Artist Photographer, Based in Marrakech</p>
        <p className={styles.bioText}>
          Ismail El Aaddioui (b. 2001, Ouled Teima) is a photographer and graphic designer based in Marrakech, Morocco. Working outside conventional academic routes, he honed his craft through experience and hands-on exploration, seeking out recurring patterns and weaving them into visually compelling stories.
        </p>
        <p className={styles.bioText}>
          His work captures the essence of human connections, the dynamics of family and lineage, and the subtle interplay between light, form, and environment. Whether photographing landscapes, architecture, or people, he uses minimalism as a foundation to craft images that balance intimacy with precision. Central to his practice is a deep engagement with his immediate surroundings — the shifting light across surfaces, the quiet geometry of structures, and the organic textures of natural forms.
        </p>
        <p className={styles.bioText}>
          His practice spans editorial and commercial photography, analog and digital image-making, film developing, print production, and visual identity design — bringing a consistent compositional intelligence across every medium. He has collaborated with Boiler Room, Soursoup, M Le Monde Magazine, Nataal, and GQ Middle East, and has been exhibited at Fez Art Lab, Lblassa Art Space, and Izza House of Friends. In 2024, he published his debut photozine Inter with Izza House of Friends.
        </p>
      </div>

      <div className={`${styles.section} ${styles.reveal}`}>
        <p className={styles.label}>Clients &amp; Collaborators</p>
        <p className={styles.bioText}>
          M Le Monde · GQ Middle East · Nataal · Boiler Room · Soursoup · Moroccan Guides Travel ·<br />
          Artists For Morocco · Somnii Production · Touda Ecolodge · Izza House Of Friends · Oasis Festival ·<br />
          I came for couscous
        </p>
      </div>

      <div className={`${styles.contactRow} ${styles.reveal}`}>
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
