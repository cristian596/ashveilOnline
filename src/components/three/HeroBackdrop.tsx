import { Suspense, lazy, useCallback, useState } from 'react'
import { useAfterLoad } from '../../hooks/useAfterLoad'
import { MOBILE, useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { canRenderHeroScene } from './capabilities'
import { HeroFallback } from './HeroFallback'
import { SceneErrorBoundary } from './SceneErrorBoundary'

// three, R3F y drei van en un chunk aparte que no bloquea el primer render.
const HeroScene = lazy(() => import('./HeroScene'))

function LiveScene() {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-(--duration-slower) ease-out-expo ${ready ? 'opacity-100' : 'opacity-0'}`}
    >
      <HeroScene onReady={handleReady} />
    </div>
  )
}

/**
 * Fondo 3D del hero: el póster siempre debajo y, si el dispositivo puede, la escena 3D encima con un
 * fundido cuando pinta su primer frame. En móvil la escena se monta después del evento load.
 */
export function HeroBackdrop() {
  const reducedMotion = usePrefersReducedMotion()
  const mobile = useMediaQuery(MOBILE)
  // En móvil el póster es el LCP: el chunk de three, el GLB y el canvas esperan a que la página cargue.
  // En escritorio no se espera nada.
  const afterLoad = useAfterLoad(mobile)
  const wantLive = !reducedMotion && afterLoad
  // canRenderHeroScene crea un contexto WebGL de prueba (cacheado): solo se consulta cuando hace falta.
  const live = wantLive && canRenderHeroScene()

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <HeroFallback />
      {live && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <LiveScene />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
