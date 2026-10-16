# Entrega de la plantilla

## Qué incluye

- Landing de una página en React 19 + Vite + TypeScript + Tailwind CSS 4, con GSAP, Lenis, Framer Motion y React Three Fiber.
- Hero con escena 3D y sección «La travesía» con scroll, más las secciones de pilares, clases, lore, línea de tiempo, comunidad, FAQ y CTA final (todas activables desde `site.ts`).
- Pósteres sin WebGL (hero y travesía, horizontal y vertical), modelo 3D optimizado y modelo original en `source-assets/`.
- Metadatos, Open Graph y favicon generados desde `site.ts`.
- Comprobación de colores y contraste (`npm run check:tokens`).
- Documentación en `docs/`, `THIRD_PARTY.md` y `LICENSE` (plantilla con marcador).
- Configuración de demo estática para Netlify (`netlify.toml`).
- Script `npm run package` para generar este mismo `.zip`.

## Qué es contenido de relleno

Todo lo siguiente es ficticio y hay que sustituirlo antes de publicar:

- **Cifras** de la sección `community` (jugadores, regiones, etc.).
- **Testimonios** de `community` (marcados `isExample`).
- **Fechas** de la línea de tiempo (`timeline`): hoy son trimestres genéricos («Primer trimestre»…) y sus hitos son ficticios.
- **FAQ** (`faq`): preguntas y respuestas de ejemplo.
- **Enlaces `#registro`** y los demás `#anclas` de ejemplo (`#jugar`, `#trailer`, `#terminos`…) en `nav.cta`, `hero.*`, `finalCta.cta` y `footer.links`.
- **Pie de página** (`footer`): los enlaces Términos, Privacidad y Soporte (`#terminos`, `#privacidad`, `#soporte`) y el texto legal.
- **Imagen social** (`ashveil-og.jpg`, recorte del póster) y nombre, tagline y lore de «Ashveil Online».

## Qué no está automatizado

- **Contenido legal**: licencia, términos, privacidad y cookies. Ver `LICENSE` y `THIRD_PARTY.md`.
- **Formularios y registro**: no hay backend; los botones solo enlazan.
- **Analítica, sitemap y SEO avanzado**: no incluidos; `robots.txt` permite todo.
- **Regeneración de pósteres** al cambiar modelo o cámara: manual (procedimiento en `src/components/three/README.md`).
- **Traducción**: `lang` no traduce; los textos se editan en `site.ts`.
- **Publicación**: la configuración está lista (`netlify.toml`), pero no se ha publicado ninguna demo.
- **Pruebas en Safari, Firefox, móviles reales y lectores de pantalla**: no realizadas (ver «Verificación y límites» en el README).
- **Temas de color**: los de `temas.md` pasan `check:tokens`, pero los pósteres y el modelo conservan los colores originales.

## Soporte

Para pedir soporte, escribe a **[TU CONTACTO]** indicando:

1. Qué intentabas hacer y el comando ejecutado.
2. El mensaje de error completo.
3. Versiones de Node y npm (`node -v`, `npm -v`) y sistema operativo.
4. Si modificaste `site.ts`, `index.css` o `palette.ts`, qué cambiaste.

Antes de escribir, ejecuta `npm run lint` y `npm run build` y revisa [instalacion.md](instalacion.md).
