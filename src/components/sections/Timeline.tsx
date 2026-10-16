import { useRef } from 'react'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Section } from '../layout/Section'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'

export function Timeline() {
  const { timeline } = site
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return

      // La línea se dibuja a medida que se avanza por la lista.
      gsap.fromTo(
        '[data-timeline-line]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline-list]', start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-timeline-item]').forEach((item) => {
        const dot = item.querySelector('[data-timeline-dot]')
        const body = item.querySelector('[data-timeline-body]')
        const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 70%', once: true } })
        tl.from(dot, { scale: 0, duration: 0.4, ease: 'back.out(2)' }).from(
          body,
          { autoAlpha: 0, x: 32, duration: 0.7, ease: 'power3.out' },
          '<0.1',
        )
      })
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    // overflow-x-clip: los hitos entran desde la derecha (x: 32) y en móvil sobresaldrían del viewport.
    <Section ref={root} aria-labelledby="timeline-title" className="overflow-x-clip">
      <SectionHeader id="timeline-title" eyebrow={timeline.eyebrow} title={timeline.title} />
      <ol
        data-timeline-list
        aria-label={timeline.listLabel}
        className="relative mx-auto flex max-w-prose flex-col gap-12 pl-10"
      >
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.4375rem] w-0.5 bg-line" />
        <span
          aria-hidden="true"
          data-timeline-line
          className="absolute top-2 bottom-2 left-[0.4375rem] w-0.5 origin-top bg-linear-to-b from-ember-400 to-ember-600"
        />
        {timeline.items.map((item) => (
          <li key={item.id} data-timeline-item className="relative">
            <span
              aria-hidden="true"
              data-timeline-dot
              className="absolute top-2 -left-10 size-4 rounded-pill border-2 border-ember-400 bg-canvas"
            />
            <div data-timeline-body className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-widest text-crystal-300 uppercase">{item.date}</p>
              <Heading level={3}>{item.title}</Heading>
              <p className="text-ink-muted text-pretty">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
