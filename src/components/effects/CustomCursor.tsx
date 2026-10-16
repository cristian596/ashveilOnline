import { useEffect, useRef } from 'react'
import { FINE_POINTER, useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap } from '../../lib/gsap'

/** Sobre estos elementos el halo se agranda. Todos conservan su cursor nativo. */
const INTERACTIVE = 'a[href], button, [role="button"], [role="tab"], summary, label, input, select, textarea'

/** Rapidez del seguimiento: más alto, más pegado al cursor. Independiente del framerate. */
const FOLLOW = 14

type CursorState = 'idle' | 'interactive' | 'crystal'

function stateFor(target: EventTarget | null): CursorState {
  if (!(target instanceof Element)) return 'idle'
  if (target.closest('[data-cursor="crystal"]')) return 'crystal'
  return target.closest(INTERACTIVE) ? 'interactive' : 'idle'
}

function Halo() {
  const follower = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = follower.current
    const halo = ring.current
    if (!el || !halo) return

    const setX = gsap.quickSetter(el, 'x', 'px')
    const setY = gsap.quickSetter(el, 'y', 'px')
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let visible = false

    const show = (value: boolean) => {
      visible = value
      el.dataset.visible = String(value)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        // Al entrar en la ventana aparece en su sitio, sin recorrer la pantalla desde la esquina.
        pos.x = target.x
        pos.y = target.y
        show(true)
      }
    }
    const onOver = (event: PointerEvent) => {
      halo.dataset.state = stateFor(event.target)
    }
    const onOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) show(false)
    }
    const onBlur = () => show(false)

    // Lerp en el ticker de GSAP: comparte el rAF con Lenis y ScrollTrigger.
    const tick = (_time: number, deltaMs: number) => {
      if (!visible) return
      const k = 1 - Math.exp((-deltaMs / 1000) * FOLLOW)
      pos.x += (target.x - pos.x) * k
      pos.y += (target.y - pos.y) * k
      setX(pos.x)
      setY(pos.y)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    window.addEventListener('blur', onBlur)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('blur', onBlur)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div
      ref={follower}
      aria-hidden="true"
      data-visible="false"
      className="pointer-events-none fixed top-0 left-0 z-70 opacity-0 transition-opacity duration-(--duration-base) data-[visible=true]:opacity-100"
    >
      <div
        ref={ring}
        data-state="idle"
        className="size-9 -translate-1/2 rounded-pill border border-ember-400/50 bg-radial from-ember-500/25 to-transparent to-70% shadow-[0_0_24px_-4px_var(--color-ember-500)] transition-[scale,border-color,box-shadow] duration-(--duration-base) ease-out-expo data-[state=crystal]:scale-180 data-[state=crystal]:border-crystal-400/60 data-[state=crystal]:from-crystal-400/25 data-[state=crystal]:shadow-[0_0_28px_-4px_var(--color-crystal-400)] data-[state=interactive]:scale-180 data-[state=interactive]:border-ember-300/60"
      />
    </div>
  )
}

/**
 * Halo ámbar que sigue al cursor con retardo suave. Es un acompañante: el cursor nativo nunca se
 * oculta. Solo existe con puntero fino y sin reduced motion; en touch no se monta.
 * `data-cursor="crystal"` en cualquier elemento lo vuelve azul cristal encima de él.
 */
export function CustomCursor() {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery(FINE_POINTER)
  if (reduced || !finePointer) return null
  return <Halo />
}
