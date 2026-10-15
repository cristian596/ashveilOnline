import { useRef, useState, type KeyboardEvent } from 'react'
import { site } from '../../config/site'
import { Section } from '../layout/Section'
import { Heading } from '../ui/Heading'
import { SectionHeader } from '../ui/SectionHeader'
import { focusRing } from '../ui/styles'

export function Faq() {
  const { faq } = site
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set())
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })

  // Enter y Espacio ya los gestiona <button>; las flechas mueven el foco entre preguntas.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = faq.items.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowDown':
        next = index === last ? 0 : index + 1
        break
      case 'ArrowUp':
        next = index === 0 ? last : index - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    event.preventDefault()
    buttons.current[next]?.focus()
  }

  return (
    <Section aria-labelledby="faq-title">
      <div className="mx-auto max-w-prose">
        <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <ul className="flex flex-col gap-3">
          {faq.items.map((item, index) => {
            const expanded = open.has(item.id)
            return (
              <li key={item.id} className="rounded-lg border border-line bg-surface-raised">
                <Heading level={3} className="font-sans text-base leading-normal tracking-normal sm:text-lg">
                  <button
                    ref={(el) => {
                      buttons.current[index] = el
                    }}
                    type="button"
                    id={`faq-btn-${item.id}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-6 py-5 text-left font-semibold ${focusRing}`}
                  >
                    {item.question}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-2xl leading-none text-ember-400 transition-transform duration-(--duration-base) motion-reduce:transition-none ${
                        expanded ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </Heading>
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  inert={!expanded}
                  className={`grid transition-[grid-template-rows] duration-(--duration-base) ease-out-expo motion-reduce:transition-none ${
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-ink-muted text-pretty">{item.answer}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
