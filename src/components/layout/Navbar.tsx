import { site } from '../../config/site'
import { Button } from '../ui/Button'
import { focusRing } from '../ui/styles'
import { AmbientToggle } from './AmbientToggle'
import { Container } from './Container'

export function Navbar() {
  const { nav, name, sections } = site
  // Solo se enlazan las secciones activas; el href sale del id de cada sección.
  const links = nav.links.filter((link) => sections[link.section])
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:gap-6">
        <a
          href="#inicio"
          aria-label={nav.brandAriaLabel}
          className={`font-display text-xl font-bold tracking-wide whitespace-nowrap text-ink sm:text-2xl ${focusRing}`}
        >
          {name}
        </a>
        <nav aria-label={nav.ariaLabel} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.section}>
                <a
                  href={`#${site[link.section].id}`}
                  className={`text-sm font-medium text-ink-muted transition-colors duration-(--duration-fast) hover:text-ember-300 motion-reduce:transition-none ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <AmbientToggle />
          <Button href={nav.cta.href} className="px-4 py-2 text-xs whitespace-nowrap">
            {nav.cta.label}
          </Button>
        </div>
      </Container>
    </header>
  )
}
