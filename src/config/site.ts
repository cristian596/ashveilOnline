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
    cta: { label: 'Reservar mi lugar', href: '#registro' } satisfies Cta,
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

