import { Badge } from './Badge'
import { RevealHeading } from './RevealHeading'

interface SectionHeaderProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ id, eyebrow, title, intro, align = 'center' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <header className={`mb-12 flex flex-col gap-4 lg:mb-16 ${alignment}`}>
      <Badge>{eyebrow}</Badge>
      <RevealHeading id={id} text={title} />
      {intro && <p className="max-w-prose text-lg text-ink-muted text-pretty">{intro}</p>}
    </header>
  )
}
