import { motion } from 'framer-motion'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'
import { Heading } from '../ui/Heading'

export function FinalCta() {
  const { finalCta } = site
  const reduced = usePrefersReducedMotion()

  return (
    <Section id={finalCta.id} aria-labelledby="final-cta-title" className="scroll-mt-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-lg border border-ember-700/60 bg-surface px-6 py-20 text-center shadow-card sm:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-radial-[ellipse_70%_90%_at_50%_100%] from-ember-600/35 to-transparent"
        />
        <div className="mx-auto flex max-w-prose flex-col items-center gap-6">
          <Heading level={2} id="final-cta-title" className="text-5xl sm:text-6xl lg:text-7xl">
            {finalCta.title}
          </Heading>
          <p className="text-lg text-ink-muted text-pretty sm:text-xl">{finalCta.text}</p>
          <Button href={finalCta.cta.href} className="mt-2 px-10 py-4 text-base">
            {finalCta.cta.label}
          </Button>
        </div>
      </motion.div>
    </Section>
  )
}
