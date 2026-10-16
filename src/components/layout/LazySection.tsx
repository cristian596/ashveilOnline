import { Suspense, useEffect, type ReactNode } from 'react'
import { ScrollTrigger } from '../../lib/gsap'

let refreshTimer: number | undefined

/**
 * Cada sección que llega cambia la altura de la página y desplaza los triggers que están debajo.
 * Se agrupan los montajes cercanos en un único refresh.
 */
function scheduleRefresh() {
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120)
}

function RefreshOnMount() {
  useEffect(scheduleRefresh, [])
  return null
}

interface LazySectionProps {
  children: ReactNode
  /** Clases de altura del placeholder; aproximan la altura real para que el layout no salte. */
  placeholder: string
  /** id de la sección, para que las anclas (#clases, #mundo…) funcionen antes de que cargue. */
  id?: string
}

/** Envuelve una sección cargada con React.lazy: placeholder vacío del mismo alto mientras llega el chunk. */
export function LazySection({ children, placeholder, id }: LazySectionProps) {
  return (
    <Suspense fallback={<div id={id} aria-hidden="true" className={`scroll-mt-16 ${placeholder}`} />}>
      {children}
      <RefreshOnMount />
    </Suspense>
  )
}
