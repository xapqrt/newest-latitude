import { type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router-dom'
import { gsap } from 'gsap'

type Props = LinkProps & {
  children: ReactNode
}

/**
 * TransitionLink wraps react-router's <Link> with a GSAP page-wipe
 * animation before navigating. External / anchor links pass through.
 */
export default function TransitionLink({ to, onClick, children, ...props }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const href = typeof to === 'string' ? to : (to as { pathname?: string }).pathname ?? ''

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    if (!href.startsWith('/') || href.startsWith('//')) return
    if (href.startsWith('#')) return
    if (pathname === href) return

    e.preventDefault()

    const panel = document.querySelector<HTMLElement>('.page-transition-panel')
    if (!panel) { navigate(href); return }

    gsap.fromTo(panel,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          window.scrollTo(0, 0)
          navigate(href)
        },
      }
    )
  }

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}