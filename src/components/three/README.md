# three

Escena 3D (React Three Fiber + drei). Solo la usa el hero: «La travesía» es una imagen (ver [Imagen de la travesía](#imagen-de-la-travesía)), así que la página crea **un único contexto WebGL**.

- `HeroBackdrop.tsx`: punto de entrada. Muestra siempre `HeroFallback` y, si el dispositivo puede, carga `HeroScene` con `React.lazy` y la funde encima cuando el modelo está listo. Sin WebGL, con reduced motion o en gama baja se queda el póster.
- `HeroScene.tsx`: canvas, modelo, luces, brasas, niebla y cámara fija con parallax (`CameraRig`). El GLB se libera al desmontar el canvas. Fuera de pantalla no renderiza (`frameloop: never`).
- `cameraPath.ts`: posición del altar (`ALTAR`), que usan la cámara, la luz del cristal y las brasas de `HeroScene`.
- `HeroFallback.tsx`: póster estático sobre un degradado radial. Usa `public/images/ashveil-hero-poster-*.webp` (cámara de reposo del hero). Se usa sin WebGL, con reduced motion, en gama baja y mientras carga el modelo.
- `capabilities.ts`: detección de WebGL y gama baja (núcleos, memoria, ahorro de datos).
- `posters.ts`: rutas y tamaños de las imágenes de escena (hero y travesía). Lo leen `HeroFallback`, `Journey` y `scripts/vite-plugin-site-meta.ts`.
- `palette.ts`: copia de los tokens de color de `src/index.css` para three.js (`npm run check:tokens` comprueba que coincidan).

## Encuadre del hero

La cámara del hero tiene tres encuadres (`FRAMING` y `WIDE_FOV` en `HeroScene.tsx`):

| Canvas | FOV vertical | Notas |
| --- | --- | --- |
| Vertical (ancho < alto) | 52° | Sin cambios. Mira más abajo para dejar sitio al texto. |
| Casi cuadrado (≈ 1,2:1) | 42° | Sin cambios. |
| Ancho (≥ 1,6:1, p. ej. 1440×900 o 16:9) | **34°** | Antes 42°: el altar quedaba pequeño. Zoom ≈ 1,25× sin mover la cámara (la niebla no cambia). Entre 1,2:1 y 1,6:1 se interpola con `smoothstep`, sin saltos al redimensionar. |

El póster horizontal del hero se regeneró con el FOV de 34°; el vertical no cambió porque ese encuadre tampoco.

## Pósteres

Cada póster del hero debe coincidir con la cámara real que sustituye, o el paso a 3D se nota como un salto.

| Póster | Cámara | Tamaño | Cómo capturarlo |
| --- | --- | --- | --- |
| `ashveil-hero-poster-landscape` | reposo del hero, FOV 34° | 1600×900 | Viewport 1600×965 (el hero mide `100svh − 4rem`, así el canvas es exactamente 1600×900) |
| `ashveil-hero-poster-portrait` | reposo del hero, FOV 52° | 720×1464 | Viewport 720×1464 |

Pasos: `npm run dev` (o `preview`), esperar ~9 s a que cargue el modelo y se asiente la cámara, ocultar todo menos el `<canvas>` (`body * { visibility: hidden }` y `canvas { visibility: visible }`), capturar el rectángulo del canvas, exportar a WebP (< 60 KB, calidad ~0,7–0,8). Se capturan sin vignettes: las pone la página encima.

## Modelo

`public/models/ashveil-hero.glb` se genera desde `source-assets/ashveil-hero-original.glb` con `npm run optimize:model` (texturas a 2048 px, meshopt, sin `FB_ngon_encoding` ni `KHR_materials_volume`; ver `scripts/gltf-transform.config.mjs`). Si cambias el modelo, la cámara o la iluminación, vuelve a capturar los pósters del hero.

## Imagen de la travesía

«La travesía» (`src/components/sections/Journey.tsx`) pinta una ilustración de jungla con `<picture>`, sin 3D ni capas de parallax. Es la misma en escritorio y en móvil, `loading="lazy"` y con `width`/`height` explícitos tomados de `posters.ts` (`POSTERS.journey`). Se muestra con `object-cover`; el vertical se elige con `PORTRAIT_MEDIA`, igual que el póster del hero.

| Imagen | Tamaño | Peso | Notas |
| --- | --- | --- | --- |
| `ashveil-journey-jungle-landscape.webp` | 1600×900 | 131 KB | Recorte 16:9 del original de 4096×2336 (`source-assets/journey-jungle/`), WebP calidad 58 |
| `ashveil-journey-jungle-portrait.webp` | 720×1464 | 59 KB | Recorte de 881×1792 (desde x = 90) del original de 1024×1792, para conservar el rostro de piedra y la luna; WebP calidad 62 |

Para sustituirlas: exporta con la misma proporción (16:9 y ≈ 0,49:1), deja oscuros el tercio inferior y el lado izquierdo (ahí va el texto; los degradados de `Journey.tsx` lo refuerzan) y, si cambia el tamaño, actualiza `posters.ts`. El contraste del texto sobre la imagen se midió con el peor caso (percentil 95 de luminancia del fondo): ≥ 5,2:1 en escritorio y móvil.

`source-assets/journey-jungle/` también guarda `journey-layer-fog.webp` y `journey-layer-leaves.webp`, dos capas pensadas para parallax. **No se usan**: son WebP opacos con el tablero de transparencia dibujado en los píxeles, no tienen canal alfa. Para usarlas, expórtalas con transparencia real.

## Contextos WebGL

Antes el hero y la travesía montaban cada uno su `<Canvas>` (dos contextos, ~70 MB de texturas cada uno y ~+880 ms de *long tasks* al montar el segundo). Ahora solo el hero crea un canvas; la sonda de `capabilities.ts` añade una llamada a `getContext` que no queda conectada al DOM. Por eso `Ruins` ya no clona el GLB.
