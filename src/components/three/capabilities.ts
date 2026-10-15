/** Por debajo de estos valores tratamos el dispositivo como gama baja y mostramos el fallback estático. */
const MIN_CPU_CORES = 4
const MIN_DEVICE_MEMORY_GB = 4

type NavigatorHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    // failIfMajorPerformanceCaveat descarta renderizado por software (sin GPU real).
    const options: WebGLContextAttributes = { failIfMajorPerformanceCaveat: true }
    const gl: WebGLRenderingContext | WebGL2RenderingContext | null =
      canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return gl !== null
  } catch {
    return false
  }
}

function isLowEndDevice() {
  const nav = navigator as NavigatorHints
  if (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency < MIN_CPU_CORES) return true
  // deviceMemory y connection solo existen en navegadores Chromium; si faltan, no penalizan.
  if (nav.deviceMemory !== undefined && nav.deviceMemory < MIN_DEVICE_MEMORY_GB) return true
  return nav.connection?.saveData === true
}

let cached: boolean | undefined

/** true si el dispositivo puede con el hero 3D. No mira reduced motion: eso es reactivo y va en el componente. */
export function canRenderHeroScene() {
  cached ??= hasWebGL() && !isLowEndDevice()
  return cached
}
