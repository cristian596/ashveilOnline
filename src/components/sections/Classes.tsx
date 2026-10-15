import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type KeyboardEvent } from 'react'
import { site } from '../../config/site'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Section } from '../layout/Section'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'
import { focusRing } from '../ui/styles'

export function Classes() {
  const { classes } = site
  const reduced = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState<string>(classes.items[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const active = classes.items.find((item) => item.id === activeId) ?? classes.items[0]

  const select = (id: string) => {
    setActiveId(id)
    tabRefs.current[id]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const ids: string[] = classes.items.map((item) => item.id)
    const current = ids.indexOf(activeId)
    let next: number
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (current + 1) % ids.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (current - 1 + ids.length) % ids.length
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = ids.length - 1
        break
      default:
        return
    }
    event.preventDefault()
    select(ids[next])
  }

  return (
    <Section id={classes.id} aria-labelledby="classes-title" className="scroll-mt-16">
      <SectionHeader id="classes-title" eyebrow={classes.eyebrow} title={classes.title} intro={classes.intro} />

      <div
        role="tablist"
        aria-label={classes.tablistLabel}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="mb-8 flex flex-wrap justify-center gap-3"
      >
        {classes.items.map((item) => {
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el
              }}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={selected ? 'classes-panel' : undefined}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={`cursor-pointer rounded-md border px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-(--duration-base) motion-reduce:transition-none ${focusRing} ${
                selected
                  ? 'border-ember-500 bg-ember-500/10 text-ember-300'
                  : 'border-line text-ink-muted hover:border-ash-600 hover:text-ink'
              }`}
            >
              {item.name}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id="classes-panel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className={`mx-auto max-w-prose rounded-lg border border-line bg-surface-raised p-8 text-center shadow-card sm:p-12 ${focusRing}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xs font-semibold tracking-widest text-crystal-300 uppercase">
              {classes.roleLabel}: {active.role}
            </p>
            <Heading level={3}>{active.name}</Heading>
            <blockquote className="font-display text-2xl text-ink-muted italic text-pretty sm:text-3xl">
              “{active.phrase}”
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
