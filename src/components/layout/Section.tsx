import type { ComponentProps } from 'react'
import { Container } from './Container'

export function Section({ className = '', children, ...props }: ComponentProps<'section'>) {
  return (
    <section {...props} className={`py-section lg:py-section-lg ${className}`.trim()}>
      <Container>{children}</Container>
    </section>
  )
}
