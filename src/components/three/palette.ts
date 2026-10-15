/**
 * Colores de la escena 3D. three.js necesita valores, no clases de Tailwind, así que aquí se
 * replican los tokens de `@theme` en src/index.css. Si cambias la paleta allí, cámbiala aquí.
 */
export const scenePalette = {
  canvas: '#0a090b', // --color-canvas (fondo y niebla: así el corte del escenario se funde con la página)
  ash: '#b0a89e', // --color-ash-300
  ember300: '#ffc98a', // --color-ember-300
  ember400: '#ffa94d', // --color-ember-400
  ember600: '#c9650f', // --color-ember-600
  crystal400: '#7cc4e8', // --color-crystal-400
} as const
