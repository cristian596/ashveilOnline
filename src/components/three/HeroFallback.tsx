import { PORTRAIT_MEDIA, POSTERS } from './posters'

/**
 * Versión estática del hero 3D: se usa sin WebGL, con reduced motion o en gama baja, y como
 * placeholder mientras carga el modelo. La captura tiene el mismo encuadre horizontal y vertical que
 * la cámara de reposo del hero. Si cambias la cámara o la iluminación en HeroScene, vuelve a capturarla
 * (ver README). Los degradados imitan la composición (altar azul en el centro, luz de brasa desde
 * arriba a la izquierda) por si la imagen tampoco llega a cargar.
 */
export function HeroFallback() {
  const poster = POSTERS.hero
  return (
    <div className="absolute inset-0 bg-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_30%_25%,color-mix(in_oklab,var(--color-ember-700)_45%,transparent)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_22%_24%_at_50%_42%,color-mix(in_oklab,var(--color-crystal-600)_60%,transparent)_0%,transparent_75%)]" />
      <picture>
        {/* La cámara usa el encuadre vertical cuando el canvas es más alto que ancho; aquí, el viewport. */}
        <source media={PORTRAIT_MEDIA} srcSet={poster.portrait.src} width={poster.portrait.width} height={poster.portrait.height} />
        <img
          src={poster.landscape.src}
          width={poster.landscape.width}
          height={poster.landscape.height}
          alt=""
          decoding="async"
          // Es el candidato a LCP: se pide ya y con prioridad.
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
    </div>
  )
}
