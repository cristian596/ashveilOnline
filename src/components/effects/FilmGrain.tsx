/**
 * Grano de película: capa fija sobre toda la página con un SVG de ruido (feTurbulence) en un
 * data-URI. Es estática (no parpadea), así que no cuenta como movimiento, y no recibe clics.
 * Para cambiar la intensidad, ajusta opacity-*; para el tamaño del grano, baseFrequency.
 */
export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-60 bg-[url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.85%27%20numOctaves=%273%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%201%200%200%200%200%201%200%200%200%200%201%200%200%200%201.4%20-0.45%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E)] opacity-[0.07]"
    />
  )
}
