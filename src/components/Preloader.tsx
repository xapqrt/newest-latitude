import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const compassDrawRef = useRef<SVGPathElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Draw compass stroke
    if (compassDrawRef.current) {
      tl.to(compassDrawRef.current, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      }, 0)
    }

    // Progress bar sweeps across
    if (barRef.current) {
      tl.to(barRef.current, {
        width: '100%',
        duration: 1.1,
        ease: 'power1.inOut',
      }, 0.1)
    }

    // Fade the entire wrapper out — stays dark all the way to opacity 0
    tl.to(wrapRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete()
      }
    }, 1.4)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div ref={wrapRef} className="preloader">
      <div className="preloader__content">
        {/* SVG Compass */}
        <svg className="preloader__compass" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" />
          <path
            ref={compassDrawRef}
            className="compass-draw"
            d="M40 5 A35 35 0 1 1 39.9 5 M40 40 L55 18 M40 40 L25 62 M40 15 L40 20 M40 65 L40 60 M15 40 L20 40 M65 40 L60 40"
          />
        </svg>

        <div className="preloader__brand">Latitude</div>

        <div className="preloader__bar-wrap">
          <div ref={barRef} className="preloader__bar" />
        </div>
      </div>
    </div>
  )
}
