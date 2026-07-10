'use client'

import { useEffect } from 'react'

export default function ImageProtection() {
  useEffect(() => {
    const blockOnImages = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockOnImages)
    document.addEventListener('dragstart', blockOnImages)

    return () => {
      document.removeEventListener('contextmenu', blockOnImages)
      document.removeEventListener('dragstart', blockOnImages)
    }
  }, [])

  return null
}
