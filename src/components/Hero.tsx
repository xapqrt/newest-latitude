import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { buildWhatsAppLink } from '../utils/whatsapp'
import TransitionLink from './TransitionLink'
import { COPY } from '../data/copy'
import { prefersReducedMotion } from '../utils/motion'

type NetworkInformation = { saveData?: boolean; effectiveType?: string }

// Skip the video where it would cost more than it adds; the poster still shows.
function shouldPlayVideo() {
  if (prefersReducedMotion()) return false
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!connection) return true
  return !connection.saveData && !/(^|-)2g$/.test(connection.effectiveType ?? '')
}

function pickVideoSources() {
  if (!shouldPlayVideo()) return null
  const size = window.matchMedia('(orientation: portrait)').matches ? 'phone' : '1080'
  const base = import.meta.env.BASE_URL
  return { av1: `${base}hero/hero-${size}-av1.mp4`, h264: `${base}hero/hero-${size}.mp4` }
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [sources] = useState(pickVideoSources)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.5, delay: 0.2, ease: 'power2.out' })
      gsap.from('.hero-headline', { opacity: 0, y: 48, clipPath: 'inset(0 0 100% 0)', duration: 0.8, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-sub', { opacity: 0, y: 24, duration: 0.55, delay: 0.55, ease: 'power2.out' })
      gsap.from('.hero-btns > *', { opacity: 0, y: 18, duration: 0.5, delay: 0.75, stagger: 0.08, ease: 'power2.out' })
    })
    return () => ctx.revert()
  }, [])

  // Only spend battery and data while the hero is on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero-wrapper">
      <picture>
        <source media="(orientation: portrait)" srcSet={`${import.meta.env.BASE_URL}hero/hero-poster-phone.webp`} />
        <img className="hero-poster" src={`${import.meta.env.BASE_URL}hero/hero-poster-1080.webp`} alt="" fetchPriority="high" />
      </picture>

      {sources && (
        <video
          ref={videoRef}
          className={`hero-video-bg${playing ? ' hero-video-bg--playing' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setPlaying(true)}
        >
          <source src={sources.av1} type='video/mp4; codecs="av01.0.08M.08"' />
          <source src={sources.h264} type="video/mp4" />
        </video>
      )}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-headline">
          The greatest classroom<br /><em>has no walls.</em>
        </h1>
        <p className="hero-sub">
          {COPY.hero.sub}
        </p>
        <div className="hero-btns">
          <TransitionLink to="/programs" className="btn-primary-hero">
            See All Programs
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </TransitionLink>
          <a
            href={buildWhatsAppLink()}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost-hero"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
