import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'

const STEPS = [
  {
    num: '1',
    title: 'Choose a Program',
    desc: 'Pick from our age-appropriate outdoor programs — from half-day nature walks to multi-day expeditions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
  {
    num: '2',
    title: 'Book Your Date',
    desc: "Select an available date from our calendar. We'll confirm within 24 hours and send you all the details.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
      </svg>
    ),
  },
  {
    num: '3',
    title: 'Go on the Adventure',
    desc: 'Show up, let our expert guides take over, and watch your child discover a world beyond screens.',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.hiw-header .section-label',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.hiw-header', start: 'top 85%', once: true },
        }
      )
      gsap.fromTo('.hiw-header h2',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: '.hiw-header', start: 'top 80%', once: true },
        }
      )
      gsap.fromTo('.hiw-header p',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: '.hiw-header', start: 'top 78%', once: true },
        }
      )

      // Connector line grows across
      gsap.fromTo('.hiw-connector',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.hiw-steps', start: 'top 75%', once: true },
        }
      )

      // Steps sequentially appear
      gsap.utils.toArray<HTMLElement>('.hiw-step').forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: {
              trigger: '.hiw-steps',
              start: 'top 78%',
              once: true,
            },
          }
        )
      })

      // CTA button
      gsap.fromTo('.hiw-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.55,
          scrollTrigger: { trigger: '.hiw-cta', start: 'top 88%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hiw-section">
      <div className="hiw-inner">
        <div className="hiw-header">
          <span className="section-label">Simple Process</span>
          <h2>
            How It <em>Works</em>
          </h2>
          <p>Getting your child on their next adventure takes just three steps.</p>
        </div>

        <div className="hiw-steps">
          <div className="hiw-connector" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <div key={i} className="hiw-step">
              <div className="hiw-step__icon-wrap">
                {step.icon}
                <span className="hiw-step__num">{step.num}</span>
              </div>
              <div className="hiw-step__title">{step.title}</div>
              <p className="hiw-step__desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="hiw-cta">
          <a href="/contact" className="btn-book">
            Book Now
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Wave divider into dark CTA section */}
      <div className="section-wave section-wave--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#0a1f10" />
        </svg>
      </div>
    </section>
  )
}
