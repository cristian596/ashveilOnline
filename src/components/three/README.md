# three

Escena 3D (React Three Fiber + drei). La usan el hero y la sección «La travesía».

- `HeroBackdrop.tsx`: punto de entrada. Muestra siempre `HeroFallback` y, si el dispositivo puede, carga `HeroScene` con `React.lazy` y la funde encima cuando el modelo está listo. Con `cameraPath` la cámara sigue la trayectoria del scroll; `allowLive={false}` fuerza el póster.
- `HeroScene.tsx`: canvas, modelo, luces, brasas, niebla y cámara (fija con parallax, o `PathRig` sobre la trayectoria). Cada canvas monta un clon del GLB cacheado; se libera cuando el último canvas se desmonta. Fuera de pantalla no renderiza (`frameloop: never`).
- `cameraPath.ts`: posición del altar y keyframes de la trayectoria de «La travesía» (un keyframe por paso de `site.journey.steps` más la cabecera).
- `HeroFallback.tsx`: póster estático (`public/images/ashveil-hero-poster-*.webp`) sobre un degradado radial. Se usa sin WebGL, con reduced motion, en gama baja y mientras carga el modelo.
- `capabilities.ts`: detección de WebGL y gama baja (núcleos, memoria, ahorro de datos).
- `palette.ts`: copia de los tokens de color de `src/index.css` para three.js.

## Modelo

`public/models/ashveil-hero.glb` se genera desde `ashveil-hero-original.glb` con `npm run optimize:model` (texturas a 2048 px, meshopt, sin `FB_ngon_encoding` ni `KHR_materials_volume`; ver `scripts/gltf-transform.config.mjs`). Si cambias el modelo, la cámara o la iluminación, vuelve a capturar los pósters.
