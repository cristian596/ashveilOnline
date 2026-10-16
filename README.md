# Ashveil Online — plantilla de landing page

React 19 + Vite + TypeScript + Tailwind CSS v4.

## Documentación

Punto de entrada: la carpeta [docs/](docs/).

- [Instalación](docs/instalacion.md) — requisitos, comandos y verificación.
- [Personalización](docs/personalizacion.md) — marca nueva y checklist.
- [Despliegue](docs/despliegue.md) — publicar el sitio estático (Netlify).
- [Temas](docs/temas.md) — dos paletas listas para pegar.
- [Entrega](docs/entrega.md) — qué incluye, relleno, límites y soporte.
- [THIRD_PARTY.md](THIRD_PARTY.md) y [LICENSE](LICENSE) — terceros y licencia (pendiente).

## Comandos
- `npm run dev` — servidor de desarrollo
- `npm run build` — comprueba tipos y genera el build de producción
- `npm run lint` — oxlint + `check:tokens`
- `npm run check:tokens` — falla si `src/components/three/palette.ts` no coincide con los colores de `@theme`
- `npm run preview` — previsualizar el build
- `npm run package` — genera `release/ashveil-online-template.zip` para entregar (ver [docs/instalacion.md](docs/instalacion.md#generar-el-paquete-de-entrega-npm-run-package))
- `npm run optimize:model` — regenerar `public/models/ashveil-hero.glb` desde `source-assets/ashveil-hero-original.glb`

## Personalizar para un cliente

Todo se hace en archivos de configuración y assets; no hace falta tocar componentes.

- [ ] **Nombre y tagline** — `name` y `tagline` en `src/config/site.ts`.
- [ ] **Metadatos** — `meta` en `site.ts` (título, descripción, idioma, `og:locale`, URL pública, imagen social, favicon). Ver [Metadatos y SEO](#metadatos-y-seo).
- [ ] **Textos** — cada sección tiene su bloque en `site.ts` (`hero`, `pillars`, `classes`, `lore`, `journey`, `timeline`, `community`, `faq`, `finalCta`). TypeScript avisa si falta un campo.
- [ ] **Secciones activas** — `sections` en `site.ts`. Ver [Secciones](#secciones).
- [ ] **Colores** — variables `--color-*` en `@theme` de `src/index.css` y, para la escena 3D, el mismo valor en `src/components/three/palette.ts`. Ver [Nueva marca](#nueva-marca).
- [ ] **Fuentes** — `--font-display` y `--font-sans` en `@theme`, y el `<link>` de Google Fonts en `index.html`.
- [ ] **Modelo 3D** — ver [Assets](#assets).
- [ ] **Pósteres del hero y de la travesía** — ver [Assets](#assets).
- [ ] **Enlaces** — `nav.cta`, `hero.primaryCta`, `hero.secondaryCta`, `finalCta.cta` y `footer.links` en `site.ts`. Sustituye los `#anclas` de ejemplo (`#jugar`, `#registro`, `#trailer`, `#terminos`…) por las URL reales.
- [ ] **Datos de ejemplo** — cifras y testimonios de `community` están marcados como ejemplo (`isExample`); cámbialos por datos reales.
- [ ] **Verificar** — `npm run lint` y `npm run build`.

## Secciones

`site.sections` tiene un booleano por sección: `pillars`, `classes`, `lore`, `journey`, `timeline`, `community`, `faq`, `finalCta`. El hero siempre se muestra.

- Una sección en `false` **no se monta ni descarga su chunk** (`App.tsx` filtra `sectionRegistry`) y desaparece de la navbar.
- Los enlaces de la navbar (`nav.links`) se declaran como `{ label, section }`; el `href` sale del `id` de esa sección, y el enlace se omite si está desactivada. Solo pueden enlazarse `classes`, `lore`, `journey`, `community` y `finalCta`, que son las que tienen `id`.
- Los CTA (`nav.cta`, `hero.*`) apuntan a `#jugar` por defecto, que es la sección `finalCta`. Si la desactivas, cambia esos enlaces a una URL real; si no, el botón no llevará a ningún sitio.
- El orden de la página es el del array de `src/components/sections/registry.ts`.
- Si desactivas `journey`, el hero 3D sigue funcionando; solo desaparece la sección sticky.

### Placeholders del lazy loading y saltos de layout

Mientras llega el chunk de cada sección se reserva espacio con un placeholder cuya altura mínima (`min-h-*`) se define por sección en `registry.ts`, con la escala de espaciado de Tailwind (y `svh` para «La travesía»), por ejemplo `min-h-288 sm:min-h-192 lg:min-h-184`. No dependen del texto concreto: es un suelo orientativo, así que al cambiar el contenido de una sección no hace falta remedirla. Esto limita los saltos de layout (y los desajustes de ScrollTrigger) al sustituir el placeholder por la sección real. Si el contenido de una sección queda muy lejos de ese suelo, ajusta su clase en `registry.ts`. Medido con el contenido actual en 390, 768 y 1440 px, todas las secciones están dentro de ±4 % de lo reservado (la travesía en escritorio coincide exacta: 400 svh; en móvil, 200 svh + 19 rem, ±2 % a 360, 390 y 768 px táctil).

## Nueva marca

Todos los tokens de diseño están en `@theme` de `src/index.css` (el único CSS del proyecto; el resto son clases de Tailwind):

| Qué | Variables |
| --- | --- |
| Fondo y superficies | `--color-canvas`, `--color-surface*`, `--color-line` |
| Texto | `--color-ink`, `--color-ink-muted`, `--color-ink-subtle` |
| Acento principal / secundario | `--color-ember-300…700`, `--color-crystal-300…600` |
| Estado y grises | `--color-danger`, `--color-ash-50…900` |
| Fuentes | `--font-display` (titulares), `--font-sans` (texto) |
| Radios | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` |
| Sombras de acento | `--shadow-card`, `--shadow-ember`, `--shadow-crystal` (llevan el color de ember/crystal en `rgb()`; actualízalos si cambias esas escalas) |
| Nombre | `name` en `site.ts` (navbar, footer, `og:site_name`) |

**Los colores viven en dos sitios.** three.js necesita valores, no clases, así que `src/components/three/palette.ts` repite seis tokens. La clave `ember300` equivale a `--color-ember-300`. `npm run check:tokens` (incluido en `npm run lint`) falla si alguno difiere, si falta el token o si `meta.themeColor` no coincide con `--color-canvas`. También exige contraste WCAG AA (4,5:1) de `ink`, `ink-muted`, `ink-subtle`, `ember-300` y `crystal-300` sobre `canvas`, `surface` y `surface-raised`. (`ink-subtle` pasó de `#7a7269` a `#8f877d`, el mismo valor que `ash-400`, porque daba 3,65:1 en el pie.) El script solo comprueba los colores que ya están en `palette.ts`; si añades uno nuevo, sigue la misma convención de nombres.

## Metadatos y SEO

`index.html` no contiene valores de marca: `scripts/vite-plugin-site-meta.ts` (hook `transformIndexHtml`) inyecta desde `site.meta` el `lang`, el `<title>`, `description`, `theme-color`, el favicon y Open Graph (`og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name`, `og:url`) más `twitter:card`. Funciona igual en `dev` y en `build`.

- Rellena `meta.url` (por ejemplo `https://ashveil.example`) antes de publicar: sin él, `og:image` queda como ruta relativa y `og:url` se omite, y las redes sociales no resuelven la imagen.
- Las fuentes (`<link>` de Google Fonts) siguen en `index.html`; no salen de `site.ts`.
- `<html lang>` es `meta.lang`; no traduce los textos, que se editan en `site.ts`.

## Assets

Todo en `public/` salvo el modelo original, que vive en `source-assets/` (fuera de `public/`, así no llega a `dist/`; está en el repositorio, no en `.gitignore`, porque pesa 11 MB). Lo publicado se referencia por ruta absoluta (`/models/…`, `/images/…`).

| Asset | Ruta | Tamaño recomendado |
| --- | --- | --- |
| Modelo original (fuente, **no se publica**) | `source-assets/ashveil-hero-original.glb` | Libre (el actual pesa ~11 MB); texturas hasta 4096 px |
| Modelo optimizado (el que carga la web) | `public/models/ashveil-hero.glb` | Objetivo < 3 MB (el actual: ~2,6 MB) |
| Póster horizontal | `public/images/ashveil-hero-poster-landscape.webp` | 1600×900 px (16:9), < 60 KB |
| Póster vertical | `public/images/ashveil-hero-poster-portrait.webp` | 720×1464 px (≈1:2), < 60 KB |
| Póster de la travesía, horizontal | `public/images/ashveil-journey-poster-landscape.webp` | 1600×900 px (16:9), < 60 KB |
| Póster de la travesía, vertical | `public/images/ashveil-journey-poster-portrait.webp` | 720×1464 px (≈1:2), < 60 KB |
| Favicon | `public/favicon.svg` (ruta en `meta.favicon`) | SVG, o PNG 32×32 / 180×180; ICO también vale |
| Imagen social | `public/images/ashveil-og.jpg` (ruta en `meta.ogImage`) | 1200×630 px. La actual es un recorte centrado del póster horizontal del hero; sustitúyela por una propia del cliente |
| robots.txt | `public/robots.txt` | Permite todo. Si rellenas `meta.url`, añade `Sitemap: <url>/sitemap.xml` cuando tengas sitemap |

### Cambiar el modelo
1. Sustituye `source-assets/ashveil-hero-original.glb` y ejecuta `npm run optimize:model` (texturas a 2048 px, meshopt).
2. Si el modelo es otro, revisa en `src/components/three/` la posición del altar y los keyframes (`cameraPath.ts`), el encuadre y la iluminación (`HeroScene.tsx`); la escena está compuesta para el modelo actual.

### Regenerar los pósteres
Los pósteres se usan sin WebGL, con reduced motion, en gama baja, en móvil/táctil (la travesía) y mientras carga el modelo. En móvil el póster del hero es el LCP: la escena 3D se monta después del evento `load` (`useAfterLoad`) y se funde sobre él al pintar su primer frame; en escritorio se monta de inmediato. Tienen que coincidir con la cámara real, o el paso a la escena 3D se nota como un salto. Hay cuatro: hero y travesía, cada uno horizontal y vertical.

El procedimiento exacto (viewports, qué ocultar, tamaños) está en [src/components/three/README.md](src/components/three/README.md#pósteres). Resumen: `npm run dev`, esperar a que cargue el modelo, ocultar todo salvo el `<canvas>`, capturarlo y exportar a WebP con los tamaños de la tabla, manteniendo el nombre. Si cambias el modelo o la cámara del hero, regenera los del hero; si cambias el keyframe 0 de `cameraPath.ts` o el modelo, regenera los de la travesía.

## Estructura de configuración
- `src/config/site.ts` — contenido, metadatos y secciones activas (tipo `SiteConfig`).
- `src/components/sections/registry.ts` — orden, carga diferida y placeholder de cada sección.
- `src/index.css` — tokens de diseño.
- `src/components/three/palette.ts` — copia de colores para three.js.
- `scripts/` — `check-tokens.mjs`, `vite-plugin-site-meta.ts`, config de `gltf-transform`.

## Notas de diseño
- **Movimiento**: respeta `prefers-reduced-motion` con las variantes `motion-safe:` / `motion-reduce:` y el hook `usePrefersReducedMotion`.
- **Efectos**: halo del cursor (`components/effects/CustomCursor.tsx`, `data-cursor="crystal"` lo vuelve azul), grano de película (`FilmGrain.tsx`), titulares revelados (`ui/RevealHeading.tsx`), tarjetas con inclinación (`ui/TiltCard.tsx`) y sonido ambiente generado con Web Audio (`lib/ambientAudio.ts`, apagado por defecto). Todos se desactivan con reduced motion salvo el grano, que es estático, y el audio, que solo suena si se activa.

## Verificación y límites

Qué se comprobó, y con qué, en la última revisión (Chrome 155 estable en Windows, emulación con Playwright):

- **Alturas de placeholder** en 390, 768 y 1440 px: ±4 % respecto de `registry.ts`.
- **Contraste**: muestreo de los píxeles reales detrás de cada texto (incluye el canvas 3D, los pósteres y los degradados) en 1440, 1024, 820 y 390 px; sin fallos AA. No cubre los estados `:hover`.
- **axe-core** (WCAG 2 A/AA, 2.1, 2.2 AA y buenas prácticas): 0 violaciones en escritorio y móvil, con y sin reduced motion y con puntero táctil. Las comprobaciones de contraste sobre canvas o imagen las marca como «incompletas»; se cubren con el punto anterior.
- **Reduced motion** (emulado con `prefers-reduced-motion` desde el navegador): sin canvas, sin halo del cursor, sin tilt, sin animaciones en curso y todo el contenido visible.
- **Táctil** (`hasTouch` y `pointer: coarse` emulados): sin halo ni tilt; la travesía usa el póster.
- **Teclado**: recorrido con Tab de todos los elementos interactivos; todos con `:focus-visible` y anillo visible (incluidos FAQ y tabs).
- **Rendimiento**: Lighthouse sobre `npm run build` + `npm run preview`, 3 pasadas por factor de forma, con el throttling simulado de Lighthouse.

**No se ha probado**:
- **Safari** (macOS e iOS) ni **Firefox**: `backdrop-filter`, `svh`, `inert`, `color-mix`, `bg-radial`, WebGL y `position: sticky` con Lenis podrían comportarse distinto.
- **Dispositivos táctiles reales**: solo emulación; el rendimiento 3D en móvil, el scroll inercial y el teclado virtual no están verificados.
- **Reduced motion desde el sistema operativo**: solo se emuló desde el navegador.
- **Lectores de pantalla reales** (NVDA, JAWS, VoiceOver, TalkBack): axe no sustituye una prueba con voz; los tabs, el FAQ y el botón `aria-pressed` siguen WAI-ARIA, pero no se escucharon.
- **GPU real**: el WebGL se renderizó por software (SwiftShader); los FPS y tiempos del 3D no son representativos.
- **LCP y CLS** son medición local con emulación, no datos de campo.
- `meta.url` está vacío: no se comprobó Open Graph con una URL pública ni con los validadores de las redes sociales.

## Deuda técnica conocida

- **Un canvas WebGL por sección** (hero y travesía): ver [src/components/three/README.md](src/components/three/README.md#deuda-técnica-un-canvas-webgl-por-sección).
- **Rendimiento en móvil**: el póster es el LCP y three/R3F (`HeroScene`, ~990 kB, 265 kB gzip) y el GLB (2,6 MB) se piden tras `load`. Aun así el TBT sigue alto (≈ 3 s en Lighthouse móvil con WebGL por software) porque parsear y ejecutar three compite con el hilo principal justo después del load; medirlo en un dispositivo con GPU real.
