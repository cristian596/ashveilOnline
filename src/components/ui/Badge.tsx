import type { HTMLAttributes } from 'react'

type Tone = 'ember' | 'crystal'

const tones: Record<Tone, string> = {
  ember: 'border-ember-600/60 bg-ember-500/10 text-ember-300',
  crystal: 'border-crystal-600/60 bg-crystal-500/10 text-crystal-300',
}

export function Badge({
  tone = 'ember',
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      {...props}
      className={`inline-flex items-center gap-2 rounded-pill border px-3 py-1 text-xs font-semibold tracking-widest uppercase ${tones[tone]} ${className}`.trim()}
    />
  )
}
