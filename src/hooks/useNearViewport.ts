import { useEffect, useState, type RefObject } from 'react'

/**
 * Pasa a true la primera vez que el elemento se acerca al viewport (a menos de `margin`) y ya no
 * vuelve a false. Sirve para montar algo caro justo antes de que haga falta y conservarlo después.
 */
export function useNearViewport(ref: RefObject<Element | null>, margin = '100% 0px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (near || !element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: margin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, margin, near])

  return near
}
