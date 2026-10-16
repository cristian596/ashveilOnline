import { useEffect, useRef, useState } from 'react'
import { site } from '../../config/site'
import { createAmbientAudio, type AmbientAudio } from '../../lib/ambientAudio'
import { focusRing } from '../ui/styles'

/**
 * Botón de sonido ambiente para la navbar. Apagado por defecto: el audio no se crea hasta el primer
 * clic. El nombre accesible no cambia; el estado lo anuncia aria-pressed.
 */
export function AmbientToggle() {
  const { ambient } = site.nav
  const [on, setOn] = useState(false)
  const audio = useRef<AmbientAudio | null>(null)

  useEffect(() => {
    // Con la pestaña oculta no suena; al volver, sigue si estaba encendido.
    const onVisibility = () => audio.current?.setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      audio.current?.dispose()
      audio.current = null
    }
  }, [])

  const toggle = () => {
    const next = !on
    // Se crea aquí, dentro del clic, para que el navegador permita reproducir.
    audio.current ??= createAmbientAudio()
    audio.current.setEnabled(next)
    setOn(next)
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={ambient.label}
      title={ambient.label}
      onClick={toggle}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md border px-2.5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors duration-(--duration-fast) motion-reduce:transition-none ${focusRing} ${
        on
          ? 'border-ember-600/70 bg-ember-500/10 text-ember-300'
          : 'border-line text-ink-muted hover:border-ash-600 hover:text-ink'
      }`}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
        <path d="M3 8v4h3l4 3.5v-11L6 8H3z" strokeLinejoin="round" />
        {on ? (
          <path d="M13 7.5a3.5 3.5 0 0 1 0 5M15.5 5a7 7 0 0 1 0 10" strokeLinecap="round" />
        ) : (
          <path d="M13.5 8l4 4m0-4l-4 4" strokeLinecap="round" />
        )}
      </svg>
      <span aria-hidden="true" className="hidden lg:inline">
        {ambient.shortLabel}
      </span>
    </button>
  )
}
