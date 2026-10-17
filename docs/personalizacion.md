# Personalización para una marca nueva

No hace falta tocar componentes: todo se hace en cuatro sitios.

| Qué | Dónde |
| --- | --- |
| Textos, enlaces, metadatos y secciones activas | `src/config/site.ts` |
| Colores, fuentes, radios, sombras | `@theme` de `src/index.css` |
| Colores de la escena 3D | `src/components/three/palette.ts` |
| Imágenes, modelo 3D, favicon | `public/` (y `source-assets/` para el modelo original) |

## Checklist

- [ ] **Nombre y tagline** — `name` y `tagline` en `site.ts`.
- [ ] **Metadatos** — `meta` en `site.ts`: título, descripción, `lang`, `locale`, `themeColor`, `ogImage`, `favicon` y `url` (ver [despliegue.md](despliegue.md)).
- [ ] **Textos** — cada sección tiene su bloque en `site.ts` (`hero`, `pillars`, `classes`, `lore`, `journey`, `timeline`, `community`, `faq`, `finalCta`). TypeScript avisa si falta un campo.
- [ ] **Secciones activas** — `sections` en `site.ts`. Una sección en `false` no se monta y desaparece de la navbar. Si desactivas `finalCta`, cambia los CTA que apuntan a `#jugar`.
- [ ] **Colores** — variables `--color-*` en `@theme` de `src/index.css` y, para la escena 3D, el mismo valor en `src/components/three/palette.ts`.
- [ ] **Fuentes** — `--font-display` y `--font-sans` en `@theme`, y el `<link>` de Google Fonts en `index.html`.
- [ ] **Modelo 3D** — sustituye `source-assets/ashveil-hero-original.glb`, ejecuta `npm run optimize:model` y revisa cámara e iluminación en `src/components/three/`.
- [ ] **Imágenes del hero y de la travesía** — cuatro WebP en `public/images/`. Los pósteres del hero son capturas de la escena 3D (procedimiento en `src/components/three/README.md`); las de la travesía son una ilustración de jungla que se sustituye por otra con el mismo nombre y tamaño:

  | Archivo | Tamaño | Peso orientativo |
  | --- | --- | --- |
  | `ashveil-hero-poster-landscape.webp` | 1600×900 px (16:9) | < 60 KB |
  | `ashveil-hero-poster-portrait.webp` | 720×1464 px (≈1:2) | < 60 KB |
  | `ashveil-journey-jungle-landscape.webp` | 1600×900 px (16:9) | < 140 KB (actual: 131 KB) |
  | `ashveil-journey-jungle-portrait.webp` | 720×1464 px (≈1:2) | < 70 KB (actual: 59 KB) |

  La imagen de la travesía se muestra a pantalla completa con `object-cover` y se oscurece abajo y en los bordes, así que deja la parte inferior y el lado izquierdo oscuros: ahí va el texto. Si cambia el tamaño, actualiza `width` y `height` en `src/components/three/posters.ts`. Los originales de mayor resolución están en `source-assets/journey-jungle/`.
- [ ] **Enlaces** — `nav.cta`, `hero.primaryCta`, `hero.secondaryCta`, `finalCta.cta` y `footer.links`. Sustituye los `#anclas` de ejemplo (`#jugar`, `#registro`, `#trailer`, `#terminos`…) por URL reales.
- [ ] **Datos de ejemplo** — cifras y testimonios de `community` están marcados `isExample`; cámbialos por datos reales.
- [ ] **Imagen social y favicon** — `public/images/ashveil-og.jpg` (1200×630) y `public/favicon.svg`.
- [ ] **Verificar** — `npm run lint` y `npm run build`.

## Regla de colores: `index.css` y `palette.ts` deben coincidir

three.js necesita valores, no clases de Tailwind, así que `palette.ts` repite seis colores de `index.css`. La clave `ember300` equivale a `--color-ember-300`:

| `palette.ts` | `index.css` |
| --- | --- |
| `canvas` | `--color-canvas` |
| `ash300` | `--color-ash-300` |
| `ember300` / `ember400` / `ember600` | `--color-ember-300` / `-400` / `-600` |
| `crystal400` | `--color-crystal-400` |

Además:

- `meta.themeColor` en `site.ts` debe ser igual a `--color-canvas`.
- Las sombras `--shadow-ember` y `--shadow-crystal` llevan el color en `rgb()`: actualízalas si cambias `ember-500` o `crystal-400`.
- El contraste de `ink`, `ink-muted`, `ink-subtle`, `ember-300` y `crystal-300` sobre `canvas`, `surface` y `surface-raised` debe ser de al menos 4,5:1.

`npm run check:tokens` (incluido en `npm run lint`) verifica todo esto y muestra qué color difiere. Ejecútalo cada vez que cambies colores. Dos paletas completas listas para pegar están en [temas.md](temas.md).

## Nota sobre el contenido

Los textos de `site.ts` son de relleno de la plantilla. Ver la lista en [entrega.md](entrega.md).
