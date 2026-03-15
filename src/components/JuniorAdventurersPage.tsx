import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../program-detail.css'

gsap.registerPlugin(ScrollTrigger)

const ACTIVITIES = [
  {
    icon: '🧗',
    color: 'green',
    title: 'Rock Climbing',
    text: 'Guided climbs on Ramanagara\'s natural rock faces with full safety harnesses and helmets. Kids learn trust, problem-solving, and the thrill of reaching the top under expert supervision.',
  },
  {
    icon: '🔥',
    color: 'gold',
    title: 'Camping Basics',
    text: 'Hands-on tent setup, safe fire-starting techniques, and outdoor cooking fundamentals. Children gain practical life skills and the confidence that comes from self-reliance.',
  },
  {
    icon: '👥',
    color: 'green',
    title: 'Team Challenges',
    text: 'Collaborative obstacle courses, rope bridges, and problem-solving missions that can only be completed as a team. Kids learn communication, leadership, and how to support each other.',
  },
  {
    icon: '🧭',
    color: 'gold',
    title: 'Navigation',
    text: 'Introduction to compass reading and basic map skills through treasure hunts and orienteering courses. Kids develop spatial awareness and directional confidence in the outdoors.',
  },
]

const SCHEDULE = [
  { time: '7:00 AM — Arrival & Warm-Up', color: 'green', dot: 'green', desc: 'Meet at the base camp near Ramanagara. Safety briefing, gear distribution, warm-up games, and team formation.' },
  { time: '8:00 AM — Rock Climbing Session', color: 'green', dot: 'green', desc: 'Guided climbing on natural rock faces. Every child climbs at their own pace with belaying support and encouragement.' },
  { time: '10:30 AM — Snack & Free Exploration', color: 'gold', dot: 'gold', desc: 'Energy refuel with healthy snacks. Kids explore the area, skip rocks, and socialise in a natural playground.' },
  { time: '11:00 AM — Team Challenge', color: 'green', dot: 'green', desc: 'Obstacle course and team problem-solving missions. Communication, trust-building, and collaborative strategy.' },
  { time: '12:30 PM — Lunch', color: 'gold', dot: 'gold', desc: 'Nutritious lunch served outdoors. Vegetarian and Jain options always available. Rest and recharge time.' },
  { time: '1:30 PM — Navigation & Camping Skills', color: 'green', dot: 'green', desc: 'Compass introduction, treasure hunt orienteering, tent setup practice, and basic fire safety demonstration.' },
  { time: '3:00 PM — Wrap-Up & Awards', color: 'muted', dot: 'dark', desc: 'Group reflection circle, adventure badges, certificates, and photo sharing. Pick-up by 3:30 PM.' },
]

const SAFETY = [
  { title: 'Background-Verified Guides', text: 'Every guide undergoes thorough background checks and holds valid certifications.' },
  { title: 'First Aid on Site', text: 'Full first aid kit and trained first responder present at every session.' },
  { title: '1:8 Guide Ratio', text: 'Strict supervision ratio ensures every child is seen, supported, and safe.' },
  { title: 'Live Updates for Parents', text: 'Photo and text updates throughout the day so you always know your child is safe and having fun.' },
  { title: 'Certified Safety Equipment', text: 'All climbing gear, harnesses, and helmets are professionally maintained and certified for safety.' },
  { title: 'Weather Prepared', text: 'Shaded rest areas, rain plans, and full rescheduling in case of severe weather.' },
]

export default function JuniorAdventurersPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pd-hero__back',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      )
      gsap.fromTo('.pd-hero__age-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 }
      )
      gsap.fromTo('.pd-hero__headline',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo('.pd-hero__sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.8 }
      )
      gsap.to('.pd-hero__bg', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: '.pd-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.fromTo('.pd-stat-tile',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-stats__grid', start: 'top 88%', once: true } }
      )
      gsap.fromTo('.pd-overview__left',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-overview__inner', start: 'top 82%', once: true } }
      )
      gsap.fromTo('.pd-overview__img',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: '.pd-overview__inner', start: 'top 82%', once: true } }
      )
      gsap.fromTo('.pd-activity-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-activities__grid', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.pd-timeline-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-timeline', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.pd-safety-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-safety__grid', start: 'top 85%', once: true } }
      )
      gsap.fromTo('.pd-cta__inner > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-cta', start: 'top 85%', once: true } }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* ── HERO ── */}
      <div className="pd-hero">
        <div
          className="pd-hero__bg"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <a href="/programs" className="pd-hero__back" style={{ opacity: 0 }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            All Programs
          </a>
          <div className="pd-hero__age-badge" style={{ background: 'rgba(31,107,46,0.9)', opacity: 0 }}>Ages 8–10</div>
          <h1 className="pd-hero__headline" style={{ opacity: 0 }}>
            Junior <em>Adventurers</em>
          </h1>
          <p className="pd-hero__sub" style={{ opacity: 0 }}>
            Physical challenges, team-building and outdoor skills that push boundaries and build real confidence.
          </p>
        </div>
        <div className="pd-hero__wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,0 C360,70 1080,0 1440,56 L1440,70 L0,70 Z" fill="var(--forest-deep)" />
          </svg>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <section className="pd-stats">
        <div className="pd-stats__grid">
          {[
            { icon: '⏱', num: '8 hrs', label: 'Full-Day Program' },
            { icon: '👥', num: 'Max 15', label: 'Kids Per Group' },
            { icon: '🧑‍🏫', num: '1:8', label: 'Guide-to-Child Ratio' },
            { icon: '📍', num: 'Ramanagara', label: 'Near Bangalore' },
          ].map((s, i) => (
            <div key={i} className="pd-stat-tile" style={{ opacity: 0 }}>
              <span className="pd-stat-tile__icon">{s.icon}</span>
              <span className="pd-stat-tile__num">{s.num}</span>
              <span className="pd-stat-tile__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pd-overview">
        <div className="pd-overview__inner">
          <div className="pd-overview__left" style={{ opacity: 0 }}>
            <span className="pd-overview__label">Program Overview</span>
            <h2 className="pd-overview__title">Where Courage<br/>Meets <em>Adventure</em></h2>
            <p className="pd-overview__text">
              Junior Adventurers is built for kids aged 8 to 10 who are ready to push their limits. This full-day program combines physical challenges like rock climbing with team-based problem-solving that builds genuine resilience and self-confidence.
            </p>
            <p className="pd-overview__text">
              Set against the stunning backdrop of Ramanagara's rocky terrain, children learn camping fundamentals, basic navigation, and how to work together to overcome real obstacles — not just classroom exercises.
            </p>
            <p className="pd-overview__text">
              Every session is led by certified outdoor educators with a 1:8 guide-to-child ratio, ensuring personalised coaching and a safe, supportive environment for every adventurer.
            </p>
          </div>
          <div className="pd-overview__img" style={{ opacity: 0 }}>
            <img
              src="https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Kids rock climbing near Ramanagara"
            />
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className="pd-activities">
        <div className="pd-activities__inner">
          <div className="pd-section-header">
            <span className="pd-section-label pd-section-label--gold">What We Do</span>
            <h2 className="pd-section-title">Activities &amp; Experiences</h2>
            <p className="pd-section-sub">A full day packed with physical challenges, teamwork, and outdoor skills.</p>
          </div>
          <div className="pd-activities__grid">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="pd-activity-card" style={{ opacity: 0 }}>
                <div className={`pd-activity-card__icon pd-activity-card__icon--${a.color}`}>{a.icon}</div>
                <h3 className="pd-activity-card__title">{a.title}</h3>
                <p className="pd-activity-card__text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      <section className="pd-schedule">
        <div className="pd-schedule__inner">
          <div className="pd-section-header">
            <span className="pd-section-label pd-section-label--green">Schedule</span>
            <h2 className="pd-section-title">A Typical Day</h2>
          </div>
          <div className="pd-timeline">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="pd-timeline-item" style={{ opacity: 0 }}>
                <div className={`pd-timeline-dot pd-timeline-dot--${item.dot}`} />
                <div>
                  <p className={`pd-timeline-time pd-timeline-time--${item.color}`}>{item.time}</p>
                  <p className="pd-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ── */}
      <section className="pd-safety">
        <div className="pd-safety__inner">
          <div className="pd-section-header">
            <span className="pd-section-label pd-section-label--green">Your Peace of Mind</span>
            <h2 className="pd-section-title">Safety &amp; Care</h2>
          </div>
          <div className="pd-safety__grid">
            {SAFETY.map((s, i) => (
              <div key={i} className="pd-safety-card" style={{ opacity: 0 }}>
                <div className="pd-safety-card__icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                </div>
                <div>
                  <h3 className="pd-safety-card__title">{s.title}</h3>
                  <p className="pd-safety-card__text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pd-cta">
        <div className="pd-cta__inner">
          <div className="pd-cta__trust">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            Trusted by 2,500+ families
          </div>
          <h2 className="pd-cta__title">Ready for Real <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>Adventure?</em></h2>
          <p className="pd-cta__sub">Enquire now to reserve a spot for your young adventurer. Our team will get back to you within 24 hours.</p>
          <div className="pd-cta__actions">
            <a href="/contact?program=junior-adventurers" className="pd-cta__btn-primary">
              Enquire Now
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
            <a href="/programs" className="pd-cta__btn-outline">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              All Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
