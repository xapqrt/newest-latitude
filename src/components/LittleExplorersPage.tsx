import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import '../program-detail.css'

const ACTIVITIES = [
  {
    icon: '🌿',
    color: 'green',
    title: 'Nature Walks',
    text: 'Guided exploration of Bangalore\'s beautiful parks. Children learn to identify trees, birds, insects, and flowers while developing observation skills and environmental awareness.',
  },
  {
    icon: '🐾',
    color: 'gold',
    title: 'Animal Tracking',
    text: 'Learn to spot wildlife signs — footprints, feathers, nests, and burrows. Children develop patience and attention to detail while connecting with the creatures that share their world.',
  },
  {
    icon: '🎨',
    color: 'green',
    title: 'Outdoor Crafts',
    text: 'Create beautiful art using natural materials — leaf prints, bark rubbings, flower pressing, and nature collages. Creativity meets outdoor education in every session.',
  },
  {
    icon: '🌱',
    color: 'gold',
    title: 'Sensory Play',
    text: 'Touch, smell, listen, and explore. Children engage all five senses as they dig in soil, splash in streams, feel bark textures, and listen to birdsong — building a lifelong connection with nature.',
  },
]

const SCHEDULE = [
  { time: '7:30 AM — Arrival & Circle Time', color: 'green', dot: 'green', desc: 'Meet at the park entrance, introductions, safety briefing, and a fun warm-up activity to get everyone excited.' },
  { time: '8:00 AM — Nature Walk & Discovery', color: 'green', dot: 'green', desc: 'Guided walk through the park, identifying plants, insects, and birds. Kids use magnifying glasses and nature journals.' },
  { time: '9:30 AM — Snack Break', color: 'gold', dot: 'gold', desc: 'Healthy snacks provided in the shade. A short rest and time for free play and socialisation.' },
  { time: '10:00 AM — Hands-On Activity', color: 'green', dot: 'green', desc: 'Craft session, sensory play station, or animal tracking activity depending on the week\'s theme.' },
  { time: '11:15 AM — Wrap-Up & Sharing', color: 'muted', dot: 'dark', desc: 'Group sharing circle where kids show what they found or made. Badges and certificates for participation. Pick-up by 11:30 AM.' },
]

const SAFETY = [
  { title: 'Background-Verified Guides', text: 'Every guide undergoes thorough background checks and holds valid certifications.' },
  { title: 'First Aid on Site', text: 'Full first aid kit and trained first responder present at every session.' },
  { title: '1:6 Guide Ratio', text: 'Extra supervision for the youngest explorers, ensuring individual attention.' },
  { title: 'Live Updates for Parents', text: 'Photo and text updates throughout the session so you always know your child is safe and happy.' },
  { title: 'Parents Welcome', text: 'For this age group, parents are welcome to accompany their child on the session.' },
  { title: 'Weather Prepared', text: 'Shaded rest areas, rain plans, and full rescheduling in case of severe weather.' },
]

export default function LittleExplorersPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
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

      // Hero parallax
      gsap.to('.pd-hero__bg', {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pd-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Stats
      gsap.fromTo('.pd-stat-tile',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-stats__grid', start: 'top 88%', once: true },
        }
      )

      // Overview
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

      // Activity cards
      gsap.fromTo('.pd-activity-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-activities__grid', start: 'top 85%', once: true },
        }
      )

      // Timeline items
      gsap.fromTo('.pd-timeline-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-timeline', start: 'top 85%', once: true },
        }
      )

      // Safety cards
      gsap.fromTo('.pd-safety-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-safety__grid', start: 'top 85%', once: true },
        }
      )

      // CTA
      gsap.fromTo('.pd-cta__inner > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pd-cta', start: 'top 85%', once: true },
        }
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
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <a href="/programs" className="pd-hero__back" style={{ opacity: 0 }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            All Programs
          </a>
          <div className="pd-hero__age-badge" style={{ background: 'rgba(232,150,10,0.9)', opacity: 0 }}>Ages 5–7</div>
          <h1 className="pd-hero__headline" style={{ opacity: 0 }}>
            Little <em>Explorers</em>
          </h1>
          <p className="pd-hero__sub" style={{ opacity: 0 }}>
            An introduction to the wonders of the natural world through sensory play, guided nature walks, and creative outdoor crafts.
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
            { icon: '⏱', num: '4 hrs', label: 'Half-Day Program' },
            { icon: '👥', num: 'Max 12', label: 'Kids Per Group' },
            { icon: '🧑‍🏫', num: '1:6', label: 'Guide-to-Child Ratio' },
            { icon: '📍', num: 'Cubbon Park', label: '& Lalbagh Gardens' },
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
            <h2 className="pd-overview__title">Where Curiosity<br/>Meets <em>Nature</em></h2>
            <p className="pd-overview__text">
              Little Explorers is designed for the youngest adventurers — children aged 5 to 7 who are just beginning to discover the natural world around them.
            </p>
            <p className="pd-overview__text">
              Through hands-on sensory activities, guided nature walks, and creative crafts made from natural materials, your child will develop a deep sense of wonder and respect for the environment.
            </p>
            <p className="pd-overview__text">
              Every session is led by certified guides trained in early childhood outdoor education, with a 1:6 guide-to-child ratio to ensure every child gets personal attention and care.
            </p>
          </div>
          <div className="pd-overview__img" style={{ opacity: 0 }}>
            <img
              src="https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Young children exploring nature in Bangalore"
              loading="lazy"
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
            <p className="pd-section-sub">Every session is packed with hands-on learning and joyful exploration.</p>
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

      {/* ── REVIEWS ── */}
      <section className="pd-reviews">
        <div className="pd-reviews__inner">
          <div className="pd-section-header">
            <span className="pd-section-label pd-section-label--gold">Parent Reviews</span>
            <h2 className="pd-section-title">What Families Are <em>Saying</em></h2>
          </div>
          <div className="pd-reviews__grid">
            {[
              { name: 'Preethi S.', child: 'Mum of Arya, 6', stars: 5, text: 'Arya came home absolutely buzzing with excitement. She couldn\'t stop talking about the butterflies she found and the leaf prints she made. Latitude has turned her into a proper little nature lover!' },
              { name: 'Rajesh M.', child: 'Dad of Kiran, 5', stars: 5, text: 'As a first-time outdoor experience for my son, I was a bit nervous. But the guides were so warm and patient. The 1:6 ratio meant Kiran always had someone with him. He already wants to come back next weekend.' },
              { name: 'Divya K.', child: 'Mum of twins, 7', stars: 5, text: 'Both my kids went on the same session and had completely different favourite moments — one loved the bird walk, the other loved the mud play. The guides managed to engage every single child individually. Truly impressive.' },
              { name: 'Suresh P.', child: 'Dad of Ishaan, 6', stars: 4, text: 'Well organised, safe, and genuinely educational. Ishaan learned the names of five birds he\'d never noticed before. The photo updates throughout the day were a lovely touch for anxious parents like me.' },
            ].map((r, i) => (
              <div key={i} className="pd-review-card">
                <div className="pd-review-card__stars">
                  {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                </div>
                <p className="pd-review-card__text">"{r.text}"</p>
                <div className="pd-review-card__author">
                  <span className="pd-review-card__name">{r.name}</span>
                  <span className="pd-review-card__child">{r.child}</span>
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
          <h2 className="pd-cta__title">Ready to Let Them <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>Explore?</em></h2>
          <p className="pd-cta__sub">Enquire now to reserve a spot for your little one. Our team will get back to you within 24 hours.</p>
          <div className="pd-cta__actions">
            <a href="/contact?program=little-explorers" className="pd-cta__btn-primary">
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
