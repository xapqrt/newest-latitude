import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROGRAMS = [
  {
    title: 'Little Explorers',
    age: 'Ages 5–7',
    duration: 'Half Day',
    location: 'Cubbon Park',
    desc: 'Nature walks, sensory play, animal tracking & outdoor crafts — igniting curiosity from the very first step.',
    img: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=800',
    href: '/little-explorers.html',
    ageColor: '#d4880a',
  },
  {
    title: 'Junior Adventurers',
    age: 'Ages 8–10',
    duration: 'Full Day',
    location: 'Ramanagara',
    desc: 'Rock climbing, camping basics, team challenges & survival skills for kids who are ready to push further.',
    img: 'https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/junior-adventurers.html',
    ageColor: '#1f6b2e',
  },
  {
    title: 'Outdoor Leaders',
    age: 'Ages 11–13',
    duration: 'Weekend',
    location: 'Savandurga',
    desc: 'Advanced trekking, navigation & real leadership development. Where capable kids become confident young adults.',
    img: 'https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/outdoor-leaders.html',
    ageColor: '#7a4520',
  },
  {
    title: 'Teen Expeditions',
    age: 'Ages 14–16',
    duration: '2–3 Days',
    location: 'Bheemeshwari',
    desc: 'Multi-day camps, wilderness first aid & environmental projects — forging the next generation of outdoor leaders.',
    img: 'https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/teen-expeditions.html',
    ageColor: '#144820',
  },
]

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackWrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  // ── Drag / wheel scroll ──────────────────────────────────────
  useEffect(() => {
    const wrap = trackWrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    let x = 0
    let targetX = 0
    let isDragging = false
    let startX = 0
    let startScrollX = 0
    let raf: number

    const maxX = () => -(track.scrollWidth - wrap.clientWidth + 96)
    const clamp = (v: number) => Math.max(maxX(), Math.min(0, v))

    const render = () => {
      x += (targetX - x) * 0.08
      gsap.set(track, { x })
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onWheel = (e: WheelEvent) => {
      const atStart = targetX >= 0 && e.deltaY < 0
      const atEnd = targetX <= maxX() && e.deltaY > 0
      if (atStart || atEnd) return
      e.preventDefault()
      targetX = clamp(targetX - e.deltaY * 1.2)
    }
    wrap.addEventListener('wheel', onWheel, { passive: false })

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true; startX = e.clientX; startScrollX = targetX
      wrap.style.cursor = 'grabbing'
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      targetX = clamp(startScrollX + (e.clientX - startX))
    }
    const onMouseUp = () => { isDragging = false; wrap.style.cursor = 'grab' }
    wrap.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    let touchStartX = 0, touchScrollX = 0
    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; touchScrollX = targetX }
    const onTouchMove = (e: TouchEvent) => { targetX = clamp(touchScrollX + (e.touches[0].clientX - touchStartX)) }
    wrap.addEventListener('touchstart', onTouchStart, { passive: true })
    wrap.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('wheel', onWheel)
      wrap.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      wrap.removeEventListener('touchstart', onTouchStart)
      wrap.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  // ── Cinematic entrance animations ───────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section bg reveal — clip-path wipe from bottom
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(6% 3% 6% 3% round 24px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Section label — fade up
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      )

      // Big headline — clip-path wipe + rise
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )

      // Sub text
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )

      // Cards — stagger up from below with slight rotation
      gsap.fromTo('.program-card',
        { opacity: 0, y: 80, rotateY: 4 },
        {
          opacity: 1, y: 0, rotateY: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: trackWrapRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="programs-section">
      {/* Decorative background texture lines */}
      <div className="programs-bg-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => <div key={i} className="programs-bg-line" />)}
      </div>

      <div className="programs-header">
        <div className="programs-header-left">
          <span ref={labelRef} className="section-label programs-label">Our Programs</span>
          <h2 ref={headlineRef}>
            Adventures for<br />
            <em>every age.</em>
          </h2>
          <p ref={subRef}>
            Four programs, one north star — getting your child outside,
            challenged, and loving every minute of it.
          </p>
        </div>
        <a href="/programs" className="programs-view-all">
          View all programs
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </a>
      </div>

      <div ref={trackWrapRef} className="programs-track-wrap">
        <div ref={trackRef} className="programs-track">
          {PROGRAMS.map((p, i) => (
            <a key={i} href={p.href} className="program-card" draggable={false}>
              <img src={p.img} alt={p.title} className="program-card__img" draggable={false} />
              <div className="program-card__gradient" />
              <div className="program-card__body">
                <span className="program-card__age" style={{ background: p.ageColor }}>{p.age}</span>
                <div className="program-card__title">{p.title}</div>
                <div className="program-card__meta">
                  <span>⏱ {p.duration}</span>
                  <span>📍 {p.location}</span>
                </div>
                <div className="program-card__desc">{p.desc}</div>
                <span className="program-card__cta">
                  Discover
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <p className="programs-drag-hint">← drag to explore →</p>
    </section>
  )
}
