import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import '../program-detail.css'

const ACTIVITIES = [
  {
    icon: '🥾',
    color: 'green',
    title: 'Advanced Trekking',
    text: 'Challenging multi-terrain treks across Savandurga\'s iconic granite slopes and Turahalli\'s forest trails. Kids build endurance, respect for nature, and the mental grit to keep going when the path gets tough.',
  },
  {
    icon: '🧭',
    color: 'gold',
    title: 'Navigation & Orienteering',
    text: 'Real compass and topographic map skills taught in the field. Children plan routes, identify landmarks, and navigate independently — building spatial reasoning and decision-making confidence.',
  },
  {
    icon: '🪵',
    color: 'green',
    title: 'Survival Skills',
    text: 'Shelter-building, fire safety, water sourcing, and emergency signalling techniques. Practical wilderness knowledge that empowers kids with self-reliance and calm thinking under pressure.',
  },
  {
    icon: '🏅',
    color: 'gold',
    title: 'Leadership Development',
    text: 'Rotating leadership roles, group decision-making challenges, and debrief circles that build communication, empathy, and the ability to guide others — skills that transfer directly to school and life.',
  },
]

const SCHEDULE = [
  // Day 1 — Saturday
  { day: 'Day 1 — Saturday', time: '7:00 AM — Arrival & Camp Setup', color: 'green', dot: 'green', desc: 'Arrive at Savandurga base. Safety briefing, gear check, tent assignment, and team formation exercises.' },
  { time: '8:30 AM — Trek & Navigation', color: 'green', dot: 'green', desc: 'Guided trek up Savandurga with map-reading checkpoints. Teams navigate using compass and landmark identification.' },
  { time: '12:30 PM — Lunch', color: 'gold', dot: 'gold', desc: 'Hot lunch at base camp. Vegetarian and Jain options always available. Rest and debrief after the morning trek.' },
  { time: '2:00 PM — Survival Skills Workshop', color: 'green', dot: 'green', desc: 'Hands-on shelter building, fire safety demonstration, and emergency signalling practicals with certified guides.' },
  { time: '6:00 PM — Camp & Campfire', color: 'gold', dot: 'gold', desc: 'Set up evening camp, storytelling around the campfire, star-gazing, and reflection on the day\'s learnings.' },
  // Day 2 — Sunday
  { day: 'Day 2 — Sunday', time: '6:30 AM — Sunrise & Pack-Up', color: 'green', dot: 'green', desc: 'Morning in Turahalli Forest. Sunrise observation, mindfulness walk, and team pack-up with Leave No Trace principles.' },
  { time: '8:00 AM — Leadership Challenge', color: 'green', dot: 'green', desc: 'Rotating leadership scenarios — each child leads a section of the team challenge, with peer feedback and guide coaching.' },
  { time: '12:00 PM — Debrief & Awards', color: 'muted', dot: 'dark', desc: 'Group reflection circle, leadership award presentations, certificates, and pick-up at 1:00 PM.' },
]

const SAFETY = [
  { title: 'Background-Verified Guides', text: 'Every guide undergoes thorough background checks and holds valid wilderness certifications before leading any program.' },
  { title: 'First Aid on Site', text: 'Full first aid kit and a trained first responder are present at all times throughout both days of the program.' },
  { title: '1:8 Guide Ratio', text: 'Our strict supervision ratio ensures every child has a guide\'s attention throughout the trek and overnight camp.' },
  { title: 'Emergency Evacuation Plan', text: 'A detailed evacuation protocol is in place for every site. Guides are trained in rapid response and coordination with local services.' },
  { title: '24/7 Overnight Supervision', text: 'For overnight programs, at least two certified guides are on-site throughout the night. Parents can contact us at any hour.' },
  { title: 'Live Updates for Parents', text: 'Photo and message updates sent throughout both days so families always know their child is safe and thriving.' },
]

export default function OutdoorLeadersPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="pd-hero__overlay" />
        <div className="pd-hero__content">
          <h1 className="pd-hero__headline" style={{ opacity: 0 }}>
            Outdoor <em>Leaders</em>
          </h1>
          <p className="pd-hero__sub" style={{ opacity: 0 }}>
            A two-day overnight program that builds genuine leadership, navigation skills, and wilderness confidence.
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
            { icon: '⏱', num: '2 Days', label: 'Overnight Program' },
            { icon: '👥', num: 'Max 15', label: 'Kids Per Group' },
            { icon: '🧑‍🏫', num: '1:8', label: 'Guide-to-Child Ratio' },
            { icon: '📍', num: 'Savandurga', label: '& Turahalli Forest' },
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
            <h2 className="pd-overview__title">Where Leadership<br/>Meets the <em>Wild</em></h2>
            <p className="pd-overview__text">
              Outdoor Leaders is a two-day overnight program designed for kids aged 11 to 13 who are ready to step into responsibility. Set across the dramatic granite monolith of Savandurga and the serene Turahalli Forest, this program demands more — and gives more in return.
            </p>
            <p className="pd-overview__text">
              Participants take on rotating leadership roles throughout the program, making real decisions that affect the group. They learn advanced navigation, survival skills, and how to stay composed when plans change — exactly the kind of adaptive thinking modern young people need.
            </p>
            <p className="pd-overview__text">
              Every session is led by certified wilderness educators with overnight supervision throughout. This isn't a camping trip — it's a carefully designed leadership crucible that sends kids home genuinely transformed.
            </p>
          </div>
          <div className="pd-overview__img" style={{ opacity: 0 }}>
            <img
              src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Kids trekking through forest on leadership program"
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
            <p className="pd-section-sub">Two days of progressive challenges that build real-world leadership and wilderness competence.</p>
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
            <h2 className="pd-section-title">Two Days in the Wild</h2>
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
              { name: 'Sunita B.', child: 'Mum of Aarav, 12', stars: 5, text: 'The overnight camp was transformative. Aarav came back more mature, more confident, and full of stories about leading his team up the trek. He said it was the best weekend of his life. We\'re already booking the next one.' },
              { name: 'Harish V.', child: 'Dad of Nisha, 11', stars: 5, text: 'Nisha has always been a bit shy in group settings. After Outdoor Leaders she came back telling me about how she navigated her team through the forest. The rotating leadership structure is genius — every child gets a turn.' },
              { name: 'Rekha J.', child: 'Mum of Sanjay, 12', stars: 5, text: 'Exceptional organisation. The guides were professional, warm, and clearly loved what they were doing. The evening campfire and star-gazing was a magical touch. Sanjay hasn\'t stopped talking about it for two weeks.' },
              { name: 'Prakash D.', child: 'Dad of Leela, 11', stars: 4, text: 'Really well-planned program. I loved that each activity had a clear purpose — it wasn\'t just fun for fun\'s sake, there were real skills being developed. Leela came home with a new vocabulary for the outdoors.' },
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
          <h2 className="pd-cta__title">Ready to Build a <em style={{ color: 'var(--accent-warm)', fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>Leader?</em></h2>
          <p className="pd-cta__sub">Enquire now to reserve a spot for your young leader. Our team will get back to you within 24 hours.</p>
          <div className="pd-cta__actions">
            <a href="/contact?program=outdoor-leaders" className="pd-cta__btn-primary">
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
