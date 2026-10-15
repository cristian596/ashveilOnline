import { Suspense, lazy, useCallback, useState } from 'react'
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

/** Fondo del hero: el fallback siempre debajo y, si el dispositivo puede, la escena 3D encima con un fundido. */
export function HeroBackdrop() {
  const reducedMotion = usePrefersReducedMotion()
  const [capable] = useState(canRenderHeroScene)

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <HeroFallback />
      {capable && !reducedMotion && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <LiveScene />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
