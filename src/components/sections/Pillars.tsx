import { motion } from 'framer-motion'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Section } from '../layout/Section'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'
import { TiltCard } from '../ui/TiltCard'

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
            <TiltCard className="h-full">
              <div className="flex flex-col gap-4">
                <Heading level={3}>{item.title}</Heading>
                <p className="text-ink-muted text-pretty">{item.description}</p>
              </div>
            </TiltCard>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
