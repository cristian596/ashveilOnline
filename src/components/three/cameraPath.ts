import { CatmullRomCurve3, MathUtils, Vector3 } from 'three'

/**
 * Centro de los cristales del altar, en unidades del modelo (el escenario mide ~0.93 × 0.86 × 1 y
 * apoya en y = 0). El GLB es un único mesh, así que se calculó con un THREE.Box3 sobre los vértices
 * cuyo texel de basecolor es azul cristal: min (0.006, 0.275, -0.045), max (0.077, 0.329, -0.021).
 */
export const ALTAR = new Vector3(0.042, 0.302, -0.033)

/** Progreso de 0 a 1 que escribe ScrollTrigger y lee la escena en cada frame, sin re-render de React. */
export interface ScrollProgress {
  current: number
}

interface CameraKeyframe {
  position: [x: number, y: number, z: number]
  lookAt: [x: number, y: number, z: number]
  fov: number
}

/**
 * Trayectoria de la sección «La travesía». El keyframe i se alcanza con progreso i / (n - 1): el 0
 * coincide con la cabecera y cada uno de los siguientes con el paso i de site.journey.steps, cuando su
 * texto está centrado en pantalla. Entre keyframes, la cámara recorre una curva Catmull-Rom.
 * Mantén las distancias al altar por debajo de ~1.3: la niebla empieza a 1.1 y cierra a 2.3.
 */
export const JOURNEY_KEYFRAMES: CameraKeyframe[] = [
  // Cabecera: plano general, como el hero pero más alto. Mira bajo el altar para dejarlo en el
  // tercio superior, por encima del titular.
  { position: [0, 0.62, 1.3], lookAt: [ALTAR.x, 0.06, ALTAR.z], fov: 42 },
  // I. Los arcos caídos: baja por la izquierda, entre los arcos.
  { position: [-0.3, 0.4, 0.8], lookAt: [0, 0.3, -0.12], fov: 46 },
  // II. El altar de cristal: de frente y cerca.
  { position: [0.1, 0.36, 0.42], lookAt: [ALTAR.x, ALTAR.y, ALTAR.z], fov: 40 },
  // III. Sobre la grieta: sube y mira hacia abajo.
  { position: [0.06, 1.05, 0.5], lookAt: [ALTAR.x, 0.22, -0.06], fov: 50 },
]

/** En un viewport vertical se abre el FOV, como en el encuadre vertical del hero. */
export const PORTRAIT_FOV_BOOST = 10

export function createCameraPath(keyframes: CameraKeyframe[]) {
  const toVectors = (key: 'position' | 'lookAt') => keyframes.map((frame) => new Vector3(...frame[key]))
  // centripetal: sin bucles ni sobrepasos entre keyframes muy separados.
  const positions = new CatmullRomCurve3(toVectors('position'), false, 'centripetal')
  const targets = new CatmullRomCurve3(toVectors('lookAt'), false, 'centripetal')
  const last = keyframes.length - 1

  /** Escribe en `position` y `lookAt` el punto de la trayectoria para `t` (0–1) y devuelve el FOV. */
  return function sample(t: number, position: Vector3, lookAt: Vector3) {
    const clamped = MathUtils.clamp(t, 0, 1)
    positions.getPoint(clamped, position)
    targets.getPoint(clamped, lookAt)
    const segment = Math.min(Math.floor(clamped * last), last - 1)
    const local = MathUtils.smoothstep(clamped * last - segment, 0, 1)
    return MathUtils.lerp(keyframes[segment].fov, keyframes[segment + 1].fov, local)
  }
}
