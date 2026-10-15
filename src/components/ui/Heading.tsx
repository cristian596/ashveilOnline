import type { HTMLAttributes } from 'react'

type Level = 1 | 2 | 3 | 4
type Tag = `h${Level}`

const sizes: Record<Level, string> = {
  1: 'text-5xl sm:text-6xl lg:text-8xl',
  2: 'text-4xl sm:text-5xl lg:text-6xl',
  3: 'text-2xl sm:text-3xl',
  4: 'text-xl',
}

export function Heading({
  level = 2,
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level?: Level }) {
  const Tag = `h${level}` as Tag
  return (
    <Tag
      {...props}
      className={`font-display font-bold leading-[0.95] tracking-tight text-balance text-ink ${sizes[level]} ${className}`.trim()}
    />
  )
}
