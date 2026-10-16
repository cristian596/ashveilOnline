# Ashveil Online — plantilla de landing page

React 19 + Vite + TypeScript + Tailwind CSS v4.

## Comandos
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — oxlint
- `npm run preview` — previsualizar el build
- `npm run optimize:model` — regenerar `public/models/ashveil-hero.glb` desde el modelo original

## Personalizar
- **Contenido**: todo el texto vive en `src/config/site.ts`.
- **Diseño**: colores, fuentes, espaciados, radios, sombras y duraciones están en `@theme` dentro de `src/index.css`. Es el único CSS del proyecto; el resto son clases de Tailwind.
- **Fuentes**: se cargan desde Google Fonts en `index.html`.
- **Movimiento**: respeta `prefers-reduced-motion` con las variantes `motion-safe:` / `motion-reduce:` y el hook `usePrefersReducedMotion`.
- **Efectos**: halo del cursor (`components/effects/CustomCursor.tsx`, `data-cursor="crystal"` lo vuelve azul), grano de película (`FilmGrain.tsx`), titulares revelados (`ui/RevealHeading.tsx`), tarjetas con inclinación (`ui/TiltCard.tsx`) y sonido ambiente generado con Web Audio (`lib/ambientAudio.ts`, apagado por defecto). Todos se desactivan con reduced motion salvo el grano, que es estático, y el audio, que solo suena si se activa.
- **Carga diferida**: las secciones bajo el hero se cargan con `React.lazy` en `App.tsx`. Si cambias mucho el contenido de una, ajusta la altura de su placeholder.
