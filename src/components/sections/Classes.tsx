import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type KeyboardEvent } from 'react'
import { site } from '../../config/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ClassEmblem } from '../icons/ClassEmblems'
import { Section }from '../layout/Section'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'
import { focusRing } from '../ui/styles'

// Mismo punto de corte que el prefijo lg: de Tailwind (64rem).
const DESKTOP = '(min-width: 64rem)'

export function Classes() {
  const { classes } = site
  const reduced = usePrefersReducedMotion()
  const vertical = useMediaQuery(DESKTOP)
  const [activeId, setActiveId] = useState<string>(classes.items[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const active = classes.items.find((item) => item.id === activeId) ?? classes.items[0]

  const select =(id: string) => {
    setActiveId(id)
    tabRefs.current[id]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const ids: string[] = classes.items.map((item) => item.id)
    const current = ids.indexOf(activeId)
    let next: number
    switch (event.key) {
      case 'ArrowRight':
        if (vertical) return
        next = (current + 1) % ids.length
        break
      case 'ArrowDown':
        next = (current + 1) % ids.length
        break
      case 'ArrowLeft':
        if (vertical) return
        next = (current - 1 + ids.length) % ids.length
        break
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

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-12">
      <div
        role="tablist"
        aria-label={classes.tablistLabel}
        aria-orientation={vertical ? 'vertical' : 'horizontal'}
        onKeyDown={onKeyDown}
        className="mb-8 flex flex-wrap justify-center gap-3 lg:mb-0 lg:flex-col lg:flex-nowrap lg:justify-start"
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
              className={`cursor-pointer rounded-md border px-5 py-3 text-sm lg:text-left font-semibold tracking-wide uppercase transition-colors duration-(--duration-base) motion-reduce:transition-none ${focusRing} ${
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
        className={`mx-auto max-w-prose rounded-lg border border-line bg-surface-raised p-8 text-center shadow-card sm:p-12 lg:mx-0 lg:max-w-none lg:text-left ${focusRing}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="flex flex-col items-center gap-4 lg:items-start"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3 }}
            >
              <ClassEmblem id={active.id} className="size-12 text-ember-300 opacity-80 lg:size-16" />
            </motion.div>
            <p className="text-xs font-semibold tracking-widest text-crystal-300 uppercase">
              {classes.roleLabel}: {active.role}
            </p>
            <Heading level={3}>{active.name}</Heading>
            <blockquote className="font-display text-2xl text-ink-muted italic text-pretty sm:text-3xl lg:text-4xl">
              “{active.phrase}”
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </Section>
  )
}
