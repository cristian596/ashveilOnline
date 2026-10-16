import type { HTMLAttributes } from 'react'

type Tone = 'ember' | 'crystal'

const tones: Record<Tone, string> = {
  ember: 'border-ember-600/60 bg-ember-500/10 text-ember-300',
  crystal: 'border-crystal-600/60 bg-crystal-500/10 text-crystal-300',
}

/** Sobre la escena 3D o un póster el fondo translúcido no basta: una base oscura garantiza el contraste AA. */
const solidTones: Record<Tone, string> = {
  ember: 'border-ember-600/60 bg-canvas/80 text-ember-300 backdrop-blur-sm',
  crystal: 'border-crystal-600/60 bg-canvas/80 text-crystal-300 backdrop-blur-sm',
}

export function Badge({
  tone = 'ember',
  solid = false,
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; solid?: boolean }) {
  return (
    <span
      {...props}
      className={`inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-xs font-semibold tracking-widest uppercase ${(solid ? solidTones : tones)[tone]} ${className}`.trim()}
    />
  )
}
