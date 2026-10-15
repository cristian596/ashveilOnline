import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`rounded-lg border border-line bg-surface-raised p-8 shadow-card ${className}`.trim()}
    />
  )
}
