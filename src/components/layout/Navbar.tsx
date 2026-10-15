import { site } from '../../config/site'
import { Button } from '../ui/Button'
import { focusRing } from '../ui/styles'
import { Container } from './Container'

export function Navbar() {
  const { nav, name } = site
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a
          href="#inicio"
          aria-label={nav.brandAriaLabel}
          className={`font-display text-2xl font-bold tracking-wide text-ink ${focusRing}`}
        >
          {name}
        </a>
        <nav aria-label={nav.ariaLabel} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium text-ink-muted transition-colors duration-(--duration-fast) hover:text-ember-300 motion-reduce:transition-none ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href={nav.cta.href} className="px-4 py-2 text-xs">
          {nav.cta.label}
        </Button>
      </Container>
    </header>
  )
}
