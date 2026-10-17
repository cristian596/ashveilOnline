import { Badge } from './Badge'
import { RevealHeading } from './RevealHeading'

interface SectionHeaderProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  /** Alinea a la izquierda desde lg sin tocar el móvil. */
  lgStart?: boolean
}

export function SectionHeader({ id, eyebrow, title, intro, align = 'center', lgStart = false }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <header className={`mb-12 flex flex-col gap-4 lg:mb-16 ${alignment} ${lgStart ? 'lg:items-start lg:text-left' : ''}`.trim()}>
      <Badge>{eyebrow}</Badge>
      <RevealHeading id={id} text={title} />
      {intro && <p className="max-w-prose text-lg text-ink-muted text-pretty">{intro}</p>}
    </header>
  )
}
