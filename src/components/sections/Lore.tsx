import { useRef } from 'react'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Container } from '../layout/Container'
import { SectionHeader } from '../ui/SectionHeader'

export function Lore() {
  const { lore } = site
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced) return

      // Parallax: el fondo se desplaza más despacio que el contenido.
      gsap.fromTo(
        backdrop.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      // Cada bloque aparece al llegar a la parte baja de la pantalla.
      gsap.utils.toArray<HTMLElement>('[data-lore-block]').forEach((block) => {
        gsap.from(block, {
          autoAlpha: 0,
          y: 48,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: block, start: 'top 85%', once: true },
        })
      })
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <section
      ref={root}
      id={lore.id}
      aria-labelledby="lore-title"
      className="relative isolate scroll-mt-16 overflow-hidden py-section lg:py-section-lg"
    >
      <div
        ref={backdrop}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-24 inset-x-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_20%_30%,color-mix(in_oklab,var(--color-ember-700)_35%,transparent),transparent),radial-gradient(ellipse_50%_40%_at_85%_75%,color-mix(in_oklab,var(--color-crystal-600)_22%,transparent),transparent)]"
      />
      <Container>
        <div className="lg:grid lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div className="lg:flex lg:flex-col lg:gap-8 lg:[&>header]:mb-0">
            <SectionHeader id="lore-title" eyebrow={lore.eyebrow} title={lore.title} lgStart />
            <p
              data-lore-block
              className="mx-auto mb-10 max-w-prose font-display text-3xl leading-snug text-pretty text-ink sm:text-4xl lg:mx-0 lg:mb-0 lg:max-w-none lg:text-3xl"
            >
              {lore.paragraphs[0]}
            </p>
          </div>
          <div className="mx-auto flex max-w-prose flex-col gap-10 lg:mx-0 lg:max-w-none">
            {lore.paragraphs.slice(1).map((text) => (
              <p key={text} data-lore-block className="text-lg leading-relaxed text-pretty text-ink-muted">
                {text}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
