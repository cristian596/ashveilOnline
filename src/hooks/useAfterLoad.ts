import { useEffect, useState } from 'react'

/** Margen tras el evento load para que el póster pinte y el hilo principal se asiente. */
const SETTLE_MS = 400
const IDLE_TIMEOUT_MS = 2000

/**
 * Devuelve false hasta que la página terminó de cargar (evento load) más un pequeño retardo en reposo,
 * y true a partir de entonces. Con `enabled` en false devuelve true de inmediato, sin esperar.
 * Una vez true no vuelve a false.
 */
export function useAfterLoad(enabled: boolean) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled || done) return
    let settle: number | undefined
    let idle: number | undefined

    const release = () => setDone(true)
    const onLoad = () => {
      settle = window.setTimeout(() => {
        if ('requestIdleCallback' in window) idle = window.requestIdleCallback(release, { timeout: IDLE_TIMEOUT_MS })
        else release()
      }, SETTLE_MS)
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(settle)
      if (idle !== undefined) window.cancelIdleCallback(idle)
    }
  }, [enabled, done])

  return !enabled || done
}
