export interface NavLink {
  label: string
  href: string
}

export interface Cta {
  label: string
  href: string
}

export const site = {
  name: 'Ashveil Online',
  tagline: 'Donde las brasas recuerdan lo que el velo olvidó.',
  description:
    'Un MMORPG de fantasía oscura. Reúne a tu gremio, cruza el velo y reclama las cenizas de un mundo que se niega a morir.',
  nav: {
    ariaLabel: 'Navegación principal',
    brandAriaLabel: 'Ashveil Online, ir al inicio',
    links: [
      { label: 'El Mundo', href: '#mundo' },
      { label: 'Clases', href: '#clases' },
      { label: 'Comunidad', href: '#comunidad' },
    ] satisfies NavLink[],
    cta: { label: 'Jugar ahora', href: '#jugar' } satisfies Cta,
  },
  hero: {
    badge: 'Acceso anticipado próximamente',
    primaryCta: { label: 'Comenzar el viaje', href: '#jugar' } satisfies Cta,
    secondaryCta: { label: 'Ver el tráiler', href: '#trailer' } satisfies Cta,
  },
  footer: {
    ariaLabel: 'Pie de página',
    year: new Date().getFullYear(),
    legal: 'Todos los derechos reservados.',
    links: [
      { label: 'Términos', href: '#terminos' },
      { label: 'Privacidad', href: '#privacidad' },
      { label: 'Soporte', href: '#soporte' },
    ] satisfies NavLink[],
  },
} as const

