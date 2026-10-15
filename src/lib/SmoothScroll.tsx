import Lenis from 'lenis'
import { useEffect, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { gsap, ScrollTrigger } from './gsap'

/**
 * Lenis alimenta a ScrollTrigger y GSAP maneja el bucle de animación:
 *  - Lenis emite 'scroll' → ScrollTrigger.update
 *  - gsap.ticker llama a lenis.raf (autoRaf desactivado) → un solo rAF para todo
 *  - lagSmoothing(0) evita saltos al volver de una pestaña inactiva
 * Con reduced motion no se crea Lenis: se usa el scroll nativo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const root = document.documentElement
    // La clase scroll-smooth del <html> pelea con la inercia de Lenis.
    const hadSmooth = root.classList.contains('scroll-smooth')
    root.classList.remove('scroll-smooth')

    const lenis = new Lenis({ autoRaf: false, anchors: false })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Anclas internas: Lenis no hace preventDefault, así que se gestionan aquí (scroll-mt-16 compensa la navbar).
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || hash.length < 2 || !document.getElementById(hash.slice(1))) return
      event.preventDefault()
      lenis.scrollTo(hash)
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    // Las fuentes web cambian la altura de la página: recalcula los triggers.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      if (hadSmooth) root.classList.add('scroll-smooth')
    }
  }, [reduced])

  return children
}
