# Temas alternos

Dos paletas oscuras completas, listas para pegar. Los nombres de los tokens no cambian (`ember` es el acento principal y `crystal` el secundario); solo cambian los valores.

Para aplicar un tema, en cuatro pasos:

1. **`src/index.css`**: sustituye todas las líneas `--color-*` del `@theme` (de `--color-canvas` a `--color-ash-900`) por el bloque «Colores» del tema.
2. **`src/index.css`**: sustituye las tres líneas `--shadow-card`, `--shadow-ember` y `--shadow-crystal` por el bloque «Sombras».
3. **`src/components/three/palette.ts`**: sustituye el objeto `scenePalette` por el bloque «palette.ts» (los mismos valores, para la escena 3D).
4. **`src/config/site.ts`**: pon `meta.themeColor` igual al `canvas` del tema.

Después ejecuta `npm run check:tokens`. Ambos temas lo pasan.

> Los pósteres de `public/images/` y el modelo 3D conservan sus colores originales (ámbar y azul). Con otra paleta, la escena 3D usa la niebla y las luces del tema, pero los pósteres no cambian hasta que los regeneres (ver `src/components/three/README.md`). Revisa el resultado en el navegador antes de entregarlo.

---

## Tema A — Esmeralda y oro

`meta.themeColor`: `#070d0b`

### Colores

```css theme=esmeralda-colores
  --color-canvas: #070d0b;
  --color-surface: #0e1613;
  --color-surface-raised: #15201c;
  --color-surface-overlay: #1d2b25;
  --color-line: #263630;

  --color-ink: #e6efe9;
  --color-ink-muted: #9db1a6;
  --color-ink-subtle: #8aa095;

  --color-ember-300: #9ff0c4;
  --color-ember-400: #4fd99a;
  --color-ember-500: #1fbf7a;
  --color-ember-600: #14935c;
  --color-ember-700: #0e6642;

  --color-crystal-300: #f5dd9a;
  --color-crystal-400: #e8c25a;
  --color-crystal-500: #c9a032;
  --color-crystal-600: #9a7620;

  --color-danger: #ef5b5b;

  --color-ash-50: #f1f5f2;
  --color-ash-100: #e0e8e3;
  --color-ash-200: #c5d1ca;
  --color-ash-300: #a7b6ad;
  --color-ash-400: #8aa095;
  --color-ash-500: #667a6f;
  --color-ash-600: #4b5c53;
  --color-ash-700: #34423b;
  --color-ash-800: #222d28;
  --color-ash-900: #131a17;
```

### Sombras

```css theme=esmeralda-sombras
  --shadow-card: 0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -12px rgb(0 0 0 / 0.7);
  --shadow-ember: 0 0 0 1px rgb(31 191 122 / 0.4), 0 8px 32px -6px rgb(31 191 122 / 0.45);
  --shadow-crystal: 0 0 0 1px rgb(232 194 90 / 0.35), 0 8px 32px -6px rgb(232 194 90 / 0.35);
```

### palette.ts

```ts theme=esmeralda-palette
export const scenePalette = {
  canvas: '#070d0b', // --color-canvas (fondo y niebla: así el corte del escenario se funde con la página)
  ash300: '#a7b6ad', // --color-ash-300
  ember300: '#9ff0c4', // --color-ember-300
  ember400: '#4fd99a', // --color-ember-400
  ember600: '#14935c', // --color-ember-600
  crystal400: '#e8c25a', // --color-crystal-400
} as const
```

---

## Tema B — Violeta y rosa

`meta.themeColor`: `#0c0912`

### Colores

```css theme=violeta-colores
  --color-canvas: #0c0912;
  --color-surface: #151120;
  --color-surface-raised: #1e182c;
  --color-surface-overlay: #292039;
  --color-line: #342a47;

  --color-ink: #eee9f6;
  --color-ink-muted: #a89fbd;
  --color-ink-subtle: #9288aa;

  --color-ember-300: #d9c2ff;
  --color-ember-400: #b794f6;
  --color-ember-500: #9567e8;
  --color-ember-600: #7442c4;
  --color-ember-700: #52298f;

  --color-crystal-300: #ffc2dc;
  --color-crystal-400: #ff8fbd;
  --color-crystal-500: #e8609a;
  --color-crystal-600: #b8407a;

  --color-danger: #f0525c;

  --color-ash-50: #f4f1f8;
  --color-ash-100: #e5e0ec;
  --color-ash-200: #cbc4d6;
  --color-ash-300: #b0a7bf;
  --color-ash-400: #9288aa;
  --color-ash-500: #716889;
  --color-ash-600: #554d6a;
  --color-ash-700: #3b3549;
  --color-ash-800: #272233;
  --color-ash-900: #17131f;
```

### Sombras

```css theme=violeta-sombras
  --shadow-card: 0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 12px 32px -12px rgb(0 0 0 / 0.7);
  --shadow-ember: 0 0 0 1px rgb(149 103 232 / 0.4), 0 8px 32px -6px rgb(149 103 232 / 0.45);
  --shadow-crystal: 0 0 0 1px rgb(255 143 189 / 0.35), 0 8px 32px -6px rgb(255 143 189 / 0.35);
```

### palette.ts

```ts theme=violeta-palette
export const scenePalette = {
  canvas: '#0c0912', // --color-canvas (fondo y niebla: así el corte del escenario se funde con la página)
  ash300: '#b0a7bf', // --color-ash-300
  ember300: '#d9c2ff', // --color-ember-300
  ember400: '#b794f6', // --color-ember-400
  ember600: '#7442c4', // --color-ember-600
  crystal400: '#ff8fbd', // --color-crystal-400
} as const
```

---

## Cómo se verificó

Cada tema se aplicó de forma temporal sobre `index.css`, `palette.ts` y `site.ts` (`meta.themeColor`) y se ejecutó `npm run check:tokens`; después se restauraron los archivos originales. Se comprobó con los bloques de este mismo documento, no con copias. La comprobación cubre coincidencia de colores y contraste AA del texto; no sustituye una revisión visual.
