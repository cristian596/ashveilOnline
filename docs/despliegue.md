# Despliegue

El resultado de `npm run build` es un sitio **estático** en `dist/`. Se puede publicar en cualquier hosting de archivos estáticos. Principal: **Netlify**. Alternativas: **Vercel** (framework Vite, comando `npm run build`, salida `dist`) y **GitHub Pages** (publica el contenido de `dist/` con una GitHub Action).

## Netlify (principal)

El proyecto incluye [netlify.toml](../netlify.toml) con:

- comando de build: `npm run build`
- carpeta de salida: `dist`
- `NODE_VERSION = "22"` (Vite 8 exige Node 20.19+ o 22.12+)
- caché larga e inmutable para `/assets/*` (archivos con hash en el nombre)

Pasos:

1. Rellena `meta.url` (ver abajo).
2. Sube el proyecto a un repositorio (GitHub, GitLab o Bitbucket) y en Netlify elige **Add new site → Import an existing project**. Netlify lee `netlify.toml`; no hay que configurar nada más.
3. Alternativa sin repositorio: ejecuta `npm run build` y arrastra la carpeta `dist/` a <https://app.netlify.com/drop>.

## ¿Hace falta configuración de SPA para las anclas?

No. Es una página única sin router: los enlaces `#clases`, `#jugar`, etc. son anclas dentro de `index.html` y las resuelve el navegador (con scroll suave de Lenis), por lo que no necesitan reescrituras. La única ruta real es `/`.

Solo haría falta una regla de fallback (`/* /index.html 200` en Netlify, o `rewrites` en Vercel) si en el futuro añades rutas con router, es decir, URL como `/registro` que no existen como archivo. No es el caso de esta plantilla, y por eso `netlify.toml` no la incluye.

## Dónde poner `meta.url`

En `src/config/site.ts`, dentro de `meta`, **sin barra final**:

```ts
meta: {
  // …
  url: 'https://tu-dominio.com',
}
```

Con `meta.url`, `og:image` pasa a ser una URL absoluta y se emite `og:url`. Sin él, las redes sociales no resuelven la imagen al compartir. Si tienes sitemap, añade `Sitemap: https://tu-dominio.com/sitemap.xml` a `public/robots.txt`.

## Qué se publica (y qué no)

Solo `dist/`. `source-assets/` (modelo original de ~11 MB) está fuera de `public/`, por lo que **no** llega a `dist/`; `node_modules/` tampoco. Para comprobarlo tras un build:

```bash
npm run build
node -e "console.log(require('fs').readdirSync('dist',{recursive:true}).filter(p=>/original|source-assets|node_modules/.test(p)))"
```

Debe imprimir `[]`.

## Otros hostings

- **Vercel**: importa el repositorio; detecta Vite. Si lo pide, comando `npm run build` y directorio de salida `dist`.
- **GitHub Pages**: construye con una GitHub Action y publica `dist/`. Con dominio propio o `usuario.github.io` no hay que cambiar nada; en `usuario.github.io/repo/` hay que añadir `base: '/repo/'` en `vite.config.ts` y revisar las rutas absolutas (`/images/…`, `/models/…`) del código y de `site.ts`, que asumen que el sitio está en la raíz.
