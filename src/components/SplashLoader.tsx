import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const SESSION_KEY = 'latitude_splash_shown'

export default function SplashLoader({ onDone }: { onDone: () => void }) {
  const splashRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show once per session
    const alreadyShown = sessionStorage.getItem(SESSION_KEY)
    if (alreadyShown) {
      onDone()
      return
    }
    setShow(true)
    sessionStorage.setItem(SESSION_KEY, '1')
  }, [onDone])

  useEffect(() => {
    if (!show) return
    const splash = splashRef.current
    const wordmark = wordmarkRef.current
    const tagline = taglineRef.current
    if (!splash || !wordmark || !tagline) return

    const tl = gsap.timeline()

    // Pin icon draws in
    tl.fromTo('.sl-icon path',
      { strokeDashoffset: 200 },
      { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' }
    )
    // Wordmark letters stagger in
    tl.fromTo('.sl-letter',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
    // Tagline fades in
    tl.fromTo(tagline,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      '-=0.1'
    )
    // Hold
    tl.to({}, { duration: 0.4 })
    // Sweep the whole splash upward + fade
    tl.to(splash, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: onDone,
    })
  }, [show, onDone])

  if (!show) return null

  return (
    <div ref={splashRef} className="splash-loader">
      <div ref={wordmarkRef} className="splash-loader__inner">
        {/* Location pin icon — stroke-drawn */}
        <div className="sl-icon-wrap">
          <svg className="sl-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" width="56" height="56">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              stroke="var(--accent-warm)"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>
        </div>
        {/* Wordmark */}
        <div className="sl-wordmark">
          {'LATITUDE'.split('').map((l, i) => (
            <span key={i} className="sl-letter" style={{ opacity: 0 }}>{l}</span>
          ))}
        </div>
        {/* Tagline */}
        <p ref={taglineRef} className="sl-tagline" style={{ opacity: 0 }}>
          Kids Outdoor Adventures · Bangalore
        </p>
      </div>
    </div>
  )
}
