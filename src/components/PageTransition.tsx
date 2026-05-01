import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

/**
 * Renders the page-wipe panel and slides it back down when the route
 * changes (after TransitionLink has navigated to a new page).
 */
export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    // Wait one frame for the new page to render, then slide panel away
    requestAnimationFrame(() => {
      gsap.fromTo(panel,
        { yPercent: 0 },
        { yPercent: 100, duration: 0.45, ease: 'power3.inOut' }
      )
    })
  }, [location.pathname])

  return (
    <div ref={panelRef} className="page-transition-panel" aria-hidden="true" />
  )
}