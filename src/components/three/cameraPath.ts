import { Vector3 } from 'three'

/**
 * Centro de los cristales del altar, en unidades del modelo (el escenario mide ~0.93 × 0.86 × 1 y
 * apoya en y = 0). El GLB es un único mesh, así que se calculó con un THREE.Box3 sobre los vértices
 * cuyo texel de basecolor es azul cristal: min (0.006, 0.275, -0.045), max (0.077, 0.329, -0.021).
 * HeroScene lo usa para encuadrar la cámara, la luz del cristal y las brasas.
 */
export const ALTAR = new Vector3(0.042, 0.302, -0.033)
