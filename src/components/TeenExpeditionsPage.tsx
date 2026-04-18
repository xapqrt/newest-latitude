import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import '../program-detail.css'

const ACTIVITIES = [
  {
    icon: '🏕',
    color: 'green',
    title: 'Multi-Day Camps',
    text: 'Immersive three-day wilderness camps at Bheemeshwari and Kanakapura. Teens build endurance, adaptability, and the kind of grit that only comes from spending real time in the wild — far from screens and routines.',
  },
  {
    icon: '🌿',
    color: 'gold',
    title: 'Conservation Projects',
    text: 'Hands-on environmental work including trail restoration, biodiversity surveys, and habitat mapping. Teens develop a genuine connection to nature and the responsibility that comes with understanding ecosystems.',
  },
  {
    icon: '🩹',
    color: 'green',
    title: 'Wilderness First Aid',
    text: 'Practical first aid skills designed for remote environments — from wound care and splinting to emergency protocols and calling for help. Teens leave knowing how to act calmly and effectively when it matters.',
  },
  {
    icon: '🧩',
    color: 'gold',
    title: 'Problem Solving',
    text: 'Real-world scenario challenges with no easy answers. Teams must assess situations, allocate resources, and make decisions under pressure — building the strategic thinking and leadership mindset teens need for life.',
  },
]

const SCHEDULE = [
  // Day 1
  { day: 'Day 1 — Arrival & Base Camp', time: '6:30 AM — Departure from Bangalore', color: 'green', dot: 'green', desc: 'Group assembly and departure from Bangalore. Journey to Bheemeshwari with orientation briefing en route.' },
  { time: '10:00 AM — Camp Setup', color: 'green', dot: 'green', desc: 'Arrive at base camp. Teens set up their own tents, divide roles, and complete a site orientation with guides.' },
  { time: '2:00 PM — First Aid Training', color: 'gold', dot: 'gold', desc: 'Three-hour wilderness first aid practical: wound care, splinting, emergency signalling, and calm-under-pressure drills.' },
  { time: '6:30 PM — Campfire', color: 'gold', dot: 'gold', desc: 'Evening debrief around the campfire. Reflection prompts, peer sharing, and stargazing in the Bheemeshwari reserve.' },
  // Day 2
  { day: 'Day 2 — Expedition & Conservation', time: '6:00 AM — Dawn Trek', color: 'green', dot: 'green', desc: 'Pre-sunrise trek through the Kanakapura forest. Navigation by compass and landmark with rotating team leaders.' },
  { time: '10:00 AM — Conservation Project', color: 'green', dot: 'green', desc: 'Guided fieldwork: trail restoration, biodiversity data collection, or habitat mapping depending on season and site conditions.' },
  { time: '2:00 PM — Problem-Solving Challenge', color: 'gold', dot: 'gold', desc: 'Multi-stage wilderness scenario challenge. Teams face resource constraints, competing priorities, and real decisions.' },
  // Day 3
  { day: 'Day 3 — Reflection & Return', time: '6:30 AM — Leave No Trace', color: 'green', dot: 'green', desc: 'Full camp strike following Leave No Trace principles. Teens lead the pack-up with a guide inspection checklist.' },
  { time: '10:00 AM — Debrief & Certificates', color: 'muted', dot: 'dark', desc: 'Group reflection, expedition certificates, and awards ceremony. Return to Bangalore — arrival by 1:00 PM.' },
]

const SAFETY = [
  { title: 'Background-Verified Guides', text: 'Every guide undergoes thorough background checks and holds valid wilderness certifications before leading any program.' },
  { title: 'Wilderness First Responder', text: 'At least one Wilderness First Responder (WFR)-certified guide is present at all times on multi-day expeditions.' },
  { title: '1:6 Guide Ratio', text: 'Our tightest supervision ratio — every six teens has a dedicated guide throughout all trekking and overnight sessions.' },
  { title: 'Daily Parent Updates', text: 'Morning and evening photo and message updates sent to parents every day so families stay connected and reassured.' },
  { title: 'Emergency Evacuation Plan', text: 'Detailed evacuation protocols are mapped for every site. Guides coordinate with local emergency services and have vehicle access at all times.' },
  { title: 'Weather & Risk Assessment', text: 'A full site risk assessment is completed before every expedition. All programs have weather contingency and rescheduling policies.' },
]

export default function TeenExpeditionsPage() {
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
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <a href="/programs" className="pd-hero__back" style={{ opacity: 0 }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            All Programs
          </a>
          <div className="pd-hero__age-badge" style={{ background: 'rgba(20,72,32,0.9)', opacity: 0 }}>Ages 14–16</div>
          <h1 className="pd-hero__headline" style={{ opacity: 0 }}>
            Teen <em>Expeditions</em>
          </h1>
          <p className="pd-hero__sub" style={{ opacity: 0 }}>
            A three-day wilderness expedition combining conservation fieldwork, first aid, and real expedition leadership.
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
            { icon: '⏱', num: '2–3 Days', label: 'Multi-Day Expedition' },
            { icon: '👥', num: 'Max 12', label: 'Teens Per Group' },
            { icon: '🧑‍🏫', num: '1:6', label: 'Guide-to-Teen Ratio' },
            { icon: '📍', num: 'Bheemeshwari', label: '& Kanakapura' },
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
            <h2 className="pd-overview__title">Where Independence<br/>Meets <em>Purpose</em></h2>
            <p className="pd-overview__text">
              Teen Expeditions is our most advanced program — a three-day immersion into the wilderness areas of Bheemeshwari and Kanakapura for teens aged 14 to 16 who are ready to take on real responsibility.
            </p>
            <p className="pd-overview__text">
              Participants plan and execute genuine expedition objectives: conservation fieldwork, wilderness navigation, and first aid scenarios with no pre-determined answers. Every day demands leadership, adaptability, and the courage to act when others look to you.
            </p>
            <p className="pd-overview__text">
              With a strict 1:6 guide ratio, Wilderness First Responder-certified staff, and daily parent updates, families can trust that every teen is challenged hard and supported completely.
            </p>
          </div>
          <div className="pd-overview__img" style={{ opacity: 0 }}>
            <img
              src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Teens on wilderness expedition at Bheemeshwari"
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
            <p className="pd-section-sub">Three days of real expedition work — conservation, first aid, leadership, and wilderness living.</p>
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
            <h2 className="pd-section-title">Three Days in the Wilderness</h2>
          </div>
          <div className="pd-timeline">
            {SCHEDULE.map((item, i) => (
              <div key={i} className="pd-timeline-item" style={{ opacity: 0 }}>
                {'day' in item && item.day && (
                  <div className="pd-timeline-day-label">{item.day}</div>
                )}
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
              { name: 'Kavya M.', child: 'Mum of Arjun, 15', stars: 5, text: 'Arjun spent three days without his phone and came back saying it was the most alive he\'d felt in years. The expedition was genuinely challenging but the guides calibrated it perfectly. He\'s a different kid.' },
              { name: 'Rajan S.', child: 'Dad of Ananya, 14', stars: 5, text: 'The conservation project component was what sold us on this program — and it delivered. Ananya came back with a real sense of purpose and a noticeably deeper respect for the natural world. Worth every rupee.' },
              { name: 'Deepa C.', child: 'Mum of Vikram, 16', stars: 5, text: 'As a parent sending your teenager into the wilderness for three days, you want to trust the people in charge completely. The guides at LookFarOutdoors gave me that confidence. Vikram\'s first aid skills are now better than mine.' },
              { name: 'Gopal R.', child: 'Dad of Maya, 15', stars: 4, text: 'A rigorous and superbly led expedition. The problem-solving scenarios on day two were Maya\'s highlight — she said they were harder than anything she does at school. She came back with genuine grit and a certificate she\'s very proud of.' },
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
          <h2 className="pd-cta__title">Ready for the Ultimate <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>Challenge?</em></h2>
          <p className="pd-cta__sub">Enquire now to reserve a spot on the next expedition. Our team will get back to you within 24 hours.</p>
          <div className="pd-cta__actions">
            <a href="/contact?program=teen-expeditions" className="pd-cta__btn-primary">
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
