# Componentes de terceros

Este documento informa de lo que incluye o descarga la plantilla. No es asesoramiento legal: revisa cada licencia antes de redistribuir. Versiones leídas de `node_modules` y `package.json`.

## Dependencias de producción

| Paquete | Versión instalada | Licencia declarada |
| --- | --- | --- |
| react | 19.3.1 | MIT |
| react-dom | 19.3.1 | MIT |
| three | 0.186.1 | MIT |
| @react-three/fiber | 9.8.2 | MIT |
| @react-three/drei | 10.7.9 | MIT |
| framer-motion | 14.3.0 | MIT |
| lenis | 1.3.27 | MIT |
| tailwindcss | 4.3.3 | MIT |
| @tailwindcss/vite | 4.3.3 | MIT |
| gsap | 3.15.0 | Licencia propia «Standard "no charge" license» — <https://gsap.com/standard-license> |
| @gsap/react | 2.1.2 | Misma licencia estándar de GSAP — <https://gsap.com/standard-license> |

**Atención con GSAP:** no es MIT. Es una licencia propia de GreenSock con condiciones de uso. **[PENDIENTE: lee las condiciones de GSAP y confirma que permiten incluirlo en una plantilla que vendes.]**

Las dependencias transitivas y las de desarrollo (Vite, TypeScript, oxlint, gltf-transform, etc.) tienen sus propias licencias; se pueden consultar en `node_modules/<paquete>/package.json`.

## Fuentes (Google Fonts)

Se cargan desde Google Fonts en `index.html`; no se incluyen en el paquete.

| Fuente | Licencia |
| --- | --- |
| Cormorant Garamond | SIL Open Font License 1.1 |
| Manrope | SIL Open Font License 1.1 |

## Modelo 3D

- `source-assets/ashveil-hero-original.glb` (original) y `public/models/ashveil-hero.glb` (optimizado con `gltf-transform`).
- **Generado con Tripo. Verifica los términos de uso comercial de Tripo antes de vender la plantilla.**

## Pósteres e imágenes

- `public/images/ashveil-hero-poster-*.webp` y `ashveil-journey-poster-*.webp`: capturas de la escena 3D, es decir, derivados del modelo anterior; les aplican los mismos términos.
- `public/images/ashveil-og.jpg`: recorte del póster horizontal del hero; mismos términos.
- `public/favicon.svg`: **[PENDIENTE: indica el origen y la licencia del favicon.]**
