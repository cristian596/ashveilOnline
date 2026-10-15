import type { HTMLAttributes } from 'react'

export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`mx-auto w-full max-w-content px-gutter sm:px-8 ${className}`.trim()} />
}
