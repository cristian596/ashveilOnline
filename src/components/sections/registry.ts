import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { site, type SectionKey } from '../../config/site'

interface SectionEntry {
  key: SectionKey
  Component: LazyExoticComponent<ComponentType>
  /** id de la sección para las anclas; coincide con el de site.ts. */
  id?: string
  /**
   * Altura mínima del placeholder mientras llega el chunk, en clases de Tailwind (escala de
   * espaciado y svh, no píxeles medidos). Es un suelo orientativo, no depende del texto: cambiar
   * el contenido no obliga a remedirla. Las clases deben escribirse completas para que Tailwind las detecte.
   */
  placeholder: string
}

// Los chunks se piden al montar la sección, así que una sección desactivada nunca se descarga.
// El orden de este array es el orden de la página.
export const sectionRegistry: readonly SectionEntry[] = [
  {
    key: 'pillars',
    Component: lazy(() => import('./Pillars').then((m) => ({ default: m.Pillars }))),
    placeholder: 'min-h-288 sm:min-h-192 lg:min-h-184',
  },
  {
    key: 'classes',
    Component: lazy(() => import('./Classes').then((m) => ({ default: m.Classes }))),
    id: site.classes.id,
    placeholder: 'min-h-208 sm:min-h-180 lg:min-h-208',
  },
  {
    key: 'lore',
    Component: lazy(() => import('./Lore').then((m) => ({ default: m.Lore }))),
    id: site.lore.id,
    placeholder: 'min-h-264 sm:min-h-208 lg:min-h-240',
  },
  {
    key: 'journey',
    Component: lazy(() => import('./Journey').then((m) => ({ default: m.Journey }))),
    id: site.journey.id,
    placeholder: 'min-h-[400svh]',
  },
  {
    key: 'timeline',
    Component: lazy(() => import('./Timeline').then((m) => ({ default: m.Timeline }))),
    placeholder: 'min-h-224 sm:min-h-208 lg:min-h-240',
  },
  {
    key: 'community',
    Component: lazy(() => import('./Community').then((m) => ({ default: m.Community }))),
    id: site.community.id,
    placeholder: 'min-h-440 sm:min-h-336 lg:min-h-256',
  },
  {
    key: 'faq',
    Component: lazy(() => import('./Faq').then((m) => ({ default: m.Faq }))),
    placeholder: 'min-h-200 sm:min-h-200 lg:min-h-232',
  },
  {
    key: 'finalCta',
    Component: lazy(() => import('./FinalCta').then((m) => ({ default: m.FinalCta }))),
    id: site.finalCta.id,
    placeholder: 'min-h-160 sm:min-h-144 lg:min-h-188',
  },
]
