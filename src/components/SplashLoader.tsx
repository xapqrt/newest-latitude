import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import lookfarWhiteLogo from '../assets/lookfar-white-logo.png'

const SESSION_KEY = 'lookfaroutdoors_splash_shown'

export default function SplashLoader({ onDone }: { onDone: () => void }) {
  const splashRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
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
    const logo = logoRef.current
    const tagline = taglineRef.current
    if (!splash || !logo || !tagline) return

    const tl = gsap.timeline()

    tl.fromTo(logo,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
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
      <div className="splash-loader__inner">
        <img ref={logoRef} src={lookfarWhiteLogo} alt="Lookfar Outdoors" className="sl-logo" />
        {/* Tagline */}
        <p ref={taglineRef} className="sl-tagline" style={{ opacity: 0 }}>
          Kids Outdoor Adventures · Bangalore
        </p>
      </div>
    </div>
  )
}
