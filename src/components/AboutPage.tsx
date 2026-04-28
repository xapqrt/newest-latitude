import { useEffect } from 'react'
import { gsap } from 'gsap'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M3 17l5.2-6 3.2 3.8 2.6-3.3L21 17H3z"/>
        <path d="M7.3 9.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z"/>
      </svg>
    ),
    title: 'The Field is the School',
    desc: 'Every trail, tree, stream, and open ridge is a richer learning environment than any room with four walls. We go there deliberately and return changed.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8z"/>
        <path d="M12.8 7h-1.6v5.2l4.5 2.7.8-1.3-3.7-2.2V7z"/>
      </svg>
    ),
    title: 'Unstructured Time',
    desc: 'Children need space to be bored, to make things up, and to find out what genuinely interests them. That is how real motivation, and real attention, develops.',
    accent: 'gold',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M3 19l6.4-9.2 3.7 5 2.7-3.6L21 19H3z"/>
        <path d="M12 9.8l1.6 2.2h-3.2L12 9.8z"/>
      </svg>
    ),
    title: 'Risk is Part of Growing',
    desc: 'Climbing a rock or crossing a stream are not dangers to manage away. They are small, necessary rehearsals for a life of competence.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 3l1.9 3.9 4.3.6-3.1 3 .7 4.2-3.8-2-3.8 2 .7-4.2-3.1-3 4.3-.6L12 3z"/>
      </svg>
    ),
    title: 'We Trust Children',
    desc: 'Children are capable of far more than we tend to believe. Our role is to set the conditions for discovery, then have the discipline to step back and let it happen.',
    accent: 'gold',
  },
]

const COMMITMENTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M8 8V7a4 4 0 0 1 8 0v1h1.5A2.5 2.5 0 0 1 20 10.5v8A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-8A2.5 2.5 0 0 1 6.5 8H8zm2 0h4V7a2 2 0 1 0-4 0v1zm-4 3v7.5c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5V11h-4v1.2a1 1 0 1 1-2 0V11H6z"/>
      </svg>
    ),
    title: 'To the Child',
    desc: "We will not over-explain, over-manage, or over-protect you. We will bring you somewhere real and let you find out what you're made of.",
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10l9-7z"/>
      </svg>
    ),
    title: 'To the Parent',
    desc: 'We will bring your child home muddy, tired, and more themselves than when they left. That is what a good day looks like.',
    accent: 'gold',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M5 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h10V5H5z"/>
        <path d="M18 5h1a2 2 0 0 1 2 2v12h-2V7h-1V5z"/>
      </svg>
    ),
    title: 'To the School',
    desc: 'We will give your students experiences no syllabus can provide — returning them more ready to learn, more capable of attention, and more connected to the world around them.',
    accent: 'green',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2zm6.93 9h-3.02a15.7 15.7 0 0 0-1.16-5.02A8.04 8.04 0 0 1 18.93 11zM12 4.04c1.13 1.39 1.98 3.58 2.18 6.96H9.82c.2-3.38 1.05-5.57 2.18-6.96zM4.07 13h3.02a15.7 15.7 0 0 0 1.16 5.02A8.04 8.04 0 0 1 4.07 13zM7.09 11H4.07a8.04 8.04 0 0 1 4.18-5.02A15.7 15.7 0 0 0 7.09 11zm2.73 2h4.36c-.2 3.38-1.05 5.57-2.18 6.96-1.13-1.39-1.98-3.58-2.18-6.96zm4.93 5.02A15.7 15.7 0 0 0 15.91 13h3.02a8.04 8.04 0 0 1-4.18 5.02z"/>
      </svg>
    ),
    title: 'To the Land',
    desc: 'We will treat your forests, trails, and rivers as classrooms worthy of care — and teach every child who walks through them to do the same.',
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
      // Values/Promise cards (each section triggers independently)
      gsap.utils.toArray<HTMLElement>('.ap-values-section').forEach(section => {
        const cards = section.querySelectorAll('.ap-value-card')
        if (!cards.length) return
        gsap.fromTo(cards,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 80%', once: true } }
        )
      })
      // Safety cards
      gsap.fromTo('.ap-safety-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-safety-section', start: 'top 82%', once: true } }
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
            <h2 className="ap-section-title ap-section-title--light">The <em>Pillars</em></h2>
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

      {/* ── THE PROMISE ──────────────────────── */}
      <section className="ap-values-section">
        <div className="ap-values-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--green-dark">OUR COMMITMENT</span>
            <h2 className="ap-section-title ap-section-title--light">The <em>Promise</em></h2>
          </div>
          <div className="ap-values-grid">
            {COMMITMENTS.map((c, i) => (
              <div key={i} className={`ap-value-card ap-value-card--${c.accent}`}>
                <div className="ap-value-card__icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
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
