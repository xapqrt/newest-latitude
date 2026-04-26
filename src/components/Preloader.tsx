import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import lookfarWhiteLogo from '../assets/lookfar-white-logo.png'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    if (logoRef.current) {
      tl.fromTo(logoRef.current, {
        opacity: 0,
        y: 16,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
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
        <img ref={logoRef} src={lookfarWhiteLogo} alt="Lookfar Outdoors" className="preloader__logo" />

        <div className="preloader__bar-wrap">
          <div ref={barRef} className="preloader__bar" />
        </div>
      </div>
    </div>
  )
}
