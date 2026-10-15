import { site } from '../../config/site'
import { Container } from '../layout/Container'
import { HeroBackdrop } from '../three/HeroBackdrop'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Heading } from '../ui/Heading'

export function Hero() {
  const { hero, name, tagline } = site
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden pt-section pb-16 lg:pb-24"
    >
      {/* Capa 1: escena 3D (o su fallback estático) */}
      <div className="absolute inset-0 -z-20">
        <HeroBackdrop />
      </div>

      {/* Capa 2: vignette. Oscurece bordes y la franja inferior para que el texto tenga contraste. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-[ellipse_75%_70%_at_50%_42%] from-transparent from-40% to-canvas"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-linear-to-t from-canvas via-canvas/80 to-transparent"
      />

      {/* Capa 3: contenido */}
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge tone="crystal">{hero.badge}</Badge>
        <Heading level={1} id="hero-title" className="drop-shadow-[0_2px_24px_var(--color-canvas)]">
          {name}
        </Heading>
        <p className="max-w-prose text-lg text-ink-muted text-pretty sm:text-xl">{tagline}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
          <Button href={hero.secondaryCta.href} variant="ghost" className="bg-canvas/40 backdrop-blur-sm">
            {hero.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  )
}
