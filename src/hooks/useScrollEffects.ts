import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../utils/motion'

/** Quick fade-up reveals for [data-reveal] and gentle parallax for [data-parallax] inside the given element. */
export function useScrollEffects(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((node) => {
        gsap.fromTo(node, { opacity: 0, y: 26 }, {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((node) => {
        gsap.fromTo(node, { yPercent: -7 }, {
          yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: node.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.3 },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [scope])
}
