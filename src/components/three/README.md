# three

Hero 3D (React Three Fiber + drei).

- `HeroBackdrop.tsx`: punto de entrada. Muestra siempre `HeroFallback` y, si el dispositivo puede, carga `HeroScene` con `React.lazy` y la funde encima cuando el modelo está listo.
- `HeroScene.tsx`: canvas, modelo, luces, brasas, niebla y parallax. La cámara y la posición del altar son constantes comentadas al principio del archivo.
- `HeroFallback.tsx`: póster estático (`public/images/ashveil-hero-poster-*.webp`) sobre un degradado radial. Se usa sin WebGL, con reduced motion, en gama baja y mientras carga el modelo.
- `capabilities.ts`: detección de WebGL y gama baja (núcleos, memoria, ahorro de datos).
- `palette.ts`: copia de los tokens de color de `src/index.css` para three.js.

## Modelo

`public/models/ashveil-hero.glb` se genera desde `ashveil-hero-original.glb` con `npm run optimize:model` (texturas a 2048 px, meshopt, sin `FB_ngon_encoding` ni `KHR_materials_volume`; ver `scripts/gltf-transform.config.mjs`). Si cambias el modelo, la cámara o la iluminación, vuelve a capturar los pósters.
