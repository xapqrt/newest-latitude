import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01',
    title: 'Safety First, Always',
    desc: 'Every guide holds First Aid & CPR certification. Strict 1:8 adult-to-child ratio. Comprehensive insurance on every outing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Guides Who Care',
    desc: "Not just outdoorsy — our educators are trained in child development and genuinely invested in your child's growth.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Real Nature. Real City.',
    desc: 'Lush forests, ancient granite boulders, river valleys — all within an hour of Bangalore. No flight required.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Growth You Can See',
    desc: 'Resilience, teamwork, decision-making, self-trust. Parents tell us they notice it the moment their kids come home.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/>
      </svg>
    ),
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header label fade up
      gsap.fromTo('.whyus-header .section-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        }
      )

      // Header headline — clip reveal
      gsap.fromTo('.whyus-header h2',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: headerRef.current, start: 'top 78%', once: true },
        }
      )

      // Items — flip open from flat (scaleY 0→1) + back.out stomp + stagger
      gsap.utils.toArray<HTMLElement>('.whyus-item').forEach((item, i) => {
        gsap.fromTo(item,
          { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
          {
            scaleY: 1, opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.3)',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 62%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="whyus-section">
      <div className="whyus-inner">
        <div ref={headerRef} className="whyus-header">
          <span className="section-label">Why Parents Trust Us</span>
          <h2>
            Built on a single promise:<br />
            <span>your child comes back different.</span>
          </h2>
        </div>
        <div className="whyus-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="whyus-item">
              <span className="whyus-num">{f.num}</span>
              <div className="whyus-icon">{f.icon}</div>
              <div className="whyus-title">{f.title}</div>
              <p className="whyus-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
