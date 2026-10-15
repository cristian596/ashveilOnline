import { motion } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Section } from '../layout/Section'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { SectionHeader } from '../ui/SectionHeader'

const format = new Intl.NumberFormat('es', { useGrouping: 'always' }).format

export function Community() {
  const { community } = site
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (reduced) return

      const counters = gsap.utils.toArray<HTMLElement>('[data-counter]')
      counters.forEach((el) => {
        const target = Number(el.dataset.counter)
        const state = { value: 0 }
        el.textContent = format(0)
        gsap.to(state, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(Math.round(state.value))
          },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      // Al revertir (cambio de reduced motion o desmontaje) se restaura el valor final.
      return () => {
        counters.forEach((el) => {
          el.textContent = format(Number(el.dataset.counter))
        })
      }
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true },
  )

  return (
    <Section ref={root} id={community.id} aria-labelledby="community-title" className="scroll-mt-16">
      <SectionHeader
        id="community-title"
        eyebrow={community.eyebrow}
        title={community.title}
        intro={community.intro}
      />

      <dl aria-label={community.statsLabel} className="mb-16 grid gap-10 text-center sm:grid-cols-3">
        {community.stats.map((stat) => (
          <div key={stat.id} className="flex flex-col-reverse gap-2">
            <dt className="text-sm font-semibold tracking-widest text-ink-muted uppercase">{stat.label}</dt>
            <dd className="font-display text-6xl font-bold text-ember-400 lining-nums tabular-nums lg:text-7xl">
              <span aria-hidden="true" data-counter={stat.value}>
                {format(stat.value)}
              </span>
              <span className="sr-only">{format(stat.value)}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul aria-label={community.testimonialsLabel} className="grid gap-6 lg:grid-cols-3">
        {community.testimonials.map((item, index) => (
          <motion.li
            key={item.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="flex h-full flex-col gap-6">
              {item.isExample && (
                <Badge tone="crystal" className="self-start">
                  {community.exampleBadge}
                </Badge>
              )}
              <figure className="flex flex-1 flex-col justify-between gap-6">
                <blockquote className="text-lg text-ink text-pretty">“{item.quote}”</blockquote>
                <figcaption className="flex flex-col">
                  <span className="font-semibold text-ink">{item.author}</span>
                  <span className="text-sm text-ink-muted">{item.role}</span>
                </figcaption>
              </figure>
            </Card>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-ink-muted">{community.exampleNote}</p>
    </Section>
  )
}
