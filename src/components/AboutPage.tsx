import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

const STATS = [
  { num: 2500, suffix: '+', label: 'Kids Taken Outdoors' },
  { num: 500, suffix: '+', label: 'Outings Completed' },
  { num: 12, suffix: '', label: 'Expert Guides' },
  { num: 100, suffix: '%', label: 'Safety Record' },
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

const LOCATIONS = [
  { name: 'Cubbon Park', desc: 'Heart of Bangalore — nature walks, bird watching, and sensory exploration for our youngest explorers.', tag: 'Little Explorers', accent: 'green' },
  { name: 'Ramanagara', desc: 'Famous for its dramatic rock formations — perfect for bouldering, rock climbing, and adventure activities.', tag: 'Junior Adventurers', accent: 'gold' },
  { name: 'Savandurga', desc: 'One of Asia\'s largest monolith hills — trekking, survival skills, and leadership challenges for pre-teens.', tag: 'Outdoor Leaders', accent: 'green' },
  { name: 'Bheemeshwari', desc: 'Cauvery Wildlife Sanctuary — multi-day camping, kayaking, and wildlife trails for our teen adventurers.', tag: 'Teen Expeditions', accent: 'gold' },
  { name: 'Bannerghatta', desc: 'National park and biological reserve — wildlife safaris, butterfly parks, and nature photography sessions.', tag: 'All Ages', accent: 'green' },
  { name: 'Nandi Hills', desc: 'Historic hill fortress with stunning sunrise viewpoints — cycling, trekking, and bird-watching excursions.', tag: 'Ages 8+', accent: 'gold' },
]

const FAQS = [
  { q: 'Is LookFarOutdoors a registered company?', a: 'Yes, LookFarOutdoors is a fully registered Indian private limited company. We operate with all necessary permits and insurance to run outdoor education programmes for children.' },
  { q: 'How do I book an outing for my child?', a: 'Simply fill out the inquiry form on our Contact page or message us on WhatsApp. We\'ll get back to you within 24 hours with available dates, pricing, and all the details you need.' },
  { q: 'What areas in Bangalore do you serve?', a: 'We serve all areas of Bangalore. Pick-up and drop-off points are arranged at convenient locations across the city. Most of our outdoor venues are within a 1–2 hour drive from central Bangalore.' },
  { q: 'Can I organise a private outing for a birthday or school group?', a: 'Absolutely! We love hosting birthday adventures, school field trips, and private group outings. Get in touch with the group size and preferred dates, and we\'ll create a custom itinerary just for you.' },
  { q: 'What happens if it rains on the day of the outing?', a: 'Light rain makes adventures even more exciting! We continue with most activities in light rain with appropriate rain gear. In case of heavy rain or severe weather warnings, we reschedule to the next available date at no extra cost.' },
]

const TIMELINE = [
  { year: '2019', title: 'The Spark', desc: 'Two childhood friends — Rahul and Nisha — run their first informal nature walk in Cubbon Park for a handful of neighbourhood kids. No website, no logo. Just a backpack full of curiosity.', accent: 'green' },
  { year: '2020', title: 'LookFarOutdoors Is Born', desc: 'Incorporated as a private limited company in Bangalore. The Little Explorers program launches officially with 18 children on the first session. Parents rave about the photo updates.', accent: 'gold' },
  { year: '2021', title: 'First Adventure Program', desc: 'Junior Adventurers launches at Ramanagara. Rock climbing proves to be an instant hit. The team grows to 5 guides. A waitlist forms for the first time.', accent: 'green' },
  { year: '2022', title: 'Going Overnight', desc: 'Outdoor Leaders debuts — the first LookFarOutdoors overnight program. 120 children attend in the inaugural year. A full first-aid certification program is introduced for all guides.', accent: 'gold' },
  { year: '2023', title: 'Teen Expeditions Launch', desc: 'The multi-day Teen Expeditions program brings conservation fieldwork to the curriculum. Partnerships formed with Bheemeshwari Wildlife Sanctuary and local forest departments.', accent: 'green' },
  { year: '2024', title: '2,500 Kids & Counting', desc: 'LookFarOutdoors crosses 2,500 children guided safely. The team now counts 12 certified guides. A new base camp facility opens at Savandurga, and school partnership programs begin.', accent: 'gold' },
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
  const statsRef = useRef<HTMLDivElement>(null)

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
      gsap.fromTo('.ap-manifesto__stat',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out', delay: 1.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Stats count-up
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = document.querySelectorAll<HTMLElement>('.ap-stat__num')
      els.forEach(el => {
        const target = parseInt(el.dataset.target || '0', 10)
        const suffix = el.dataset.suffix || ''
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.fromTo({ val: 0 }, { val: target, duration: 2, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(this.targets()[0].val) + suffix }
            }, {})
          },
        })
      })
      gsap.fromTo('.ap-stat',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Section reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline
      gsap.fromTo('.ap-timeline-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-timeline-section', start: 'top 80%', once: true } }
      )
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
      // Locations
      gsap.fromTo('.ap-location-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.ap-locations-section', start: 'top 82%', once: true } }
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
          <h1 className="ap-manifesto__headline" aria-label="We believe in kids who climb, explore, wonder and grow.">
            <span className="ap-manifesto__line" style={{ opacity: 0 }}>We believe in</span>
            <span className="ap-manifesto__line ap-manifesto__line--accent" style={{ opacity: 0 }}>kids who climb.</span>
            <span className="ap-manifesto__line" style={{ opacity: 0 }}>Kids who explore.</span>
            <span className="ap-manifesto__line ap-manifesto__line--accent" style={{ opacity: 0 }}>Kids who grow.</span>
          </h1>

          {/* Sub text + inline stats */}
          <p className="ap-manifesto__sub" style={{ opacity: 0 }}>
            LookFarOutdoors was born in Bangalore with a simple idea — that the outdoors is the best classroom, and every child deserves to experience it.
          </p>

          <div className="ap-manifesto__stats">
            <div className="ap-manifesto__stat" style={{ opacity: 0 }}>
              <span className="ap-manifesto__stat-num">2,500<span>+</span></span>
              <span className="ap-manifesto__stat-label">Kids outdoors</span>
            </div>
            <div className="ap-manifesto__stat-divider" aria-hidden="true" />
            <div className="ap-manifesto__stat" style={{ opacity: 0 }}>
              <span className="ap-manifesto__stat-num">500<span>+</span></span>
              <span className="ap-manifesto__stat-label">Outings completed</span>
            </div>
            <div className="ap-manifesto__stat-divider" aria-hidden="true" />
            <div className="ap-manifesto__stat" style={{ opacity: 0 }}>
              <span className="ap-manifesto__stat-num">100<span>%</span></span>
              <span className="ap-manifesto__stat-label">Safety record</span>
            </div>
          </div>
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

      {/* ── TIMELINE ─────────────────────────── */}
      <section className="ap-timeline-section">
        <div className="ap-timeline-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--gold-dark">Our Journey</span>
            <h2 className="ap-section-title">Five Years of <em>Adventure</em></h2>
            <p className="ap-section-sub">From a single nature walk to Bangalore's most trusted outdoor education company.</p>
          </div>
          <div className="ap-timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`ap-timeline-item ap-timeline-item--${item.accent}`}>
                <div className="ap-timeline-item__year">{item.year}</div>
                <div className="ap-timeline-item__connector" aria-hidden="true" />
                <div className="ap-timeline-item__card">
                  <h3 className="ap-timeline-item__title">{item.title}</h3>
                  <p className="ap-timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────── */}
      <section className="ap-mission-section">
        <div className="ap-mission-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--gold-dark">What Drives Us</span>
            <h2 className="ap-section-title">Mission &amp; <em>Vision</em></h2>
          </div>
          <div className="ap-mission-grid">
            <div className="ap-mission-card ap-mission-card--green">
              <div className="ap-mission-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>To build confident, resilient, and environmentally conscious young people through safe, age-appropriate outdoor education experiences that inspire a lifelong love for nature and adventure.</p>
            </div>
            <div className="ap-mission-card ap-mission-card--gold">
              <div className="ap-mission-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>To be India's most trusted outdoor education brand for children — where every child in every city has access to transformative outdoor experiences led by the best guides in the country.</p>
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

      {/* ── IMPACT STATS ─────────────────────── */}
      <section ref={statsRef} className="ap-stats-section">
        <div className="ap-stats-inner">
          <div className="ap-section-header">
            <h2 className="ap-section-title ap-section-title--light">Our Impact <em>So Far</em></h2>
            <p className="ap-section-sub">Numbers we're proud of — and growing every weekend.</p>
          </div>
          <div className="ap-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="ap-stat">
                <div
                  className="ap-stat__num"
                  data-target={s.num}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </div>
                <p className="ap-stat__label">{s.label}</p>
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

      {/* ── LOCATIONS ────────────────────────── */}
      <section className="ap-locations-section">
        <div className="ap-locations-inner">
          <div className="ap-section-header">
            <span className="section-label section-label--gold-dark">Our Playground</span>
            <h2 className="ap-section-title ap-section-title--light">Where We <em>Adventure</em></h2>
            <p className="ap-section-sub">Bangalore is uniquely blessed — incredible natural spaces are just a short drive from the city.</p>
          </div>
          <div className="ap-locations-grid">
            {LOCATIONS.map((loc, i) => (
              <div key={i} className={`ap-location-card ap-location-card--${loc.accent}`}>
                <div className="ap-location-card__glyph">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="ap-location-card__body">
                  <h3>{loc.name}</h3>
                  <p>{loc.desc}</p>
                  <span className={`ap-location-tag ap-location-tag--${loc.accent}`}>{loc.tag}</span>
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
