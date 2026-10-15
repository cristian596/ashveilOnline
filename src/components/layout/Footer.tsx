import { site } from '../../config/site'
import { focusRing } from '../ui/styles'
import { Container } from './Container'

export function Footer() {
  const { footer, name } = site
  return (
    <footer aria-label={footer.ariaLabel} className="border-t border-line bg-surface py-12">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-ink-subtle">
          © {footer.year} {name}. {footer.legal}
        </p>
        <ul className="flex items-center gap-6">
          {footer.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:text-ember-300 motion-reduce:transition-none ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}

