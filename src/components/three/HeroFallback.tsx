/**
 * Capturas de la escena 3D con su mismo encuadre horizontal y vertical. Si cambias la cámara o la
 * iluminación en HeroScene, vuelve a capturarlas.
 */
const POSTER = {
  landscape: '/images/ashveil-hero-poster-landscape.webp',
  portrait: '/images/ashveil-hero-poster-portrait.webp',
}

/**
 * Versión estática del hero 3D: se usa sin WebGL, con reduced motion o en gama baja, y como
 * placeholder mientras carga el modelo. Los degradados imitan la composición (altar azul en el
 * centro, luz de brasa desde arriba a la izquierda) por si la imagen tampoco llega a cargar.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_25%,color-mix(in_oklab,var(--color-ember-700)_45%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_22%_24%_at_50%_42%,color-mix(in_oklab,var(--color-crystal-600)_60%,transparent)_0%,transparent_75%)]" />
      <picture>
        {/* La cámara usa el encuadre vertical cuando el canvas es más alto que ancho; aquí, el viewport. */}
        <source media="(max-aspect-ratio: 1/1)" srcSet={POSTER.portrait} />
        <img
          src={POSTER.landscape}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
    </div>
  )
}
