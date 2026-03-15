import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function NotFoundPage() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nf-code',
        { opacity: 0, y: -40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
      )
      gsap.fromTo('.nf-headline',
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.15 }
      )
      gsap.fromTo('.nf-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.35 }
      )
      gsap.fromTo('.nf-btns',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.55 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="nf-section">
      {/* Ambient background leaves SVG */}
      <div className="nf-bg" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${100 + i * 90} ${80 + i * 60} Q${130 + i * 90} ${50 + i * 60} ${100 + i * 90} ${120 + i * 60} Q${70 + i * 90} ${50 + i * 60} ${100 + i * 90} ${80 + i * 60}Z`}
              fill="rgba(74,138,52,0.06)"
              transform={`rotate(${i * 23}, ${100 + i * 90}, ${100 + i * 60})`}
            />
          ))}
        </svg>
      </div>

      <div className="nf-inner">
        <div className="nf-code">404</div>
        <h1 className="nf-headline">
          Trail not found.<br />
          <em>Let's get you back.</em>
        </h1>
        <p className="nf-sub">
          This path leads nowhere — but there are plenty of real ones waiting for you.
        </p>
        <div className="nf-btns">
          <a href="/" className="btn-primary-hero">
            Back to Home
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </a>
          <a href="/programs" className="btn-ghost-hero">
            View Programs
          </a>
        </div>
      </div>
    </section>
  )
}
