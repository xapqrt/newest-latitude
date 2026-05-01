import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import { buildWhatsAppLink } from '../utils/whatsapp'
import TransitionLink from './TransitionLink'
import { optimizeImage } from '../utils/images'

const BG = optimizeImage('https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200')

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Section reveal — scale up from slightly smaller
      gsap.fromTo(sectionRef.current,
        { clipPath: 'inset(4% 2% 4% 2% round 20px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )

      // Headline — big slam down
      gsap.fromTo('.cta-inner h2',
        { opacity: 0, y: -60, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.cta-inner', start: 'top 85%', once: true },
        }
      )

      // Sub text
      gsap.fromTo('.cta-inner p',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4,
          scrollTrigger: { trigger: '.cta-inner', start: 'top 82%', once: true },
        }
      )

      // Buttons stagger
      gsap.fromTo('.cta-btns a',
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.1,
          duration: 0.7, ease: 'power2.out', delay: 0.55,
          scrollTrigger: { trigger: '.cta-btns', start: 'top 88%', once: true },
        }
      )

      // Pills
      gsap.fromTo('.cta-pill',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.6, ease: 'power2.out', delay: 0.7,
          scrollTrigger: { trigger: '.cta-pills', start: 'top 90%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section" id="contact">
      <div ref={bgRef} className="cta-bg" style={{ backgroundImage: `url(${BG})` }} />
      <div className="cta-overlay" />

      <div className="cta-inner">
        <h2>Ready to give your child an unforgettable adventure?</h2>
        <p>Whether you're curious about a specific program or want a custom group outing, we're here to help.</p>

        <div className="cta-btns">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn-primary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
            </svg>
            Chat on WhatsApp
          </a>
          <TransitionLink to="/contact" className="cta-btn-secondary">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Send a Message
          </TransitionLink>
        </div>

        <div className="cta-pills">
          <span className="cta-pill">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            100% Safe
          </span>
          <span className="cta-pill">
            <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
            1000+ Happy Kids
          </span>
          <span className="cta-pill">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            24hr Response
          </span>
        </div>
      </div>
    </section>
  )
}
