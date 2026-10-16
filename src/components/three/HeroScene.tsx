import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  MathUtils,
  PerspectiveCamera,
  Vector3,
  type PointLight,
  type Points,
} from 'three'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import {
  ALTAR,
  JOURNEY_KEYFRAMES,
  PORTRAIT_FOV_BOOST,
  createCameraPath,
  type ScrollProgress,
} from './cameraPath'
import { disposeObject } from './dispose'
import { scenePalette } from './palette'

const MODEL_URL = '/models/ashveil-hero.glb'

/** Cámara fija, algo elevada sobre el altar (0.2 por encima) y frente a él. */
const CAMERA_POSITION = new Vector3(0, 0.5, 1.25)

/**
 * La cámara mira a un punto bajo el altar para que este quede centrado en horizontal pero en el
 * tercio superior, libre del bloque de texto. En vertical el texto ocupa más alto: se abre el FOV
 * (en vez de alejar la cámara, para que la niebla no cambie) y se baja más el punto de mira.
 */
const FRAMING = {
  landscape: { fov: 42, lookAt: new Vector3(ALTAR.x, ALTAR.y - 0.13, ALTAR.z) },
  portrait: { fov: 52, lookAt: new Vector3(ALTAR.x, ALTAR.y - 0.24, ALTAR.z) },
}
/**
 * En pantallas anchas (≥ 1,6:1, como 1440×900 o 16:9) el altar quedaba pequeño dentro del encuadre:
 * se cierra el FOV de 42° a 34° (≈ 1,25× de zoom) sin mover la cámara, para que la niebla no cambie.
 * Entre 1,2:1 y 1,6:1 se interpola, para que al redimensionar no haya saltos. En vertical no cambia.
 */
const WIDE_FOV = 34
const WIDE_ASPECT = { from: 1.2, to: 1.6 }

function landscapeFov(aspect: number) {
  return MathUtils.lerp(
    FRAMING.landscape.fov,
    WIDE_FOV,
    MathUtils.smoothstep(aspect, WIDE_ASPECT.from, WIDE_ASPECT.to),
  )
}
/** Desplazamiento máximo de la cámara con el parallax del mouse, en unidades del modelo. */
const PARALLAX = { x: 0.06, y: 0.03 }

const EMBER_COUNT = 280
/** Proporción de brasas que nacen junto al altar; el resto se reparte por todo el escenario. */
const EMBER_ALTAR_SHARE = 0.65
const EMBER_CEILING = 0.85

// ── Cámara y parallax ───────────────────────────────────────────────

function CameraRig({ parallax }: { parallax: boolean }) {
  const portrait = useThree((state) => state.size.width < state.size.height)
  const aspect = useThree((state) => state.size.width / state.size.height)
  const framing = portrait ? FRAMING.portrait : FRAMING.landscape
  const fov = portrait ? FRAMING.portrait.fov : landscapeFov(aspect)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useMemo(() => new Vector3(), [])

  useEffect(() => {
    if (!parallax) return
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      pointer.current = { x: 0, y: 0 }
    }
  }, [parallax])

  useFrame(({ camera }, delta) => {
    if (camera instanceof PerspectiveCamera && camera.fov !== fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
    target.set(
      CAMERA_POSITION.x + pointer.current.x * PARALLAX.x,
      CAMERA_POSITION.y - pointer.current.y * PARALLAX.y,
      CAMERA_POSITION.z,
    )
    // Amortiguado independiente del framerate.
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.5))
    camera.lookAt(framing.lookAt)
  })

  return null
}

const sampleJourney = createCameraPath(JOURNEY_KEYFRAMES)

/** Cámara sobre la trayectoria de cameraPath.ts, guiada por el progreso del scroll. */
function PathRig({ progress }: { progress: ScrollProgress }) {
  const portrait = useThree((state) => state.size.width < state.size.height)
  const lookAt = useMemo(() => new Vector3(), [])

  useFrame(({ camera }) => {
    // ScrollTrigger ya suaviza el progreso (scrub), así que aquí se aplica tal cual.
    const fov = sampleJourney(progress.current, camera.position, lookAt) + (portrait ? PORTRAIT_FOV_BOOST : 0)
    if (camera instanceof PerspectiveCamera && Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
    camera.lookAt(lookAt)
  })

  return null
}

// ── Modelo ──────────────────────────────────────────────────────────

/** Canvas que usan ahora el modelo. Cuando llega a 0 se liberan la GPU y la caché de useGLTF. */
let modelUsers = 0
let pendingRelease: number | undefined

/**
 * El hero y la travesía comparten el GLB cargado (useGLTF lo cachea por URL): cada canvas monta un
 * clon, que reutiliza geometría, materiales y texturas. No se puede montar el mismo objeto en dos
 * escenas a la vez: three.js lo movería de una a otra.
 */
function Ruins() {
  const { scene } = useGLTF(MODEL_URL, false, true)
  const instance = useMemo(() => scene.clone(), [scene])

  useEffect(() => {
    modelUsers++
    // StrictMode desmonta y vuelve a montar en desarrollo: cancelamos la liberación si el remontaje
    // llega antes del timeout.
    window.clearTimeout(pendingRelease)
    return () => {
      modelUsers--
      if (modelUsers > 0) return
      pendingRelease = window.setTimeout(() => {
        disposeObject(scene)
        useGLTF.clear(MODEL_URL)
      })
    }
  }, [scene])

  return <primitive object={instance} />
}

// ── Brasas ──────────────────────────────────────────────────────────

function createEmberSprite() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.45)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
  return new CanvasTexture(canvas)
}

/** Aproximación barata a una gaussiana centrada en 0 (suma de uniformes). */
function gaussian(spread: number) {
  return ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2 * spread
}

function createEmbers(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const origins = new Float32Array(count * 3) // x, y de reaparición y z
  const speeds = new Float32Array(count)
  const phases = new Float32Array(count)
  const hot = new Color(scenePalette.ember300)
  const cold = new Color(scenePalette.ember600)
  const color = new Color()

  for (let i = 0; i < count; i++) {
    const nearAltar = i < count * EMBER_ALTAR_SHARE
    const x = nearAltar ? ALTAR.x + gaussian(0.14) : (Math.random() - 0.5) * 0.9
    const z = nearAltar ? ALTAR.z + gaussian(0.14) : (Math.random() - 0.5) * 0.9
    const spawnY = nearAltar ? ALTAR.y - 0.08 : 0.02
    origins.set([x, spawnY, z], i * 3)
    positions.set([x, spawnY + Math.random() * (EMBER_CEILING - spawnY), z], i * 3)
    color.lerpColors(cold, hot, Math.random())
    colors.set([color.r, color.g, color.b], i * 3)
    speeds[i] = 0.015 + Math.random() * 0.035
    phases[i] = Math.random() * Math.PI * 2
  }
  return { positions, colors, origins, speeds, phases }
}

function Embers({ animate }: { animate: boolean }) {
  const points = useRef<Points>(null)
  const embers = useMemo(() => createEmbers(EMBER_COUNT), [])
  const sprite = useMemo(() => createEmberSprite(), [])

  useEffect(() => () => sprite.dispose(), [sprite])

  useFrame(({ clock }, delta) => {
    if (!animate || !points.current) return
    const attribute = points.current.geometry.attributes.position
    const array = attribute.array as Float32Array
    const time = clock.elapsedTime
    const { origins, speeds, phases } = embers
    for (let i = 0; i < EMBER_COUNT; i++) {
      const o = i * 3
      let y = array[o + 1] + speeds[i] * delta
      if (y > EMBER_CEILING) y = origins[o + 1]
      // Deriva lateral suave, como si subieran con el calor.
      array[o] = origins[o] + Math.sin(time * 0.6 + phases[i]) * 0.02 * (y - origins[o + 1] + 0.1)
      array[o + 1] = y
    }
    attribute.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[embers.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[embers.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.014}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

// ── Luz del altar ───────────────────────────────────────────────────

const CRYSTAL_INTENSITY = 0.7

function CrystalLight({ animate }: { animate: boolean }) {
  const light = useRef<PointLight>(null)
  useFrame(({ clock }) => {
    if (!animate || !light.current) return
    // Pulso lento del cristal.
    light.current.intensity = CRYSTAL_INTENSITY + Math.sin(clock.elapsedTime * 1.3) * 0.12
  })
  return (
    <pointLight
      ref={light}
      position={ALTAR}
      color={scenePalette.crystal400}
      intensity={CRYSTAL_INTENSITY}
      // Alcance corto: ilumina el altar y el arco central, no todo el escenario.
      distance={0.5}
      decay={2}
    />
  )
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  // Comparte Suspense con Ruins: el efecto solo corre cuando el modelo ya cargó.
  useEffect(onReady, [onReady])
  return null
}

// ── Canvas ──────────────────────────────────────────────────────────

interface HeroSceneProps {
  onReady: () => void
  /** Sin él: cámara fija del hero con parallax. Con él: cámara sobre la trayectoria de la travesía. */
  cameraPath?: ScrollProgress
}

export default function HeroScene({ onReady, cameraPath }: HeroSceneProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = wrapper.current
    if (!element) return
    // Fuera de pantalla el canvas no renderiza (frameloop 'never'); conserva el contexto y el modelo.
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        camera={{
          fov: FRAMING.landscape.fov,
          near: 0.05,
          far: 10,
          position: CAMERA_POSITION.toArray(),
        }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[scenePalette.canvas]} />
        {/* La niebla funde con el fondo los bordes y la base cortada del escenario. */}
        <fog attach="fog" args={[scenePalette.canvas, 1.1, 2.3]} />

        <ambientLight color={scenePalette.ash300} intensity={0.2} />
        {/* Brasa: luz cálida desde arriba a la izquierda, rasante sobre los arcos. */}
        <directionalLight position={[-1.2, 1.4, 0.9]} color={scenePalette.ember400} intensity={2.6} />
        <CrystalLight animate={!reducedMotion} />

        {cameraPath ? <PathRig progress={cameraPath} /> : <CameraRig parallax={!reducedMotion} />}
        <Embers animate={!reducedMotion} />
        <Suspense fallback={null}>
          <Ruins />
          <ReadySignal onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  )
}
