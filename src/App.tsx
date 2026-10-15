import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Section } from './components/layout/Section'
import { Badge } from './components/ui/Badge'
import { Button } from './components/ui/Button'
import { Heading } from './components/ui/Heading'
import { site } from './config/site'

export default function App() {
  const { hero, name, tagline } = site
  return (
    <>
      <Navbar />
      <main id="inicio">
        <Section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,var(--color-ember-700)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_85%_10%,var(--color-crystal-600)_0%,transparent_70%)] bg-blend-soft-light">
          <div className="flex max-w-3xl flex-col items-start gap-8">
            <Badge tone="crystal">{hero.badge}</Badge>
            <Heading level={1}>{name}</Heading>
            <p className="max-w-prose text-lg text-ink-muted sm:text-xl">{tagline}</p>
            <div className="flex flex-wrap gap-4">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}
