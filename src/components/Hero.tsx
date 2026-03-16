import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { getLenis } from '../hooks/useSmoothScroll'

// ─────────────────────────────────────────────
// Scene data
// ─────────────────────────────────────────────
const HERO_VIDEO_SRC = '/1448735-sd_960_506_24fps.mp4'

const SCENES = [
  {
    eyebrow: null,
    headline: ['The greatest classroom', 'has no walls.'],
    sub: 'Award-winning outdoor education programs that trade screens for sunlight — building confidence, resilience, and wonder in children aged 5 to 16.',
    showButtons: true,
  },
  {
    eyebrow: 'Real Nature. Real Skills.',
    headline: ['Where capable kids become', 'confident leaders.'],
    sub: 'From granite boulder climbs at Ramanagara to overnight expeditions at Bheemeshwari — every program is designed to stretch and inspire.',
    showButtons: false,
  },
  {
    eyebrow: 'Your Child. Their Adventure.',
    headline: ['Four programs.', 'One north star.'],
    sub: 'Little Explorers to Teen Expeditions — age-appropriate challenges that turn every outing into a story worth telling.',
    showButtons: true,
  },
]

const LAST = SCENES.length - 1

// ─────────────────────────────────────────────
// Leaf particles
// ─────────────────────────────────────────────
function useLeafParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    interface Leaf {
      x: number; y: number; size: number; speed: number
      opacity: number; drift: number; rot: number; rotSpeed: number
    }
    const leaves: Leaf[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 5 + Math.random() * 10,
      speed: 0.2 + Math.random() * 0.4,
      opacity: 0.07 + Math.random() * 0.18,
      drift: (Math.random() - 0.5) * 0.3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.014,
    }))

    const drawLeaf = (l: Leaf) => {
      ctx.save()
      ctx.translate(l.x, l.y)
      ctx.rotate(l.rot)
      ctx.globalAlpha = l.opacity
      ctx.fillStyle = '#4a8a34'
      ctx.beginPath()
      ctx.moveTo(0, -l.size)
      ctx.quadraticCurveTo(l.size * 0.75, -l.size * 0.4, 0, l.size)
      ctx.quadraticCurveTo(-l.size * 0.75, -l.size * 0.4, 0, -l.size)
      ctx.fill()
      ctx.restore()
    }

    let raf: number
    let frame = 0
    let visible = true

    const animate = () => {
      if (!visible) return
      frame++
      if (frame % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        leaves.forEach(l => {
          l.y += l.speed; l.x += l.drift; l.rot += l.rotSpeed
          if (l.y > canvas.height + 20) { l.y = -20; l.x = Math.random() * canvas.width }
          drawLeaf(l)
        })
      }
      raf = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(animate) }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)
    raf = requestAnimationFrame(animate)

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(setSize, 200) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const wrapRef        = useRef<HTMLDivElement>(null)
  const videoRef       = useRef<HTMLVideoElement>(null)
  const transitioning  = useRef(false)
  const done           = useRef(false)
  const currentRef     = useRef(0)
  const touchStartY    = useRef(0)

  useLeafParticles(canvasRef)

  // ── Video: fade in on canplay, pause when off-screen ──
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const onReady = () => gsap.to(vid, { opacity: 1, duration: 0.8, ease: 'power1.inOut' })
    if (vid.readyState >= 3) { onReady() } else {
      vid.addEventListener('canplay', onReady, { once: true })
    }
    const visObs = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? vid.play().catch(() => {}) : vid.pause() },
      { threshold: 0 }
    )
    visObs.observe(vid)
    return () => { vid.removeEventListener('canplay', onReady); visObs.disconnect() }
  }, [])

  // ── Scene transition (stable, no deps) ──
  const goTo = useRef((next: number) => {
    if (transitioning.current) return
    if (next < 0 || next >= SCENES.length) return
    if (next === currentRef.current) return

    transitioning.current = true
    const from   = currentRef.current
    const fromEl = document.querySelector<HTMLElement>(`.hs${from}`)
    const toEl   = document.querySelector<HTMLElement>(`.hs${next}`)
    if (!fromEl || !toEl) { transitioning.current = false; return }

    const tl = gsap.timeline({
      onComplete: () => {
        transitioning.current = false
        currentRef.current = next
        setCurrent(next)
        if (next === LAST) {
          done.current = true
          getLenis()?.start()
        }
      },
    })

    tl.to(fromEl, { opacity: 0, y: next > from ? -28 : 28, duration: 0.5, ease: 'power2.in' }, 0)
    gsap.set(toEl, { opacity: 0, y: next > from ? 36 : -36 })
    tl.to(toEl, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.28)

    const scene = SCENES[next]
    if (scene.eyebrow) {
      const ey = toEl.querySelector<HTMLElement>('.hero-eyebrow')
      if (ey) tl.fromTo(ey, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.42)
    }
    const hl = toEl.querySelector<HTMLElement>('.hero-headline')
    if (hl) tl.fromTo(hl,
      { opacity: 0, y: 44, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power3.out' }, 0.48
    )
    const sb = toEl.querySelector<HTMLElement>('.hero-sub')
    if (sb) tl.fromTo(sb, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.66)
    const bt = toEl.querySelector<HTMLElement>('.hero-btns')
    if (bt) tl.fromTo(bt, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.8)
  })

  // Helper: engage lock at a given scene index
  const engageLock = useRef((atScene: number) => {
    done.current = false
    currentRef.current = atScene
    setCurrent(atScene)
    // Reset all scenes, show only atScene
    SCENES.forEach((_, i) => gsap.set(`.hs${i}`, { opacity: i === atScene ? 1 : 0, y: 0 }))
    getLenis()?.stop()
  })

  // ── Master init + scroll/touch/re-engage ──
  useEffect(() => {
    const heroEl = wrapRef.current
    if (!heroEl) return

    const heroInView = heroEl.getBoundingClientRect().bottom > 10

    if (heroInView) {
      // Normal load at top — lock scroll, animate scene 0 in
      done.current = false
      currentRef.current = 0

      const tryStop = () => {
        const lenis = getLenis()
        if (lenis) { lenis.stop(); return }
        requestAnimationFrame(tryStop)
      }
      tryStop()

      gsap.set('.hs0', { opacity: 1 })
      gsap.fromTo('.hs0 .hero-headline',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo('.hs0 .hero-sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.65 }
      )
      gsap.fromTo('.hs0 .hero-btns',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 }
      )
    } else {
      // Reloaded below hero — skip lock, show last scene silently
      done.current = true
      currentRef.current = LAST
      setCurrent(LAST)
      gsap.set(`.hs${LAST}`, { opacity: 1 })
    }

    // Scroll / touch handlers
    const COOLDOWN = 1100
    let lastFire = 0

    const tryAdvance = (dir: 1 | -1) => {
      const now = Date.now()
      if (now - lastFire < COOLDOWN) return
      lastFire = now
      const next = currentRef.current + dir
      if (next >= SCENES.length) {
        if (!done.current) { done.current = true; getLenis()?.start() }
        return
      }
      if (next < 0) return
      goTo.current(next)
    }

    const onWheel = (e: WheelEvent) => {
      if (done.current) return
      e.preventDefault()
      if (Math.abs(e.deltaY) < 6) return
      tryAdvance(e.deltaY > 0 ? 1 : -1)
    }
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      if (done.current) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) < 40) return
      tryAdvance(delta > 0 ? 1 : -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    // Re-engage when user scrolls back UP and hero is fully visible
    const reEngageObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (!done.current) return          // already locked
        if (window.scrollY < 10) return   // ignore initial page load trigger
        engageLock.current(LAST)
      },
      { threshold: 0.95 }
    )
    reEngageObs.observe(heroEl)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      reEngageObs.disconnect()
      getLenis()?.start()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={wrapRef} className="hero-wrapper">
      {/* Shared video — starts opacity:0, fades in on canplay */}
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        disablePictureInPicture
        disableRemotePlayback
        style={{ opacity: 0 }}
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <canvas ref={canvasRef} className="hero-particles" />

      {SCENES.map((scene, i) => (
        <div
          key={i}
          className={`hero-scene hs${i}`}
          style={{ opacity: 0, zIndex: SCENES.length - i }}
        >
          <div className="hero-content">
            {scene.eyebrow && (
              <p className="hero-eyebrow" style={{ opacity: 0 }}>{scene.eyebrow}</p>
            )}
            <h1 className="hero-headline" style={{ opacity: 0 }}>
              {scene.headline[0]}<br /><em>{scene.headline[1]}</em>
            </h1>
            <p className="hero-sub" style={{ opacity: 0 }}>{scene.sub}</p>
            {scene.showButtons && (
              <div className="hero-btns" style={{ opacity: 0 }}>
                <a href="/programs" className="btn-primary-hero">
                  Explore Programs
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Latitude!"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost-hero"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Scene progress dots */}
      <div className="hero-dots">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' hero-dot--active' : ''}`}
            aria-label={`Scene ${i + 1}`}
            onClick={() => goTo.current(i)}
          />
        ))}
      </div>

      {/* Scroll hint arrow on first scene — no text */}
      <div className={`scroll-indicator${current > 0 ? ' scroll-indicator--hidden' : ''}`}>
        <div className="scroll-indicator__arrow" />
      </div>

      {/* Bottom wave */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0a1f10" />
        </svg>
      </div>
    </section>
  )
}
