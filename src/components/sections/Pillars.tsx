import { motion } from 'framer-motion'
import type { PointerEvent } from 'react'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Section } from '../layout/Section'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'

/** Guarda la posición del cursor en --x / --y; el halo lo pinta Tailwind. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--y', `${event.clientY - rect.top}px`)
}

export function Pillars() {
  const { pillars } = site
  const reduced = usePrefersReducedMotion()

  return (
    <Section aria-labelledby="pillars-title">
      <SectionHeader id="pillars-title" eyebrow={pillars.eyebrow} title={pillars.title} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.items.map((item, index) => (
          <motion.li
            key={item.id}
            initial={reduced ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card
              onPointerMove={trackPointer}
              className="group relative h-full overflow-hidden transition-colors duration-(--duration-base) hover:border-ember-600/60 motion-reduce:transition-none"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 motion-reduce:transition-none bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--color-ember-500)_22%,transparent),transparent_70%)]"
              />
              <div className="relative flex flex-col gap-4">
                <Heading level={3}>{item.title}</Heading>
                <p className="text-ink-muted text-pretty">{item.description}</p>
              </div>
            </Card>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
