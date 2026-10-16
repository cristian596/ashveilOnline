import { useRef } from 'react'
import { site } from '../../config/site'
import { MOBILE, useMediaQuery } from '../../hooks/useMediaQuery'
import { useNearViewport } from '../../hooks/useNearViewport'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Container } from '../layout/Container'
import { HeroBackdrop } from '../three/HeroBackdrop'
import { Badge } from '../ui/Badge'
import { Heading } from '../ui/Heading'
import { RevealHeading } from '../ui/RevealHeading'

/**
 * «La travesía»: un escenario sticky de una pantalla con la escena del hero detrás y los textos
 * pasando por encima, una pantalla cada uno. Mientras el escenario está fijado, el scroll mueve la
 * cámara por la trayectoria de three/cameraPath.ts.
 *
 * En móvil, gama baja, sin WebGL o con reduced motion: el póster estático y los mismos textos.
 */
export function Journey() {
  const { journey } = site
  const reduced = usePrefersReducedMotion()
  const mobile = useMediaQuery(MOBILE)
  const root = useRef<HTMLElement>(null)
  // Lo escribe ScrollTrigger y lo lee la escena en cada frame: un ref, para no re-renderizar.
  const progress = useRef(0)
  // El canvas se monta cuando la sección está a una pantalla de distancia, y ya no se desmonta.
  const near = useNearViewport(root)
  const live = !reduced && !mobile

  useGSAP(
    () => {
      if (reduced) return

      if (live) {
        // De «top top» a «bottom bottom» es justo el tramo en el que el escenario está fijado.
        gsap.to(progress, {
          current: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
      }

      gsap.utils.toArray<HTMLElement>('[data-journey-step]').forEach((step) => {
        gsap.from(step, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 80%', once: true },
        })
      })
    },
    { scope: root, dependencies: [reduced, live], revertOnUpdate: true },
  )

  return (
    <section
      ref={root}
      id={journey.id}
      aria-labelledby="journey-title"
      data-cursor="crystal"
      className="relative scroll-mt-16"
    >
      {/* Escenario: fijado mientras se recorre la sección. Sin overflow-hidden en la section, o sticky deja de funcionar. */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroBackdrop cameraPath={progress} allowLive={live && near} poster="journey" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-[ellipse_80%_75%_at_50%_45%] from-transparent from-45% to-canvas"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-canvas to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-canvas via-canvas/85 to-transparent"
        />
      </div>

      {/* Textos: suben sobre el escenario (margen negativo de una pantalla) y marcan cada tramo. */}
      <Container className="relative mt-[-100svh]">
        {/* Móvil/tablet: texto centrado con un degradado radial detrás. En escritorio (lg) el bloque pasa
            a la izquierda, fuera del altar, sobre un degradado que cubre ese lado a todo el ancho de la pantalla. */}
        <header className="relative isolate flex min-h-svh flex-col items-center justify-center gap-4 bg-radial-[ellipse_85%_38%_at_50%_52%] from-canvas/92 from-30% to-transparent text-center lg:items-start lg:bg-none lg:pr-[56%] lg:text-left">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 bg-radial-[ellipse_48%_46%_at_24%_52%] from-canvas/90 from-35% to-transparent lg:block"
          />
          <Badge solid>{journey.eyebrow}</Badge>
          <RevealHeading
            id="journey-title"
            text={journey.title}
            className="drop-shadow-[0_2px_24px_var(--color-canvas)]"
          />
          <p className="max-w-prose text-lg text-ink-muted text-pretty drop-shadow-[0_1px_12px_var(--color-canvas)]">
            {journey.intro}
          </p>
        </header>

        <ol aria-label={journey.stepsLabel}>
          {journey.steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex min-h-svh items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <article
                data-journey-step
                className="flex max-w-md flex-col gap-3 rounded-lg border border-line bg-canvas/90 p-8 shadow-card"
              >
                <p aria-hidden="true" className="font-display text-2xl font-bold text-crystal-300">
                  {step.marker}
                </p>
                <Heading level={3}>{step.title}</Heading>
                <p className="text-ink-muted text-pretty">{step.text}</p>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
