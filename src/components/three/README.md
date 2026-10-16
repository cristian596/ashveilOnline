# three

Escena 3D (React Three Fiber + drei). La usan el hero y la sección «La travesía».

- `HeroBackdrop.tsx`: punto de entrada. Muestra siempre `HeroFallback` y, si el dispositivo puede, carga `HeroScene` con `React.lazy` y la funde encima cuando el modelo está listo. Con `cameraPath` la cámara sigue la trayectoria del scroll; `allowLive={false}` fuerza el póster.
- `HeroScene.tsx`: canvas, modelo, luces, brasas, niebla y cámara (fija con parallax, o `PathRig` sobre la trayectoria). Cada canvas monta un clon del GLB cacheado; se libera cuando el último canvas se desmonta. Fuera de pantalla no renderiza (`frameloop: never`).
- `cameraPath.ts`: posición del altar y keyframes de la trayectoria de «La travesía» (un keyframe por paso de `site.journey.steps` más la cabecera).
- `HeroFallback.tsx`: póster estático sobre un degradado radial. Dos variantes: `hero` (`public/images/ashveil-hero-poster-*.webp`, cámara de reposo del hero) y `journey` (`ashveil-journey-poster-*.webp`, keyframe 0 de la travesía). Se usa sin WebGL, con reduced motion, en gama baja, en móvil/táctil (travesía) y mientras carga el modelo.
- `capabilities.ts`: detección de WebGL y gama baja (núcleos, memoria, ahorro de datos).
- `palette.ts`: copia de los tokens de color de `src/index.css` para three.js (`npm run check:tokens` comprueba que coincidan).

## Encuadre del hero

La cámara del hero tiene tres encuadres (`FRAMING` y `WIDE_FOV` en `HeroScene.tsx`):

| Canvas | FOV vertical | Notas |
| --- | --- | --- |
| Vertical (ancho < alto) | 52° | Sin cambios. Mira más abajo para dejar sitio al texto. |
| Casi cuadrado (≈ 1,2:1) | 42° | Sin cambios. |
| Ancho (≥ 1,6:1, p. ej. 1440×900 o 16:9) | **34°** | Antes 42°: el altar quedaba pequeño. Zoom ≈ 1,25× sin mover la cámara (la niebla no cambia). Entre 1,2:1 y 1,6:1 se interpola con `smoothstep`, sin saltos al redimensionar. |

La travesía usa su propia trayectoria (`cameraPath.ts`) y no se ve afectada. El póster horizontal del hero se regeneró con el FOV de 34°; el vertical no cambió porque ese encuadre tampoco.

## Pósteres

Cada póster debe coincidir con la cámara real que sustituye, o el paso a 3D se nota como un salto.

| Póster | Cámara | Tamaño | Cómo capturarlo |
| --- | --- | --- | --- |
| `ashveil-hero-poster-landscape` | reposo del hero, FOV 34° | 1600×900 | Viewport 1600×965 (el hero mide `100svh − 4rem`, así el canvas es exactamente 1600×900) |
| `ashveil-hero-poster-portrait` | reposo del hero, FOV 52° | 720×1464 | Viewport 720×1464 |
| `ashveil-journey-poster-landscape` | keyframe 0, FOV 42° | 1600×900 | Viewport 1600×900, con el scroll en el `top` de la sección (progreso 0) |
| `ashveil-journey-poster-portrait` | keyframe 0, FOV 42° + 10° | 720×1464 | Viewport 788×1602 (proporción 0,4919, igual que 720×1464) y reducir. La travesía solo monta el canvas con ≥ 768 px de ancho; con 720 px mostraría el propio póster |

Pasos: `npm run dev` (o `preview`), esperar ~9 s a que cargue el modelo y se asiente la cámara, ocultar todo menos el `<canvas>` (`body * { visibility: hidden }` y `canvas { visibility: visible }`), capturar el rectángulo del canvas, exportar a WebP (< 60 KB, calidad ~0,7–0,8). Se capturan sin vignettes: las pone la página encima.

## Modelo

`public/models/ashveil-hero.glb` se genera desde `source-assets/ashveil-hero-original.glb` con `npm run optimize:model` (texturas a 2048 px, meshopt, sin `FB_ngon_encoding` ni `KHR_materials_volume`; ver `scripts/gltf-transform.config.mjs`). Si cambias el modelo, la cámara o la iluminación, vuelve a capturar los pósters.

## Deuda técnica: un canvas WebGL por sección

Hero y travesía montan **cada uno su propio `<Canvas>`**: dos contextos WebGL con su escena, su copia en GPU del GLB (la geometría y los materiales de three.js se comparten en JS con `scene.clone()`, pero cada contexto sube sus propias texturas y buffers) y su bucle de render. Lo razonable sería un único canvas fijo detrás de la página con la cámara guiada por el scroll. **No se ha hecho** (refactor fuera del alcance de esta entrega).

Impacto medido (Chrome 155, 1440×900, GPU por software SwiftShader: orientativo, no el de una GPU real):

- **VRAM**: `gltf-transform inspect` estima ~67 MB de texturas (3 × 2048², sin comprimir) + 2,8 MB de malla ≈ **70 MB por contexto**, ≈ **140 MB** con los dos montados. El canvas de la travesía se monta cuando la sección está a una pantalla y **no se desmonta** al salir (solo deja de renderizar con `frameloop: never`).
- **Hilo principal**: al montarse el canvas de la travesía aparecieron 2 *long tasks* más; el total de *long tasks* de la sesión pasó de 538 ms (solo hero) a 1417 ms (**≈ +880 ms** al compilar shaders y subir las texturas por segunda vez).
- **Contextos**: 3 llamadas a `getContext('webgl')` en la sesión (una es la sonda de `capabilities.ts`), por debajo del límite del navegador, pero en móviles de gama baja los contextos se pierden antes.
- **FPS**: en cada momento solo renderiza un canvas (el otro está fuera de pantalla), así que no se duplica el coste por frame; el coste está en memoria y en el montaje.

Camino sugerido: un `<Canvas>` con `position: fixed` compartido, con el modelo cargado una vez y la cámara cambiando entre `CameraRig` (hero) y `PathRig` (travesía) según el scroll.
