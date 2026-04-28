import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    title: 'Safety Above All',
    desc: 'Zero compromise on safety. Every outing is risk-assessed, every guide is certified, and every child is accounted for.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    title: 'Child-First Design',
    desc: 'Every programme is designed around what kids need — not what\'s easiest for adults. Age-appropriate, engaging, and fun.',
    accent: 'gold',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.72L5.71 21l1-1.5A4.51 4.51 0 0 0 8 20c4 0 4-2 8-2s4 2 8 2v-2c-4 0-4-2-8-2-1.13 0-1.9.16-2.53.33C14.28 12.38 17 10 21 10V8c-1.95 0-3.69.54-5 1.5V8z"/>
      </svg>
    ),
    title: 'Leave No Trace',
    desc: 'We teach environmental stewardship by example. Every outing follows Leave No Trace principles to protect our natural spaces.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: 'Inclusive Community',
    desc: 'Adventure is for everyone. We actively create welcoming, inclusive spaces where every child feels they belong.',
    accent: 'gold',
  },
]

const SAFETY = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: 'Small Group Ratios',
    desc: '1:5 guide-to-child ratio for ages 5–7, and 1:8 for ages 8–16. Every child gets personal attention.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
      </svg>
    ),
    title: 'First Aid & Medical',
    desc: 'Comprehensive first-aid kits on every outing. All guides are Wilderness First Aid certified.',
    accent: 'gold',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: 'GPS Tracking & Updates',
    desc: 'Real-time GPS tracking and live photo updates sent to parents throughout the outing via WhatsApp.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    title: 'Insurance & Emergency Plans',
    desc: 'Every participant is covered by comprehensive insurance. Emergency protocols with tie-ups to nearby hospitals.',
    accent: 'gold',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Verified Guides',
    desc: 'Every guide goes through thorough background verification, police clearance, and reference checks.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
      </svg>
    ),
    title: 'Site Risk Assessments',
    desc: 'Every outdoor venue is personally scouted and risk-assessed by our team before any child steps foot there.',
    accent: 'gold',
  },
]

const FAQS = [
  { q: 'Is LookFarOutdoors a registered company?', a: 'Yes, LookFarOutdoors is a fully registered Indian private limited company. We operate with all necessary permits and insurance to run outdoor education programmes for children.' },
  { q: 'How do I book an outing for my child?', a: 'Simply fill out the inquiry form on our Contact page or message us on WhatsApp. We\'ll get back to you within 24 hours with available dates, pricing, and all the details you need.' },
  { q: 'What areas in Bangalore do you serve?', a: 'We serve all areas of Bangalore. Pick-up and drop-off points are arranged at convenient locations across the city. Most of our outdoor venues are within a 1–2 hour drive from central Bangalore.' },
  { q: 'Can I organise a private outing for a birthday or school group?', a: 'Absolutely! We love hosting birthday adventures, school field trips, and private group outings. Get in touch with the group size and preferred dates, and we\'ll create a custom itinerary just for you.' },
  { q: 'What happens if it rains on the day of the outing?', a: 'Light rain makes adventures even more exciting! We continue with most activities in light rain with appropriate rain gear. In case of heavy rain or severe weather warnings, we reschedule to the next available date at no extra cost.' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.38, ease: 'power2.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [open])

  return (
    <div className={`ap-faq-item${open ? ' ap-faq-item--open' : ''}`}>
      <button className="ap-faq-item__q" onClick={() => setOpen(o => !o)}>
        {q}
        <span className="ap-faq-item__chevron">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </span>
      </button>
      <div ref={bodyRef} className="ap-faq-item__a" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function AboutPage() {
  // Hero entrance — typographic manifesto style
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ap-manifesto__label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      )
      gsap.fromTo('.ap-manifesto__line',
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: 'power3.out', stagger: 0.18, delay: 0.4 }
      )
      gsap.fromTo('.ap-manifesto__sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 1.0 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Story
      gsap.fromTo('.ap-story__img',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ap-story', start: 'top 80%', once: true } }
      )
      gsap.fromTo('.ap-story__text',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ap-story', start: 'top 80%', once: true } }
      )
      // Mission cards
      gsap.fromTo('.ap-mission-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-mission-section', start: 'top 80%', once: true } }
      )
      // Values
      gsap.fromTo('.ap-value-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-values-section', start: 'top 80%', once: true } }
      )
      // Safety cards
      gsap.fromTo('.ap-safety-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-safety-section', start: 'top 82%', once: true } }
      )
      // FAQ
      gsap.fromTo('.ap-faq-item',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-faq-section', start: 'top 80%', once: true } }
      )
      // Section headers
      gsap.utils.toArray<HTMLElement>('.ap-section-header').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO — Typographic Manifesto ─────── */}
      <div className="ap-manifesto">
        {/* Decorative vertical line */}
        <div className="ap-manifesto__deco-line" aria-hidden="true" />

        <div className="ap-manifesto__inner">
          {/* Eyebrow label */}
          <span className="ap-manifesto__label section-label section-label--gold-dark" style={{ opacity: 0 }}>
            Our Story
          </span>

          {/* Giant headline — each line animates separately */}
          <h1 className="ap-manifesto__headline" aria-label="We believe in real terrain. Real challenges. Real discovery.">
            <span className="ap-manifesto__line" style={{ opacity: 0 }}>We believe in</span>
            <span className="ap-manifesto__line ap-manifesto__line--accent" style={{ opacity: 0 }}>real terrain.</span>
            <span className="ap-manifesto__line" style={{ opacity: 0 }}>Real challenges.</span>
            <span className="ap-manifesto__line ap-manifesto__line--accent" style={{ opacity: 0 }}>Real discovery.</span>
          </h1>

          {/* Sub text */}
          <p className="ap-manifesto__sub" style={{ opacity: 0 }}>
            Somewhere between the homework schedule and the tuition class, a child's day has been planned to the last minute. Lookfar Outdoors takes children outside into the forests, fields and the open country, giving them back the one thing modern childhood rarely offers: the chance to discover what they are truly capable of.
          </p>
        </div>

        {/* Bottom wave into next section */}
        <div className="ap-manifesto__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,0 C360,70 1080,0 1440,56 L1440,70 L0,70 Z" fill="var(--forest-deep)" />
          </svg>
        </div>
      </div>

      {/* ── OUR STORY ────────────────────────── */}
      <section className="ap-story">
        <div className="ap-story__inner">
          <div className="ap-story__img">
            <img
              src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Children exploring nature"
            />
            <div className="ap-story__img-badge">
              <span>Est. 2020</span>
              <span>Bangalore</span>
            </div>
          </div>
          <div className="ap-story__text">
            <span className="section-label section-label--gold-dark">How It Started</span>
            <h2 className="ap-section-title">Born From a <em>Simple Idea</em></h2>
            <p>LookFarOutdoors was founded with a simple belief: that children learn best when they're outside, hands in the dirt, eyes on the sky, and hearts full of curiosity.</p>
            <p>Growing up in Bangalore, we saw how quickly green spaces were disappearing — and with them, opportunities for kids to experience unstructured outdoor play. We started LookFarOutdoors to bridge that gap: connecting city children with the incredible natural landscapes just beyond their doorstep.</p>
            <p>What began as weekend nature walks in Cubbon Park has grown into a comprehensive outdoor education programme serving hundreds of families across Bangalore.</p>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────── */}
      <section className="ap-mission-section">
        <div className="ap-mission-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--gold-dark">Our Philosophy</span>
            <h2 className="ap-section-title">The <em>Manifesto</em></h2>
          </div>
          <div className="ap-mission-grid">
            <div className="ap-mission-card ap-mission-card--green">
              <div className="ap-mission-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8z"/>
                  <path d="M9 15l2-6 4 2-2 4z"/>
                </svg>
              </div>
              <h3>A Vessel, Not a Vehicle</h3>
              <p>We are not a vehicle for delivering classroom content. We are a vessel built to carry children into the unknown—through real terrain and real challenges—bringing them back more capable of navigating the world than when they left.</p>
            </div>
            <div className="ap-mission-card ap-mission-card--gold">
              <div className="ap-mission-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M18.2 4.8c-3.6-.9-6.8.1-8.9 2.2C7 9.3 6 12.5 6.9 16.1l.1.3-.8 2.8 2.8-.8.3.1c3.6.9 6.8-.1 8.9-2.2 2.3-2.3 3.2-5.5 2.3-9.1l-.1-.4-.4-.1zM11 16c-1.9-.6-2.8-2.4-2.3-4.4.8.9 1.9 1.6 3.3 2.1 1.4.5 2.7.6 3.9.4-.7 1.8-2.6 2.6-4.9 1.9z"/>
                </svg>
              </div>
              <h3>Encounter the Real</h3>
              <p>Children learn best when allowed to encounter something real. Not a simulation on a screen or a worksheet about ecosystems, but the actual forest floor and the real problem of where to go next when the trail is unclear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────── */}
      <section className="ap-values-section">
        <div className="ap-values-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--green-dark">Our Foundations</span>
            <h2 className="ap-section-title ap-section-title--light">Core <em>Values</em></h2>
            <p className="ap-section-sub">These principles guide every decision we make, every program we design, and every outing we lead.</p>
          </div>
          <div className="ap-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className={`ap-value-card ap-value-card--${v.accent}`}>
                <div className="ap-value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY STANDARDS ─────────────────── */}
      <section className="ap-safety-section">
        <div className="ap-safety-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--green-dark">Your Peace of Mind</span>
            <h2 className="ap-section-title ap-section-title--light">Safety <em>Standards</em></h2>
            <p className="ap-section-sub">Safety isn't a checkbox for us — it's our culture. Here's how we protect your child on every outing.</p>
          </div>
          <div className="ap-safety-grid">
            {SAFETY.map((s, i) => (
              <div key={i} className={`ap-safety-card ap-safety-card--${s.accent}`}>
                <div className="ap-safety-card__icon">{s.icon}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section className="ap-faq-section">
        <div className="ap-faq-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--green-dark">FAQ</span>
            <h2 className="ap-section-title ap-section-title--light">Common <em>Questions</em></h2>
          </div>
          <div className="ap-faq-list">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {/* Wave into CTA */}
        <div className="ap-faq-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#0a1f10" />
          </svg>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="ap-cta-section">
        <div
          className="ap-cta-bg"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="ap-cta-overlay" />
        <div className="ap-cta-inner">
          <span className="cta-pill" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            Trusted by 2,500+ families
          </span>
          <h2 className="ap-cta-headline">Ready to Start the <em>Adventure?</em></h2>
          <p className="ap-cta-sub">Your child's next great story starts outdoors. Get in touch and let's plan their first LookFarOutdoors experience.</p>
          <div className="cta-btns">
            <a href="/contact" className="cta-btn-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Get in Touch
            </a>
            <a href="/programs" className="cta-btn-secondary">
              Explore Programs
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
