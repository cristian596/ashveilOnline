import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type MouseEvent, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap } from '../../lib/gsap'
import { focusRing } from './styles'

type Variant = 'primary' | 'ghost'

const base =
  'relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold tracking-wide uppercase ' +
  'cursor-pointer transition-[background-color,box-shadow,color,border-color] duration-(--duration-base) ease-out-expo ' +
  'motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50 ' +
  focusRing

const variants: Record<Variant, string> = {
  primary:
    'bg-ember-500 text-canvas shadow-ember hover:bg-ember-400',
  ghost:
    'border border-ash-600 text-ink hover:border-crystal-400 hover:text-crystal-300 hover:shadow-crystal',
}

/** La variante ghost es azul cristal al hover, así que el halo del cursor también. */
const cursor: Record<Variant, string | undefined> = { primary: undefined, ghost: 'crystal' }

/** Destello ámbar que nace donde se hace clic (o en el centro, con teclado) y se apaga en ~0.45 s. */
function useClickFlash(ref: RefObject<HTMLSpanElement | null>) {
  const reduced = usePrefersReducedMotion()

  return (event: MouseEvent<HTMLElement>) => {
    const flash = ref.current
    if (reduced || !flash) return
    const rect = event.currentTarget.getBoundingClientRect()
    // detail === 0: clic generado por teclado (Enter / Espacio), sin coordenadas útiles.
    const fromKeyboard = event.detail === 0
    gsap.killTweensOf(flash)
    gsap.fromTo(
      flash,
      {
        x: fromKeyboard ? rect.width / 2 : event.clientX - rect.left,
        y: fromKeyboard ? rect.height / 2 : event.clientY - rect.top,
        scale: 0,
        autoAlpha: 0.9,
      },
      { scale: 1, autoAlpha: 0, duration: 0.45, ease: 'power2.out' },
    )
  }
}

type CommonProps = { variant?: Variant }
type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const flashRef = useRef<HTMLSpanElement>(null)
  const triggerFlash = useClickFlash(flashRef)
  const classes = `${base} ${variants[variant]} ${className}`.trim()
  const content = (
    <>
      {/* -z-10 dentro del isolate: por encima del fondo del botón y por debajo del texto. */}
      <span
        ref={flashRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 -z-10 aspect-square w-[220%] -translate-1/2 rounded-pill bg-radial from-ember-300/90 to-transparent to-65% opacity-0"
      />
      {children}
    </>
  )

  if (props.href !== undefined) {
    const { onClick, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...rest}
        data-cursor={cursor[variant]}
        onClick={(event) => {
          triggerFlash(event)
          onClick?.(event)
        }}
        className={classes}
      >
        {content}
      </a>
    )
  }
  const { onClick, ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      type="button"
      {...rest}
      data-cursor={cursor[variant]}
      onClick={(event) => {
        triggerFlash(event)
        onClick?.(event)
      }}
      className={classes}
    >
      {content}
    </button>
  )
}
