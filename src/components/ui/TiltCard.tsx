import { useRef, type PointerEvent, type ReactNode } from 'react'
import { FINE_POINTER, useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap, useGSAP } from '../../lib/gsap'
import { Card } from './Card'

/** Inclinación máxima en grados, en cada eje. */
const MAX_TILT = 8

type QuickTo = ReturnType<typeof gsap.quickTo>

interface TiltCardProps {
  className?: string
  children: ReactNode
}

/**
 * Card que se inclina hacia el cursor (rotateX / rotateY, ±8°) con un brillo ámbar que lo sigue.
 * Solo con puntero fino y sin reduced motion; en otro caso es una Card normal, sin brillo.
 */
export function TiltCard({ className = '', children }: TiltCardProps) {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery(FINE_POINTER)
  const enabled = finePointer && !reduced
  const card = useRef<HTMLDivElement>(null)
  const tilt = useRef<{ x: QuickTo; y: QuickTo } | null>(null)

  useGSAP(
    () => {
      if (!enabled || !card.current) return
      gsap.set(card.current, { transformPerspective: 900 })
      tilt.current = {
        x: gsap.quickTo(card.current, 'rotationX', { duration: 0.5, ease: 'power3.out' }),
        y: gsap.quickTo(card.current, 'rotationY', { duration: 0.5, ease: 'power3.out' }),
      }
      // Al revertir (desmontaje o cambio de puntero / reduced motion) la card vuelve a 0°.
      return () => {
        tilt.current = null
      }
    },
    { dependencies: [enabled], revertOnUpdate: true },
  )

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!tilt.current || event.pointerType === 'touch') return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // Posición del brillo en --x / --y; el degradado lo pinta Tailwind.
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    tilt.current.y((x / rect.width - 0.5) * 2 * MAX_TILT)
    tilt.current.x(-(y / rect.height - 0.5) * 2 * MAX_TILT)
  }

  const onPointerLeave = () => {
    tilt.current?.x(0)
    tilt.current?.y(0)
  }

  return (
    <Card
      ref={card}
      onPointerMove={enabled ? onPointerMove : undefined}
      onPointerLeave={enabled ? onPointerLeave : undefined}
      className={`group relative overflow-hidden transition-colors duration-(--duration-base) hover:border-ember-600/60 motion-reduce:transition-none ${className}`}
    >
      {enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 bg-[radial-gradient(260px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--color-ember-500)_24%,transparent),transparent_70%)]"
        />
      )}
      <div className="relative">{children}</div>
    </Card>
  )
}
