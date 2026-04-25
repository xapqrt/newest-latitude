import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import '../program-detail.css'
import overviewImage from '../assets/lookfar-1.jpg'

const ACTIVITIES = [
  {
    icon: '⛰️',
    color: 'green',
    title: 'Active Exploration',
    text: 'Rappel down rock faces and trek through rugged valleys to explore hidden caves. These active, hands-on challenges safely push physical boundaries, helping kids build lasting resilience, confidence, and self-belief.',
  },
  {
    icon: '⛺',
    color: 'gold',
    title: 'Collaborative Building',
    text: 'Working in small groups, kids tackle real-world challenges like constructing lake rafts and building wilderness huts. It is a highly engaging way to naturally develop communication, problem-solving, and teamwork.',
  },
  {
    icon: '🤝',
    color: 'green',
    title: 'Connections & Reflections',
    text: 'Beyond the daily action, evenings are spent sharing stories around the campfire and participating in open reflection circles. These quieter moments foster deep empathy, lasting friendships, and self-awareness.',
  },
  {
    icon: '🌱',
    color: 'gold',
    title: 'Sensory Immersion',
    text: 'Touch, smell, listen, and explore. Kids engage all five senses as they dig in soil, splash in streams, feel bark textures, and listen to birdsong, building a lifelong connection with nature.',
  },
]

const SCHEDULE_DAYS = [
  {
    tab: 'Day 1',
    title: 'Day 1: Arrival & Group Cohesion',
    items: [
      {
        time: '06:00 AM — DEPARTURE & BASECAMP ARRIVAL',
        desc: 'Travel to the camp, welcome drinks, and basecamp orientation. (Breakfast at 9:00 AM).',
      },
      {
        time: '10:00 AM — TEAM-BUILDING CHALLENGES',
        desc: 'Ice-breaking games and group cohesion activities, followed by free-flowing social interaction to help the kids make friends.',
      },
      {
        time: '02:00 PM — LAKE RAFT-BUILDING',
        desc: 'After lunch, kids work in small teams to construct functional rafts on Hosadoddi Lake.',
      },
      {
        time: '06:30 PM — WILDERNESS SKILLS',
        desc: 'Evening snacks followed by hands-on challenges like hut building, bridge construction, or mock camp planning.',
      },
      {
        time: '09:00 PM — CAMPFIRE & STORYTELLING',
        desc: 'Dinner followed by group games and storytelling around the fire before lights out.',
      },
    ],
  },
  {
    tab: 'Day 2',
    title: 'Day 2: Adventure & Skills',
    items: [
      {
        time: '06:30 AM — MORNING MOVEMENT',
        desc: 'Wake up and start the day with guided yoga and movement, followed by a hearty breakfast.',
      },
      {
        time: '08:30 AM — ROCK RAPPELLING',
        desc: 'Safely navigating rock faces to push physical boundaries and build confidence.',
      },
      {
        time: '02:00 PM — AFTERNOON SKILL BLOCKS',
        desc: 'Post-lunch outdoor challenges like treasure hunts and tower-building.',
      },
      {
        time: '06:30 PM — REFLECTION CIRCLE',
        desc: 'Unstructured play and guided group reflection to process the day\'s experiences.',
      },
      {
        time: '09:00 PM — CAMPFIRE CHRONICLES',
        desc: 'Dinner, evening group games, and fireside storytelling under the stars.',
      },
    ],
  },
  {
    tab: 'Day 3',
    title: 'Day 3: Trek & Departure',
    items: [
      {
        time: '06:30 AM — MORNING FITNESS',
        desc: 'An energizing start to the final day, followed by breakfast.',
      },
      {
        time: '08:30 AM — VALLEY TREK & CAVE EXPLORATION',
        desc: 'An 8 km guided trek through Devaragudda Valley to explore hidden caves.',
      },
      {
        time: '02:00 PM — CLOSING SESSION',
        desc: 'Post-lunch group wrap-up, sharing experiences, and packing up the gear.',
      },
      {
        time: '05:00 PM — DEPARTURE',
        desc: 'Camp check-out and safe travel back to the drop-off point.',
      },
    ],
  },
] as const

const SAFETY = [
  { title: 'Verified Instructors', text: 'Every instructor undergoes thorough background checks and holds valid certifications.' },
  { title: 'First Aid on Site', text: 'Full first aid kit and trained first responder present at every session.' },
  { title: '1:3 Guide Ratio', text: 'A high-support setup ensures every child gets close supervision and personal coaching.' },
  { title: 'Live Updates for Parents', text: 'Photo and text updates throughout the session so you always know your child is safe and happy.' },
]

export default function LittleExplorersPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [activeDayTab, setActiveDayTab] = useState<(typeof SCHEDULE_DAYS)[number]['tab']>(SCHEDULE_DAYS[0].tab)
  const activeDay = SCHEDULE_DAYS.find((day) => day.tab === activeDayTab) ?? SCHEDULE_DAYS[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
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
          <h1 className="pd-hero__headline" style={{ opacity: 0 }}>
            Outdoor Education <em>Camp - 3D2N</em>
          </h1>
          <p className="pd-hero__sub" style={{ opacity: 0 }}>
            Blending hands-on learning with real outdoor adventure. Kids tackle active wilderness challenges to build confidence and real-world resilience.
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
            { icon: '⏱', num: '3 Days, 2 Nights', label: '' },
            { icon: '👥', num: 'Max 18', label: 'Kids Per Group' },
            { icon: '🧑‍🏫', num: '1:3', label: 'Guide-to-Child Ratio' },
            { icon: '📍', num: 'Kanakapura', label: '' },
          ].map((s, i) => (
            <div key={i} className="pd-stat-tile" style={{ opacity: 0 }}>
              <span className="pd-stat-tile__icon">{s.icon}</span>
              <span className="pd-stat-tile__num">{s.num}</span>
              {s.label ? <span className="pd-stat-tile__label">{s.label}</span> : null}
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
              This camp is designed to give kids (ages 7 to 12) the space to push their boundaries through real, hands-on adventure. From building rafts together to rappelling down rock faces and exploring valleys, the days are packed with active outdoor challenges that test their physical limits.
            </p>
            <p className="pd-overview__text">
              Beyond the thrills, we also focus deeply on how kids connect and grow. Through collaborative camp planning, open-ended team games, and daily reflection circles, they naturally develop vital soft skills like communication, empathy, and problem-solving. With a dedicated 1:3 guide-to-child ratio, every child receives the personalised support needed to build lasting confidence.
            </p>
          </div>
          <div className="pd-overview__img" style={{ opacity: 0 }}>
            <img
              src={overviewImage}
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
          <div className="pd-schedule-tabs" role="tablist" aria-label="Camp itinerary by day">
            {SCHEDULE_DAYS.map((day) => {
              const isActive = day.tab === activeDayTab
              return (
                <button
                  key={day.tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`pd-schedule-tab${isActive ? ' pd-schedule-tab--active' : ''}`}
                  onClick={() => setActiveDayTab(day.tab)}
                >
                  {day.tab}
                </button>
              )
            })}
          </div>
          <div key={activeDay.tab} className="pd-timeline-panel">
            <div className="pd-timeline">
              <p className="pd-timeline-day-label">{activeDay.title}</p>
              {activeDay.items.map((item) => (
                <div key={item.time} className="pd-timeline-item">
                  <div className="pd-timeline-dot pd-timeline-dot--green" />
                  <div>
                    <p className="pd-timeline-time pd-timeline-time--green">{item.time}</p>
                    <p className="pd-timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="pd-schedule-footnote">*Timings are indicative and can be adjusted based on group needs and locale.</p>
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
              { name: 'Garima S.', child: 'Mum of Arya, 9', stars: 5, text: 'Arya came home absolutely buzzing with excitement. She could not stop talking about the rappelling wall and rafting challenge. LookFarOutdoors has really helped her come out of her shell.' },
              { name: 'Bishwadeep', child: 'Dad of Kiran, 8', stars: 5, text: 'As a first outdoor camp experience for my son, I was a bit nervous. But the guides were warm, structured, and highly attentive. The 1:3 ratio meant Kiran always had the support he needed.' },
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
