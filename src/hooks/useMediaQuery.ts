import { useCallback, useSyncExternalStore } from 'react'

/** Puntero principal preciso (ratón o trackpad). Cursor y tilt solo se activan con él. */
export const FINE_POINTER = '(pointer: fine)'

/** Móvil a efectos de 3D: pantalla estrecha o puntero táctil. Ahí se usa el póster estático. */
export const MOBILE = '(max-width: 767px), (pointer: coarse)'

/** Estado reactivo de una media query. En el servidor (sin window) devuelve false. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
