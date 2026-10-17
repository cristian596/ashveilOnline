/**
 * Rutas y tamaños de las imágenes de escena. Es la única fuente: HeroFallback pinta el póster del hero,
 * Journey pinta la jungla de la travesía y scripts/vite-plugin-site-meta.ts precarga el del hero desde
 * aquí. Sin JSX, para que Node pueda leerlo.
 */
export interface Poster {
  src: string
  width: number
  height: number
}

export const POSTERS = {
  hero: {
    landscape: { src: '/images/ashveil-hero-poster-landscape.webp', width: 1600, height: 900 },
    portrait: { src: '/images/ashveil-hero-poster-portrait.webp', width: 720, height: 1464 },
  },
  journey: {
    landscape: { src: '/images/ashveil-journey-jungle-landscape.webp', width: 1600, height: 900 },
    portrait: { src: '/images/ashveil-journey-jungle-portrait.webp', width: 720, height: 1464 },
  },
} as const satisfies Record<string, { landscape: Poster; portrait: Poster }>

export type PosterVariant = keyof typeof POSTERS

/** Misma condición que el `<source>` del póster: el canvas usa el encuadre vertical si es más alto que ancho. */
export const PORTRAIT_MEDIA = '(max-aspect-ratio: 1/1)'
