import { Fragment, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Heading } from './Heading'

interface RevealHeadingProps {
  id?: string
  text: string
  level?: 2 | 3
  className?: string
}

/**
 * Titular que sube palabra a palabra desde detrás de una máscara al entrar en pantalla.
 *
 * - Lectores de pantalla: leen el texto completo de un `sr-only`; las palabras partidas van en un
 *   bloque `aria-hidden`.
 * - Sin JS, si falla la animación o con reduced motion: el texto se ve completo. El estado oculto y
 *   la máscara (overflow hidden) los pone GSAP al crear la animación y los quita al terminar.
 * - El padding vertical de cada máscara deja sitio a tildes y descendentes con leading ajustado; el
 *   margen negativo lo compensa para que el interlineado no cambie.
 */
export function RevealHeading({ id, text, level = 2, className }: RevealHeadingProps) {
  const reduced = usePrefersReducedMotion()
  const words = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      if (reduced) return
      const masks = gsap.utils.toArray<HTMLElement>('[data-reveal-mask]')
      gsap.set(masks, { overflow: 'hidden' })
      gsap.from('[data-reveal-word]', {
        yPercent: 115,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.07,
        scrollTrigger: { trigger: words.current, start: 'top 85%', once: true },
        onComplete: () => {
          gsap.set(masks, { clearProps: 'overflow' })
        },
      })
    },
    { scope: words, dependencies: [reduced, text], revertOnUpdate: true },
  )

  return (
    <Heading level={level} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={words} aria-hidden="true">
        {text.split(' ').map((word, index) => (
          <Fragment key={index}>
            {index > 0 && ' '}
            <span data-reveal-mask className="-my-[0.18em] inline-block py-[0.18em] align-bottom">
              <span data-reveal-word className="inline-block">
                {word}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </Heading>
  )
}
