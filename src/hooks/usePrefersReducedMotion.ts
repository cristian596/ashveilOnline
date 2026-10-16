import { useMediaQuery } from './useMediaQuery'

const QUERY = '(prefers-reduced-motion: reduce)'

/** true si el usuario pidió reducir el movimiento. Úsalo para desactivar GSAP / framer-motion / Lenis. */
export function usePrefersReducedMotion() {
  return useMediaQuery(QUERY)
}
