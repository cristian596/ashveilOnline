import type { ComponentType, SVGProps } from 'react'

type EmblemProps = SVGProps<SVGSVGElement>

// Sigilos decorativos: trazo en currentColor y un acento con tokens de @theme.
const base = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
} as const

const accent = { stroke: 'var(--color-crystal-400)' } as const
const spark = { stroke: 'var(--color-ember-400)' } as const

// Guardacenizas: escudo con cruz y anillo interior.
function Guardacenizas(props: EmblemProps) {
  return (
    <svg {...base} {...props}>
      <path d="M32 6 55 14v16c0 14-9 24-23 28C18 54 9 44 9 30V14z" />
      <path d="M32 14 47 19v11c0 9-6 16-15 19-9-3-15-10-15-19V19z" opacity=".6" />
      <path d="M32 22v22M23 31h18" {...accent} />
      <circle cx="32" cy="31" r="4" {...accent} />
    </svg>
  )
}

// Tejevelos: velo de hilos entrelazados con aguja central.
function Tejevelos(props: EmblemProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="32" cy="32" r="25" />
      <path d="M32 7c-9 8-9 42 0 50M32 7c9 8 9 42 0 50" opacity=".6" />
      <path d="M7 32c8-9 42-9 50 0M7 32c8 9 42 9 50 0" opacity=".6" />
      <path d="M32 18 46 32 32 46 18 32z" {...accent} />
      <circle cx="32" cy="32" r="2.5" {...accent} />
    </svg>
  )
}

// Portabrasas: llama dentro de un anillo de chispas.
function Portabrasas(props: EmblemProps) {
  return (
    <svg {...base} {...props}>
      <path d="M32 6v6M32 52v6M6 32h6M52 32h6M13.6 13.6l4.2 4.2M46.2 46.2l4.2 4.2M13.6 50.4l4.2-4.2M46.2 17.8l4.2-4.2" opacity=".6" />
      <path d="M32 16c2 7 9 11 9 20a9 9 0 0 1-18 0c0-4 2-6 4-8 0 3 1 5 3 5 0-6-1-11 2-17z" />
      <path d="M32 40c-2 0-3 1.5-3 3.5a3 3 0 0 0 6 0c0-2-1-3.5-3-3.5z" {...spark} />
    </svg>
  )
}

// Acechador: daga vertical sobre un ojo entornado.
function Acechador(props: EmblemProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 32c8-12 18-18 28-18s20 6 28 18c-8 12-18 18-28 18S12 44 4 32z" opacity=".6" />
      <path d="M32 6 36 38H28zM26 38h12M32 38v14M29 52h6" />
      <circle cx="32" cy="32" r="3" {...accent} />
      <path d="M20 32h5M39 32h5" {...accent} />
    </svg>
  )
}

const classEmblems: Record<string, ComponentType<EmblemProps>> = {
  guardacenizas: Guardacenizas,
  tejevelos: Tejevelos,
  portabrasas: Portabrasas,
  acechador: Acechador,
}

// Emblema de la clase `id`; no pinta nada si el id no tiene sigilo.
export function ClassEmblem({ id, ...props }: EmblemProps & { id: string }) {
  const Emblem = classEmblems[id]
  return Emblem ? <Emblem {...props} /> : null
}
