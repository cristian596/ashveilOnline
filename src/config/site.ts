/** Enlace de texto fijo (footer). */
export interface NavLink {
  label: string
  href: string
}

export interface Cta {
  label: string
  href: string
}

/** Secciones que se pueden activar o desactivar desde `site.sections`. El hero siempre está. */
export type SectionKey =
  | 'pillars'
  | 'classes'
  | 'lore'
  | 'journey'
  | 'timeline'
  | 'community'
  | 'faq'
  | 'finalCta'

export type SectionToggles = Record<SectionKey, boolean>

/** Secciones con `id` propio: son las únicas a las que puede apuntar un enlace de la navbar. */
export type AnchorSectionKey = 'classes' | 'lore' | 'journey' | 'community' | 'finalCta'

/** Enlace de la navbar: apunta a una sección y desaparece si esa sección está desactivada. */
export interface SectionNavLink {
  label: string
  section: AnchorSectionKey
}

export interface SiteMeta {
  /** <title> y og:title. */
  title: string
  /** meta description y og:description. */
  description: string
  /** Atributo lang de <html>. */
  lang: string
  /** og:locale (por ejemplo es_ES, en_US). */
  locale: string
  /** Color de la barra del navegador en móvil. Debe coincidir con --color-canvas. */
  themeColor: string
  /** Ruta en public/ de la imagen para redes sociales (recomendado 1200×630). */
  ogImage: string
  /** URL pública del sitio, sin barra final. Vacía = og:url se omite y og:image queda relativa. */
  url: string
  /** Ruta en public/ del favicon (svg, png o ico). */
  favicon: string
}

interface SectionHead {
  eyebrow: string
  title: string
}

export interface SiteConfig {
  name: string
  tagline: string
  meta: SiteMeta
  sections: SectionToggles
  nav: {
    ariaLabel: string
    brandAriaLabel: string
    links: readonly SectionNavLink[]
    cta: Cta
    ambient: { label: string; shortLabel: string }
  }
  hero: { badge: string; primaryCta: Cta; secondaryCta: Cta }
  pillars: SectionHead & {
    items: readonly { id: string; title: string; description: string }[]
  }
  classes: SectionHead & {
    id: string
    intro: string
    tablistLabel: string
    roleLabel: string
    items: readonly { id: string; name: string; role: string; phrase: string }[]
  }
  lore: SectionHead & { id: string; paragraphs: readonly string[] }
  journey: SectionHead & {
    id: string
    intro: string
    stepsLabel: string
    steps: readonly { id: string; marker: string; title: string; text: string }[]
  }
  timeline: SectionHead & {
    listLabel: string
    items: readonly { id: string; date: string; title: string; description: string }[]
  }
  community: SectionHead & {
    id: string
    intro: string
    statsLabel: string
    stats: readonly { id: string; value: number; label: string }[]
    testimonialsLabel: string
    exampleBadge: string
    exampleNote: string
    testimonials: readonly {
      id: string
      quote: string
      author: string
      role: string
      isExample: boolean
    }[]
  }
  faq: SectionHead & {
    items: readonly { id: string; question: string; answer: string }[]
  }
  finalCta: { id: string; title: string; text: string; cta: Cta }
  footer: {
    ariaLabel: string
    year: number
    legal: string
    links: readonly NavLink[]
  }
}

/**
 * Única fuente del contenido del sitio. Personalizar la plantilla = editar este objeto.
 * `satisfies SiteConfig` hace que TypeScript avise si falta un campo o sobra uno.
 */
export const site = {
  name: 'Ashveil Online',
  tagline: 'Donde las brasas recuerdan lo que el velo olvidó.',
  meta: {
    title: 'Ashveil Online — MMORPG de fantasía oscura',
    description:
      'Ashveil Online es un MMORPG de fantasía oscura: un mundo en ruinas, brasas que aún arden y un velo a punto de romperse. Prepárate para entrar.',
    lang: 'es',
    locale: 'es_ES',
    themeColor: '#0a090b',
    ogImage: '/images/ashveil-og.jpg',
    url: '',
    favicon: '/favicon.svg',
  },
  // false = la sección no se monta, no descarga su chunk y desaparece de la navbar.
  sections: {
    pillars: true,
    classes: true,
    lore: true,
    journey: true,
    timeline: true,
    community: true,
    faq: true,
    finalCta: true,
  },
  nav: {
    ariaLabel: 'Navegación principal',
    brandAriaLabel: 'Ashveil Online, ir al inicio',
    links: [
      { label: 'El Mundo', section: 'lore' },
      { label: 'Clases', section: 'classes' },
      { label: 'Comunidad', section: 'community' },
    ],
    cta: { label: 'Jugar ahora', href: '#jugar' },
    // Botón de sonido ambiente (apagado por defecto). El estado lo anuncia aria-pressed.
    ambient: {
      label: 'Sonido ambiente',
      shortLabel: 'Ambiente',
    },
  },
  hero: {
    badge: 'Acceso anticipado próximamente',
    primaryCta: { label: 'Comenzar el viaje', href: '#jugar' },
    secondaryCta: { label: 'Ver el tráiler', href: '#trailer' },
  },
  pillars: {
    eyebrow: 'Por qué Ashveil',
    title: 'Forjado para quienes no se rinden',
    items: [
      {
        id: 'combate',
        title: 'Combate táctico',
        description:
          'Posicionamiento, tiempos y sinergias deciden cada duelo. Sin automatismos: cada habilidad cuenta y cada error se paga.',
      },
      {
        id: 'raids',
        title: 'Raids cooperativos',
        description:
          'Jefes que exigen coordinación real. Veinte voces, un plan, y un velo que se cierra si alguien falla.',
      },
      {
        id: 'sin-pay-to-win',
        title: 'Sin pay-to-win',
        description:
          'Nada de lo que se compra te hace más fuerte. El poder se gana en las ruinas, nunca en la tienda.',
      },
      {
        id: 'mundo-vivo',
        title: 'Un mundo que recuerda',
        description:
          'Las decisiones de los gremios reescriben territorios, alianzas y rutas. Lo que quemas hoy, arde mañana.',
      },
    ],
  },
  classes: {
    id: 'clases',
    eyebrow: 'Elige tu juramento',
    title: 'Cuatro caminos, un solo velo',
    intro: 'Cada clase cumple un papel en el campo de batalla. Domina el tuyo y tu gremio hará el resto.',
    tablistLabel: 'Clases jugables',
    roleLabel: 'Rol táctico',
    items: [
      {
        id: 'guardacenizas',
        name: 'Guardacenizas',
        role: 'Vanguardia · Tanque',
        phrase: 'Mientras yo siga en pie, nadie a mi espalda conocerá la ceniza.',
      },
      {
        id: 'tejevelos',
        name: 'Tejevelos',
        role: 'Soporte · Sanador',
        phrase: 'El velo se rasga, sí. Yo conozco el hilo para volver a coserlo.',
      },
      {
        id: 'portabrasas',
        name: 'Portabrasas',
        role: 'Distancia · Daño en área',
        phrase: 'Dame un instante y una chispa, y te devolveré un incendio.',
      },
      {
        id: 'acechador',
        name: 'Acechador',
        role: 'Cuerpo a cuerpo · Daño en objetivo',
        phrase: 'No me verás llegar. Solo notarás que el jefe ya no respira.',
      },
    ],
  },
  lore: {
    id: 'mundo',
    eyebrow: 'El mundo',
    title: 'Cuando el velo se rasgó',
    paragraphs: [
      'Hubo un tiempo en que Ashveil fue un reino de torres de cristal y ríos de luz. Sus magos tejieron un velo para protegerlo de lo que dormía más allá del cielo.',
      'El velo no resistió. Una noche se rasgó de horizonte a horizonte, y de la grieta cayeron brasas que no se apagan: ciudades enteras ardieron sin consumirse.',
      'Hoy los supervivientes se agrupan en gremios, rodean los fuegos eternos y rescatan lo que la ceniza no ha reclamado. Cada ruina esconde un secreto; cada secreto, un precio.',
      'Tú llegas tarde y a tiempo a la vez. El velo está herido, no muerto, y alguien tendrá que decidir si se cose, se rompe del todo o se hereda.',
    ],
  },
  // Recorrido de cámara por las ruinas (sección sticky entre El mundo y la Temporada I).
  // Cada paso es el texto de un tramo de la trayectoria; si añades o quitas pasos, revisa
  // JOURNEY_KEYFRAMES en src/components/three/cameraPath.ts (un keyframe más que pasos).
  journey: {
    id: 'travesia',
    eyebrow: 'La travesía',
    title: 'Desciende hasta el altar',
    intro: 'Sigue el camino de las brasas entre los arcos caídos, hasta el lugar donde el velo se rasgó.',
    stepsLabel: 'Etapas de la travesía',
    steps: [
      {
        id: 'arcos',
        marker: 'I',
        title: 'Los arcos caídos',
        text: 'Lo que fue la puerta de la capital es hoy un umbral de piedra y ceniza. Aquí empieza cada expedición.',
      },
      {
        id: 'altar',
        marker: 'II',
        title: 'El altar de cristal',
        text: 'Los últimos fragmentos del velo aún laten en el centro de las ruinas. Quien los custodia, gobierna la región.',
      },
      {
        id: 'grieta',
        marker: 'III',
        title: 'Sobre la grieta',
        text: 'Desde lo alto se ve la herida entera. Cada gremio decide qué fragmento defender y cuál dejar arder.',
      },
    ],
  },
  timeline: {
    eyebrow: 'Temporada I',
    title: 'El camino al lanzamiento',
    listLabel: 'Hitos de la temporada',
    items: [
      {
        id: 'alfa',
        date: 'Primer trimestre',
        title: 'Alfa cerrada',
        description: 'Primeras pruebas de combate y de la zona inicial con un grupo reducido de jugadores.',
      },
      {
        id: 'beta',
        date: 'Segundo trimestre',
        title: 'Beta abierta',
        description: 'Se abren los servidores, las cuatro clases y las primeras mazmorras cooperativas.',
      },
      {
        id: 'acceso',
        date: 'Tercer trimestre',
        title: 'Acceso anticipado',
        description: 'Progresión completa hasta el nivel máximo y el primer asedio entre gremios.',
      },
      {
        id: 'lanzamiento',
        date: 'Cuarto trimestre',
        title: 'Lanzamiento oficial',
        description: 'Llegan las raids de temporada y el mundo persistente se abre para todos.',
      },
    ],
  },
  community: {
    id: 'comunidad',
    eyebrow: 'Comunidad',
    title: 'Un velo, muchas voces',
    intro: 'Miles de jugadores ya se preparan para cruzar. Encuentra tu gremio antes de que cierre la grieta.',
    statsLabel: 'Cifras de la comunidad',
    stats: [
      { id: 'jugadores', value: 128400, label: 'Jugadores registrados' },
      { id: 'servidores', value: 42, label: 'Servidores' },
      { id: 'gremios', value: 3150, label: 'Gremios' },
    ],
    testimonialsLabel: 'Testimonios de jugadores',
    exampleBadge: 'Ejemplo',
    exampleNote: 'Cifras y testimonios de ejemplo. Sustitúyelos por datos reales antes de publicar.',
    testimonials: [
      {
        id: 'maren',
        quote: 'Es la primera vez en años que una raid me obliga a hablar con mi gremio de verdad.',
        author: 'Maren Valk',
        role: 'Guardacenizas · Líder de gremio',
        isExample: true,
      },
      {
        id: 'ilian',
        quote: 'Sin pay-to-win se nota en cada partida. Aquí gana quien se prepara mejor.',
        author: 'Ilian Brae',
        role: 'Portabrasas',
        isExample: true,
      },
      {
        id: 'sorel',
        quote: 'El combate te castiga y te recompensa en la misma medida. No lo cambiaría.',
        author: 'Sorel Nym',
        role: 'Acechador',
        isExample: true,
      },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de cruzar el velo',
    items: [
      {
        id: 'plataformas',
        question: '¿En qué plataformas se podrá jugar?',
        answer: 'Ashveil Online llegará primero a PC. Las demás plataformas se anunciarán más adelante.',
      },
      {
        id: 'precio',
        question: '¿Tiene suscripción o es gratuito?',
        answer:
          'El juego base se compra una sola vez. No hay cuota mensual y la tienda solo ofrece elementos cosméticos.',
      },
      {
        id: 'pay-to-win',
        question: '¿Se puede pagar por ventajas de combate?',
        answer: 'No. Ningún objeto de pago altera el daño, la defensa ni la progresión de tu personaje.',
      },
      {
        id: 'grupo',
        question: '¿Puedo jugar en solitario?',
        answer:
          'Sí, hasta el nivel máximo. Las raids y los asedios están pensados para grupos y gremios organizados.',
      },
      {
        id: 'beta',
        question: '¿Cómo puedo entrar en la beta?',
        answer: 'Regístrate con tu correo y recibirás una invitación cuando se abra cada fase de pruebas.',
      },
      {
        id: 'idiomas',
        question: '¿En qué idiomas estará disponible?',
        answer: 'El lanzamiento incluirá español e inglés. Se añadirán más idiomas según la demanda.',
      },
    ],
  },
  finalCta: {
    id: 'jugar',
    title: 'El velo no esperará',
    text: 'Reserva tu nombre, elige tu juramento y llega antes de que las brasas lo cubran todo.',
    cta: { label: 'Reservar mi lugar', href: '#registro' },
  },
  footer: {
    ariaLabel: 'Pie de página',
    year: new Date().getFullYear(),
    legal: 'Todos los derechos reservados.',
    links: [
      { label: 'Términos', href: '#terminos' },
      { label: 'Privacidad', href: '#privacidad' },
      { label: 'Soporte', href: '#soporte' },
    ],
  },
} as const satisfies SiteConfig

