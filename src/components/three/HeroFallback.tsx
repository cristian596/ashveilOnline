/**
 * Capturas de la escena 3D con su mismo encuadre horizontal y vertical: una con la cámara de reposo
 * del hero y otra con el keyframe 0 de «La travesía» (cámara más alta y lejana). Si cambias la cámara
 * o la iluminación en HeroScene o cameraPath, vuelve a capturarlas (ver README).
 */
const POSTERS = {
  hero: {
    landscape: '/images/ashveil-hero-poster-landscape.webp',
    portrait: '/images/ashveil-hero-poster-portrait.webp',
  },
  journey: {
    landscape: '/images/ashveil-journey-poster-landscape.webp',
    portrait: '/images/ashveil-journey-poster-portrait.webp',
  },
} as const

export type PosterVariant = keyof typeof POSTERS

/**
 * Versión estática del hero 3D: se usa sin WebGL, con reduced motion o en gama baja, y como
 * placeholder mientras carga el modelo. Los degradados imitan la composición (altar azul en el
 * centro, luz de brasa desde arriba a la izquierda) por si la imagen tampoco llega a cargar.
 */
export function HeroFallback({ variant = 'hero' }: { variant?: PosterVariant }) {
  const poster = POSTERS[variant]
  return (
    <div className="absolute inset-0 bg-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_25%,color-mix(in_oklab,var(--color-ember-700)_45%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_22%_24%_at_50%_42%,color-mix(in_oklab,var(--color-crystal-600)_60%,transparent)_0%,transparent_75%)]" />
      <picture>
        {/* La cámara usa el encuadre vertical cuando el canvas es más alto que ancho; aquí, el viewport. */}
        <source media="(max-aspect-ratio: 1/1)" srcSet={poster.portrait} />
        <img
          src={poster.landscape}
          alt=""
          decoding="async"
          // Solo el póster del hero es candidato a LCP; el de la travesía queda lejos del primer viewport.
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          fetchPriority={variant === 'hero' ? 'high' : 'auto'}
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
    </div>
  )
}
