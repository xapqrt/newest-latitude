import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'

const TESTIMONIALS = [
  {
    quote: '"My son came back from the wilderness weekend with a newfound confidence. He hasn\'t stopped talking about how to build a shelter."',
    name: 'Priya Sharma',
    detail: 'Mother of Arjun, age 10',
    initials: 'PS',
  },
  {
    quote: '"The guides are extraordinary. They don\'t just keep kids safe — they inspire them to push their own limits."',
    name: 'Rohan Mehta',
    detail: 'Father of twins, ages 8 & 12',
    initials: 'RM',
  },
  {
    quote: '"Our daughter came home talking about ecosystems and asking to go back the very next weekend. Worth every rupee."',
    name: 'Kavitha Nair',
    detail: 'Parent of Ananya, age 9',
    initials: 'KN',
  },
  {
    quote: '"Best decision we made this year. My teenager actually put his phone down and engaged. Miraculous."',
    name: 'Sanjay Iyer',
    detail: 'Parent of Dev, age 15',
    initials: 'SI',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const quoteRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const transition = (next: number) => {
    if (!quoteRef.current || !authorRef.current) return
    const tl = gsap.timeline()
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -16,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setActive(next),
    })
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
    }, '+=0.05')
  }

  const goTo = (i: number) => {
    if (i === active) return
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    transition(i)
    // restart auto-advance after manual selection
    timerRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % TESTIMONIALS.length
        transition(next)
        return a
      })
    }, 5000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % TESTIMONIALS.length
        transition(next)
        return a
      })
    }, 5000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Section entrance
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-inner',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
      gsap.fromTo('.testimonials-stars',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const t = TESTIMONIALS[active]

  // Touch swipe support
  const touchStartX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 40) return
    const next = dx < 0
      ? (active + 1) % TESTIMONIALS.length
      : (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    goTo(next)
  }

  return (
    <section ref={sectionRef} className="testimonials-section">
      <div className="testimonials-bg-quote">&ldquo;</div>
      <div
        className="testimonials-inner"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Stars */}
        <div className="testimonials-stars">
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="testimonials-quote">
          {t.quote}
        </div>

        <div className="testimonials-divider" />

        {/* Author */}
        <div ref={authorRef} className="testimonials-author">
          <div className="testimonials-avatar">{t.initials}</div>
          <div>
            <div className="testimonials-name">{t.name}</div>
            <div className="testimonials-detail">{t.detail}</div>
          </div>
        </div>

        {/* Dots */}
        <div className="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials-dot${i === active ? ' testimonials-dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Wave divider into light HowItWorks section */}
      <div className="section-wave section-wave--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="#faf3e8" />
        </svg>
      </div>
    </section>
  )
}
