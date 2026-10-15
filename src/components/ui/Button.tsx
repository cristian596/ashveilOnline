import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { focusRing } from './styles'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide uppercase ' +
  'cursor-pointer transition-[background-color,box-shadow,color,border-color] duration-(--duration-base) ease-out-expo ' +
  'motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50 ' +
  focusRing

const variants: Record<Variant, string> = {
  primary:
    'bg-ember-500 text-canvas shadow-ember hover:bg-ember-400',
  ghost:
    'border border-ash-600 text-ink hover:border-crystal-400 hover:text-crystal-300 hover:shadow-crystal',
}

type CommonProps = { variant?: Variant }
type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim()

  if (props.href !== undefined) {
    return <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes} />
  }
  return <button type="button" {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes} />
}
