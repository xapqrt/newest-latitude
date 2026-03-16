import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Intercept all <a> clicks for same-origin navigation — play wipe then navigate
export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return

      // Only intercept relative, same-origin, non-hash links
      const isRelative = href.startsWith('/') && !href.startsWith('//')
      const isHash = href.startsWith('#')
      const isExternal = target.target === '_blank'
      if (!isRelative || isHash || isExternal) return

      // Already on this page?
      if (window.location.pathname === href) return

      e.preventDefault()

      gsap.fromTo(panel,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.45,
          ease: 'power3.inOut',
          onComplete: () => {
            window.location.href = href
          },
        }
      )
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div ref={panelRef} className="page-transition-panel" aria-hidden="true" />
  )
}
