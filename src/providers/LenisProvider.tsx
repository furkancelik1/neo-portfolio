import Lenis from '@studio-freight/lenis'
import { cancelFrame, frame, type FrameData } from 'framer-motion'
import { useEffect, useState, type ReactNode } from 'react'
import { LenisContext } from './lenisContext'

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      lerp: 0.09, // lower = floatier, higher = snappier
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    // Syncing React with an external, imperatively-created instance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance)

    // Drive Lenis from Framer Motion's frame loop so scroll position and every
    // scroll-linked animation update in the same frame (no 1-frame lag / jitter).
    const update = ({ timestamp }: FrameData) => instance.raf(timestamp)
    frame.update(update, true)

    return () => {
      cancelFrame(update)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
