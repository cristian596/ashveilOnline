import type { Plugin } from 'vite'
import type { SiteMeta } from '../src/config/site.ts'
import { PORTRAIT_MEDIA, POSTERS } from '../src/components/three/posters.ts'

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const FAVICON_TYPES: Record<string, string> = {
  svg: 'image/svg+xml',
  png: 'image/png',
  ico: 'image/x-icon',
}

/** Inyecta lang, title, description, Open Graph, favicon y theme-color de site.meta en index.html. */
export function siteMeta(site: { name: string; meta: SiteMeta }): Plugin {
  const { meta } = site
  const absolute = (path: string) => (meta.url ? `${meta.url}${path}` : path)
  const faviconType = FAVICON_TYPES[meta.favicon.split('.').pop() ?? '']

  // Preload del póster del hero (candidato a LCP). Uno por orientación, excluyentes entre sí, para que
  // un móvil en vertical no descargue el horizontal. Mismo URL que el <img>: el navegador lo reutiliza.
  const preloadPoster = (poster: { src: string; width: number }, media: string) =>
    [
      'link',
      {
        rel: 'preload',
        as: 'image',
        href: poster.src,
        imagesrcset: `${poster.src} ${poster.width}w`,
        imagesizes: '100vw',
        media,
        fetchpriority: 'high',
      },
    ] as const

  const tags = [
    preloadPoster(POSTERS.hero.portrait, PORTRAIT_MEDIA),
    preloadPoster(POSTERS.hero.landscape, `not all and ${PORTRAIT_MEDIA}`),
    ['meta', { name: 'description', content: meta.description }],
    ['meta', { name: 'theme-color', content: meta.themeColor }],
    ['link', { rel: 'icon', href: meta.favicon, ...(faviconType && { type: faviconType }) }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: site.name }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:locale', content: meta.locale }],
    ['meta', { property: 'og:image', content: absolute(meta.ogImage) }],
    ...(meta.url ? [['meta', { property: 'og:url', content: meta.url }] as const] : []),
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ] as const

  const render = ([tag, attrs]: (typeof tags)[number]) =>
    `<${tag} ${Object.entries(attrs)
      .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
      .join(' ')} />`

  return {
    name: 'site-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html
          .replace('%SITE_LANG%', () => escapeAttr(meta.lang))
          .replace('%SITE_TITLE%', () => escapeAttr(meta.title))
          .replace('<!--site-meta-->', () => tags.map(render).join('\n    ')),
    },
  }
}
