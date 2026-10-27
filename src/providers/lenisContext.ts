import type Lenis from '@studio-freight/lenis'
import { createContext, useContext } from 'react'

export const LenisContext = createContext<Lenis | null>(null)

/** Access the Lenis instance (null when reduced motion is on or before mount). */
export function useLenis() {
  return useContext(LenisContext)
}

/** Smooth-scroll to an in-page anchor, falling back to native scrolling. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string) => {
    const el = document.querySelector<HTMLElement>(target)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -88 })
    else el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', target)
  }
}
