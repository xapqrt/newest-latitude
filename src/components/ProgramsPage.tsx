import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import { buildWhatsAppLink } from '../utils/whatsapp'
import { PROGRAMS, getVisiblePrograms } from '../data/programs'
import { SHOW_UPCOMING_DATES, SHOW_READY_ADVENTURE_CTA } from '../config/featureFlags'
import { optimizeImage, imageSrcSet } from '../utils/images'
import { prefersReducedMotion } from '../utils/motion'

const VISIBLE_PROGRAMS = getVisiblePrograms()
const VISIBLE_UPCOMING_DATES = getVisiblePrograms().map((p) => ({
  programId: p.id,
  title: p.title,
  ageColor: p.ageColor,
  dates: p.upcomingDates,
}))

const PACK_ITEMS = [
  {
    title: 'Clothing & Footwear',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
      </svg>
    ),
    items: [
      'Comfortable, breathable clothing (full sleeves recommended)',
      'Sturdy closed-toe shoes or hiking shoes — no flip-flops',
      'A light rain jacket or windcheater',
      'Wide-brimmed hat or cap',
      'Extra pair of socks (1 per day for multi-day programs)',
    ],
  },
  {
    title: 'Hydration & Nutrition',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
      </svg>
    ),
    items: [
      'Reusable water bottle (at least 1 litre)',
      'Light snacks for the journey — meals are provided',
      'Any personal dietary supplements if required',
    ],
  },
  {
    title: 'Health & Safety',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    items: [
      'Sunscreen (SPF 30+)',
      'Insect repellent',
      'Any personal prescription medication (clearly labelled)',
      'Medical information / allergy note shared with guides in advance',
    ],
  },
  {
    title: 'Gear We Provide',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.47 0 12.35 0c-1.7 0-3.21.9-4.1 2.26L7 4 5.75 2.26C4.86.9 3.35 0 1.65 0 .74 0 0 .74 0 1.65c0 .47.11.91.18 1.35H0v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    items: [
      'All safety & activity-specific equipment (harnesses, helmets, ropes)',
      'First aid kits on every outing',
      'Tents and sleeping gear for overnight programs',
      'Navigation tools (maps, compass)',
      'Program workbooks and nature journals',
    ],
  },
]

const FAQS = [
  {
    q: 'What should my child bring?',
    a: 'Comfortable outdoor clothing, sturdy shoes (no flip-flops), a water bottle, sunscreen, hat, and any personal medication. We provide all activity-specific gear and safety equipment.',
  },
  {
    q: "What's the instructor-to-child ratio?",
    a: 'We maintain a strict 1:3 instructor-to-child ratio for all programs.',
  },
  {
    q: 'Are meals included in longer programs?',
    a: 'Yes! All full-day and multi-day programs include nutritious meals and snacks. We accommodate common dietary requirements — just let us know in advance. Vegetarian and Jain options are always available.',
  },
  {
    q: 'What happens if it rains?',
    a: 'Light rain is part of the adventure! We have rain-specific activities planned. In case of severe weather, we reschedule or modify the program. Full refunds are issued for weather-related cancellations.',
  },
  {
    q: 'Can parents participate or observe?',
    a: 'For the Outdoor Education Camp - 3D2N program (Ages 5–7), parents are welcome to accompany their child. For older age groups, we encourage independent participation to maximise the learning experience. We share live photo updates throughout the day.',
  },
]

// ─────────────────────────────────────────────
// Accordion item
// ─────────────────────────────────────────────
function AccordionItem({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
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
    <div className={`pp-accordion${open ? ' pp-accordion--open' : ''}`}>
      <button className="pp-accordion__trigger" onClick={() => setOpen(o => !o)}>
        <span className="pp-accordion__label">
          <span className="pp-accordion__icon">{icon}</span>
          {title}
        </span>
        <span className="pp-accordion__chevron">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </span>
      </button>
      <div ref={bodyRef} className="pp-accordion__body" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <ul className="pp-accordion__list">
          {items.map((item, i) => (
            <li key={i} className="pp-accordion__list-item">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Comparison table rows (derived from source of truth)
// ─────────────────────────────────────────────

const COMPARISON_ROWS: { label: string; icon: string; getVal: (p: typeof PROGRAMS[0]) => string }[] = [
  { label: 'Age Group',        icon: '🧒', getVal: (p) => p.ageFilter },
  { label: 'Duration',         icon: '⏱️', getVal: (p) => p.duration },
  { label: 'Location',         icon: '📍', getVal: (p) => p.compareLocationFull },
  { label: 'Instructor Ratio', icon: '👥', getVal: (p) => p.compareRatio },
  { label: 'Difficulty',       icon: '📊', getVal: (p) => p.compareDifficulty },
  { label: 'Key Activity',     icon: '🌿', getVal: (p) => p.compareKeyActivity },
  { label: 'Overnight Stay',   icon: '⛺', getVal: (p) => p.compareOvernight },
]

// ─────────────────────────────────────────────
// FAQ item
// ─────────────────────────────────────────────
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
    <div className={`pp-faq-item${open ? ' pp-faq-item--open' : ''}`}>
      <button className="pp-faq-item__q" onClick={() => setOpen(o => !o)}>
        {q}
        <span className="pp-faq-item__chevron">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </span>
      </button>
      <div ref={bodyRef} className="pp-faq-item__a" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Program card (full detail row)
// ─────────────────────────────────────────────
function ProgramRow({ p, reverse }: { p: typeof PROGRAMS[0]; reverse: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 70 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rowRef} className={`pp-program-row${reverse ? ' pp-program-row--reverse' : ''}`}>
      {/* Image */}
      <div className="pp-program-row__img-wrap">
        <img src={optimizeImage(p.img as string)} alt={p.title} className="pp-program-row__img" srcSet={imageSrcSet(p.img as string)} loading="lazy" />
        <div className="pp-program-row__img-overlay" />
      </div>

      {/* Content */}
      <div className="pp-program-row__content">
        <h2 className="pp-program-row__title">{p.title}</h2>
        <p className="pp-program-row__desc">{p.desc}</p>

        <div className="pp-program-row__features">
          {p.features.map((f, i) => (
            <div key={i} className="pp-program-row__feature">
              <span className="pp-program-row__feature-icon">{f.icon}</span>
              <div>
                <div className="pp-program-row__feature-title">{f.title}</div>
                <div className="pp-program-row__feature-sub">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pp-program-row__meta">
          <span className="pp-program-row__meta-pill">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
            {p.duration}
          </span>
          <span className="pp-program-row__meta-pill">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {p.location}
          </span>
          <span className="pp-program-row__meta-pill">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            {p.group}
          </span>
        </div>

        <div className="pp-program-row__actions">
          <a href={p.href} className="pp-btn-outline">
            Learn More
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </a>
          <a href={`/contact?program=${p.id}`} className="pp-btn-primary">
            Enquire Now
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────
export default function ProgramsPage() {
  // What to pack entrance
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.pp-pack-section .pp-section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-pack-section', start: 'top 82%', once: true },
        }
      )
      gsap.fromTo('.pp-accordion',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.pp-pack-section', start: 'top 75%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // FAQ entrance
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.pp-faq-section .pp-section-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-faq-section', start: 'top 82%', once: true },
        }
      )
      gsap.fromTo('.pp-faq-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.pp-faq-section', start: 'top 75%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // CTA entrance
  useEffect(() => {
    if (!SHOW_READY_ADVENTURE_CTA) return
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.pp-cta-section .pp-cta-inner',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.pp-cta-section', start: 'top 80%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── PROGRAM ROWS ─────────────────────── */}
      <section className="pp-programs-section">
        {/* Subtle bg lines */}
        <div className="programs-bg-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className="programs-bg-line" />)}
        </div>

        <div className="pp-programs-inner">
          {VISIBLE_PROGRAMS.map((p, i) => (
            <ProgramRow key={p.id} p={p} reverse={i % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* ── UPCOMING DATES ───────────────────── */}
      {SHOW_UPCOMING_DATES && (
        <section className="pp-dates-section">
          <div className="pp-dates-inner">
            <div className="pp-section-header">
              <span className="section-label section-label--gold-dark">Availability</span>
              <h2 className="pp-section-title">Upcoming Dates</h2>
              <p className="pp-section-sub">Reserve your child's spot — popular sessions fill fast.</p>
            </div>
            <div className="pp-dates-grid">
              {VISIBLE_UPCOMING_DATES.map(prog => (
                <div key={prog.programId} className="pp-dates-card">
                  <div className="pp-dates-card__header" style={{ borderColor: prog.ageColor }}>
                    <span className="pp-dates-card__dot" style={{ background: prog.ageColor }} />
                    <span className="pp-dates-card__name">{prog.title}</span>
                  </div>
                  <div className="pp-dates-list">
                    {prog.dates.map((d, i) => (
                      <div key={i} className={`pp-date-row pp-date-row--${d.status}`}>
                        <div className="pp-date-row__left">
                          <span className="pp-date-row__date">{d.date}</span>
                          <span className={`pp-date-row__badge pp-date-row__badge--${d.status}`}>
                            {d.status === 'full' ? 'Full' : d.status === 'almost-full' ? `${d.slots} left` : `${d.slots} spots`}
                          </span>
                        </div>
                        <a
                          href={d.status === 'full' ? '#' : `/contact`}
                          className={`pp-date-row__btn${d.status === 'full' ? ' pp-date-row__btn--disabled' : ''}`}
                          aria-disabled={d.status === 'full'}
                        >
                          {d.status === 'full' ? 'Full' : 'Book this date'}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAM COMPARISON TABLE ─────────── */}
      <section className="pp-compare-section">
        <div className="pp-compare-inner">
          <div className="pp-section-header">
            <span className="section-label section-label--gold-dark">At a Glance</span>
            <h2 className="pp-section-title">Which Program is Right?</h2>
            <p className="pp-section-sub">Compare our currently available programs side-by-side to find the perfect fit.</p>
          </div>
          <div className="pp-compare-table-wrap">
            <table className="pp-compare-table">
              <thead>
                <tr>
                  <th className="pp-compare-th pp-compare-th--label">Feature</th>
                  {VISIBLE_PROGRAMS.map(p => (
                    <th key={p.id} className="pp-compare-th">
                      <span className="pp-compare-th__badge" style={{ background: p.ageColor }}>AGES 7–12</span>
                      <span className="pp-compare-th__name">{p.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {COMPARISON_ROWS.map((row, ri) => (
                    <tr key={ri} className={`pp-compare-row${ri % 2 === 0 ? ' pp-compare-row--alt' : ''}`}>
                      <td className="pp-compare-td pp-compare-td--label">
                        <span className="pp-compare-td__icon">{row.icon}</span>
                        {row.label}
                      </td>
                      {VISIBLE_PROGRAMS.map((p) => (
                        <td key={p.id} className="pp-compare-td">{row.getVal(p)}</td>
                      ))}
                    </tr>
                  ))}
                <tr className="pp-compare-row pp-compare-row--cta">
                  <td className="pp-compare-td pp-compare-td--label"></td>
                  {VISIBLE_PROGRAMS.map(p => (
                    <td key={p.id} className="pp-compare-td pp-compare-td--action">
                      <a href={p.href} className="pp-compare-link" style={{ background: p.ageColor }}>
                        View Program
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHAT TO PACK ─────────────────────── */}
      <section className="pp-pack-section">
        <div className="pp-pack-inner">
          <div className="pp-section-header">
            <span className="section-label section-label--gold-dark">Preparation</span>
            <h2 className="pp-section-title">What to Pack</h2>
            <p className="pp-section-sub">Everything your child needs for a safe, comfortable adventure.</p>
          </div>
          <div className="pp-accordion-list">
            {PACK_ITEMS.map((item, i) => (
              <AccordionItem key={i} title={item.title} icon={item.icon} items={item.items} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section className="pp-faq-section">
        <div className="pp-faq-inner">
          <div className="pp-section-header">
            <span className="section-label">Common Questions</span>
            <h2 className="pp-section-title">FAQ</h2>
          </div>
          <div className="pp-faq-list">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        {SHOW_READY_ADVENTURE_CTA && (
          <div className="section-wave section-wave--bottom" aria-hidden="true">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z" fill="#0a1f10" />
            </svg>
          </div>
        )}
      </section>

      {SHOW_READY_ADVENTURE_CTA && (
        <section className="pp-cta-section">
          <div
            className="pp-cta-bg"
            style={{ backgroundImage: `url(${optimizeImage('https://images.pexels.com/photos/3608439/pexels-photo-3608439.jpeg?auto=compress&cs=tinysrgb&w=1920')})` }}
          />
          <div className="pp-cta-overlay" />
          <div className="pp-cta-inner">
            <span className="cta-pill" style={{ marginBottom: 20, display: 'inline-flex' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              Trusted by 2,500+ families
            </span>
            <h2 className="pp-cta-headline">Ready to Start the Adventure?</h2>
            <p className="pp-cta-sub">Get in touch to learn more about our programs or to book a spot for your child.</p>
            <div className="cta-btns">
              <a
                href={buildWhatsAppLink()}
                target="_blank" rel="noopener noreferrer"
                className="cta-btn-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
                </svg>
                Chat on WhatsApp
              </a>
              <a href="/contact" className="cta-btn-secondary">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Send a Message
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
