import { Suspense, lazy, useCallback, useState } from 'react'
import { useAfterLoad } from '../../hooks/useAfterLoad'
import { MOBILE, useMediaQuery } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ScrollProgress } from './cameraPath'
import { canRenderHeroScene } from './capabilities'
import { HeroFallback, type PosterVariant } from './HeroFallback'
import { SceneErrorBoundary } from './SceneErrorBoundary'

// three, R3F y drei van en un chunk aparte que no bloquea el primer render.
const HeroScene = lazy(() => import('./HeroScene'))

function LiveScene({ cameraPath }: { cameraPath?: ScrollProgress }) {
  const [ready, setReady] = useState(false)
  const handleReady = useCallback(() => setReady(true), [])

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-(--duration-slower) ease-out-expo ${ready ? 'opacity-100' : 'opacity-0'}`}
    >
      <HeroScene onReady={handleReady} cameraPath={cameraPath} />
    </div>
  )
}

interface HeroBackdropProps {
  /** Progreso del scroll para la cámara de la travesía. Sin él, cámara fija del hero. */
  cameraPath?: ScrollProgress
  /** false fuerza el póster (p. ej. en móvil o mientras la sección aún está lejos). */
  allowLive?: boolean
  /** Póster estático: el del hero (por defecto) o el del primer encuadre de la travesía. */
  poster?: PosterVariant
}

/**
 * Fondo 3D: el póster siempre debajo y, si el dispositivo puede, la escena 3D encima con un fundido
 * cuando pinta su primer frame. En móvil la escena se monta después del evento load.
 */
export function HeroBackdrop({ cameraPath, allowLive = true, poster = 'hero' }: HeroBackdropProps) {
  const reducedMotion = usePrefersReducedMotion()
  const mobile = useMediaQuery(MOBILE)
  // En móvil el póster es el LCP: el chunk de three, el GLB y el canvas esperan a que la página cargue.
  // En escritorio no se espera nada.
  const afterLoad = useAfterLoad(mobile)
  const wantLive = allowLive && !reducedMotion && afterLoad
  // canRenderHeroScene crea un contexto WebGL de prueba (cacheado): solo se consulta cuando hace falta.
  const live = wantLive && canRenderHeroScene()

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <HeroFallback variant={poster} />
      {live && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <LiveScene cameraPath={cameraPath} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
