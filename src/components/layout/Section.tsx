import type { HTMLAttributes } from 'react'
import { Container } from './Container'

export function Section({ className = '', children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section {...props} className={`py-section lg:py-section-lg ${className}`.trim()}>
      <Container>{children}</Container>
    </section>
  )
}
