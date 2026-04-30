import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'
import { getLenis } from '../hooks/useSmoothScroll'
import { buildWhatsAppLink } from '../utils/whatsapp'
// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const GUIDES = [
  {
    id: 'arjun',
    name: 'Arjun Kumar',
    initials: 'AK',
    role: 'Senior Outdoor Educator',
    badge: 'Lead Guide',
    badgeColor: '#e8960a',
    avatarColor: '#1f6b2e',
    avatarBg: 'linear-gradient(135deg, rgba(31,107,46,0.22) 0%, rgba(31,107,46,0.06) 100%)',
    exp: '8 yrs exp',
    trips: '200+ trips',
    bio: 'Passionate naturalist specializing in Western Ghats ecology. Arjun has led over 200 treks and nature walks for children aged 5–16.',
    tags: [
      { label: 'Nature Trails', color: 'green' },
      { label: 'Bird Watching', color: 'green' },
      { label: 'Rock Climbing', color: 'gold' },
    ],
    categories: ['nature', 'adventure'],
  },
  {
    id: 'meera',
    name: 'Meera Rao',
    initials: 'MR',
    role: 'Adventure Sports Specialist',
    badge: 'Adventure Lead',
    badgeColor: '#1f6b2e',
    avatarColor: '#e8960a',
    avatarBg: 'linear-gradient(135deg, rgba(232,150,10,0.22) 0%, rgba(232,150,10,0.06) 100%)',
    exp: '6 yrs exp',
    trips: '150+ trips',
    bio: 'Former national-level rock climber turned outdoor educator. Meera brings high-energy adventure activities with an unwavering focus on safety.',
    tags: [
      { label: 'Rock Climbing', color: 'gold' },
      { label: 'Rappelling', color: 'gold' },
      { label: 'Survival Skills', color: 'green' },
    ],
    categories: ['adventure', 'survival'],
  },
  {
    id: 'deepak',
    name: 'Deepak Venkat',
    initials: 'DV',
    role: 'Nature & Wildlife Educator',
    badge: null,
    badgeColor: null,
    avatarColor: '#4a9e42',
    avatarBg: 'linear-gradient(135deg, rgba(74,158,66,0.22) 0%, rgba(74,158,66,0.06) 100%)',
    exp: '10 yrs exp',
    trips: '300+ trips',
    bio: 'Wildlife biologist with a decade of experience in the Western Ghats. Deepak makes wildlife identification exciting and accessible for all ages.',
    tags: [
      { label: 'Wildlife ID', color: 'green' },
      { label: 'Nature Journaling', color: 'green' },
      { label: 'Photography', color: 'gold' },
    ],
    categories: ['nature', 'creative'],
  },
  {
    id: 'priya',
    name: 'Priya Shetty',
    initials: 'PS',
    role: 'Survival & Bushcraft Instructor',
    badge: null,
    badgeColor: null,
    avatarColor: '#e07c24',
    avatarBg: 'linear-gradient(135deg, rgba(224,124,36,0.22) 0%, rgba(224,124,36,0.06) 100%)',
    exp: '5 yrs exp',
    trips: '120+ trips',
    bio: 'Priya specializes in teaching kids essential survival skills from fire-making to shelter-building, always with a focus on environmental stewardship.',
    tags: [
      { label: 'Survival Skills', color: 'green' },
      { label: 'Camping', color: 'gold' },
      { label: 'Navigation', color: 'green' },
    ],
    categories: ['survival', 'adventure'],
  },
  {
    id: 'naveen',
    name: 'Naveen Joshi',
    initials: 'NJ',
    role: 'Outdoor Arts & Creativity Guide',
    badge: null,
    badgeColor: null,
    avatarColor: '#144820',
    avatarBg: 'linear-gradient(135deg, rgba(20,72,32,0.28) 0%, rgba(20,72,32,0.08) 100%)',
    exp: '4 yrs exp',
    trips: '80+ trips',
    bio: 'A trained visual artist and outdoor educator, Naveen blends creative expression with nature exploration — from plein air painting to land art.',
    tags: [
      { label: 'Nature Art', color: 'gold' },
      { label: 'Storytelling', color: 'green' },
      { label: 'Ecology', color: 'green' },
    ],
    categories: ['creative', 'nature'],
  },
  {
    id: 'kavitha',
    name: 'Kavitha Murthy',
    initials: 'KM',
    role: 'Trekking & Fitness Guide',
    badge: null,
    badgeColor: null,
    avatarColor: '#7a4520',
    avatarBg: 'linear-gradient(135deg, rgba(232,150,10,0.18) 0%, rgba(232,150,10,0.05) 100%)',
    exp: '7 yrs exp',
    trips: '180+ trips',
    bio: 'Kavitha is an avid mountaineer who has summited peaks across India. She focuses on building physical confidence and teamwork in young adventurers.',
    tags: [
      { label: 'Trekking', color: 'gold' },
      { label: 'Team Building', color: 'gold' },
      { label: 'Fitness', color: 'green' },
    ],
    categories: ['adventure'],
  },
  {
    id: 'ravi',
    name: 'Ravi Prasad',
    initials: 'RP',
    role: 'Forest Skills & Ecology Guide',
    badge: null,
    badgeColor: null,
    avatarColor: '#4a9e42',
    avatarBg: 'linear-gradient(135deg, rgba(74,158,66,0.22) 0%, rgba(74,158,66,0.06) 100%)',
    exp: '9 yrs exp',
    trips: '250+ trips',
    bio: 'A forest ranger turned educator, Ravi brings deep knowledge of South Indian ecosystems. He teaches children to read the forest like a book.',
    tags: [
      { label: 'Forest Ecology', color: 'green' },
      { label: 'Plant ID', color: 'green' },
      { label: 'Shelter Building', color: 'gold' },
    ],
    categories: ['nature', 'survival'],
  },
  {
    id: 'ananya',
    name: 'Ananya Bhat',
    initials: 'AB',
    role: 'Outdoor Learning & Play Guide',
    badge: null,
    badgeColor: null,
    avatarColor: '#e07c24',
    avatarBg: 'linear-gradient(135deg, rgba(224,124,36,0.22) 0%, rgba(224,124,36,0.06) 100%)',
    exp: '5 yrs exp',
    trips: '100+ trips',
    bio: 'Ananya is a child psychologist who uses nature-based play therapy to help kids build emotional resilience and social skills in outdoor settings.',
    tags: [
      { label: 'Nature Play', color: 'gold' },
      { label: 'Mindfulness', color: 'green' },
      { label: 'Team Games', color: 'gold' },
    ],
    categories: ['creative'],
  },
]

const STATS = [
  { value: 12, suffix: '+', label: 'Certified Guides' },
  { value: 150, suffix: '', label: 'Yrs Combined Experience' },
  { value: 2500, suffix: '+', label: 'Kids Guided Safely' },
  { value: 100, suffix: '%', label: 'Safety Record' },
]

const TRUST_BADGES = [
  { icon: '✓', title: 'Background Verified', sub: 'Thorough police & identity verification', accent: 'green' },
  { icon: '✦', title: 'First Aid Certified', sub: 'Wilderness first-aid & CPR trained', accent: 'gold' },
  { icon: '◆', title: 'Child Development Trained', sub: 'Education in age-appropriate learning', accent: 'green' },
  { icon: '★', title: 'Experienced Outdoors', sub: 'Minimum 3 years in outdoor education', accent: 'gold' },
]

const SELECTION_STEPS = [
  { n: 1, title: 'Application & Screening', sub: 'Thorough background check & reference verification' },
  { n: 2, title: 'Skills Assessment', sub: 'Field-based evaluation of outdoor & teaching skills' },
  { n: 3, title: 'Safety Certification', sub: 'Wilderness first aid, CPR & child safety training' },
  { n: 4, title: 'Trial Outings', sub: 'Supervised sessions with experienced guide mentors' },
  { n: 5, title: 'Ongoing Training', sub: 'Monthly workshops & annual re-certification' },
]

const PROMISE_CHECKLIST = [
  { strong: '1:5 Guide Ratio', rest: ' for ages 5–7, 1:8 for ages 8–16' },
  { strong: 'GPS Tracking', rest: ' on all outings with real-time updates' },
  { strong: 'Emergency Protocol', rest: ' with local hospital tie-ups' },
  { strong: 'Comprehensive Insurance', rest: ' for every participant' },
]

const PROMISE_ICONS = [
  { icon: '🛡️', label: 'Safety First', accent: 'green' },
  { icon: '❤️', label: 'Child-Centered', accent: 'gold' },
  { icon: '🌿', label: 'Eco-Conscious', accent: 'gold' },
  { icon: '🤝', label: 'Team Spirit', accent: 'green' },
]

// ─────────────────────────────────────────────
// Stat counter item
// ─────────────────────────────────────────────
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val).toLocaleString() },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
    return () => ctx.revert()
  }, [value])

  return (
    <div className="gp-stat-item">
      <div className="gp-stat-number">
        <span ref={numRef}>0</span>{suffix}
      </div>
      <div className="gp-stat-label">{label}</div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Guide detail modal
// ─────────────────────────────────────────────
const GUIDE_CERTS: Record<string, string[]> = {
  arjun: ['Wilderness First Aid (WFA)', 'Leave No Trace (LNT) Educator', 'Child Safety Clearance', 'Rock Climbing Level 2'],
  meera: ['Top-Rope & Lead Climbing Instructor', 'Wilderness First Aid (WFA)', 'CPR & AED Certified', 'Child Safety Clearance'],
  deepak: ['Certified Wildlife Biologist', 'Wilderness First Aid (WFA)', 'Nature Journaling Facilitator', 'Child Safety Clearance'],
  priya: ['Bushcraft Instructor (Level 3)', 'Wilderness First Aid (WFA)', 'CPR Certified', 'Leave No Trace (LNT) Educator'],
  naveen: ['Outdoor Arts Educator', 'Wilderness First Aid (WFA)', 'Child Safety Clearance', 'Ecology Interpretation Guide'],
  kavitha: ['Mountaineering Certificate (BMC)', 'Wilderness First Aid (WFA)', 'CPR & AED Certified', 'Child Safety Clearance'],
  ravi: ['Former Forest Range Officer', 'Wilderness First Aid (WFA)', 'Forest Ecology Interpreter', 'Child Safety Clearance'],
  ananya: ['Child Psychologist (M.Sc.)', 'Nature-Based Play Therapist', 'Wilderness First Aid (WFA)', 'Child Safety Clearance'],
}

function GuideModal({ guide, onClose }: { guide: typeof GUIDES[0]; onClose: () => void }) {
  const certs = GUIDE_CERTS[guide.id] ?? []
  const waMsg = buildWhatsAppLink({
    route: '/guides',
    lead: `Hi Lookfar Outdoors! We would love to request ${guide.name} as a guide for our child's program.`,
    prompt: 'Could you share their availability and a little more about their experience?',
  })
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)

    // Prevent Lenis from seeing wheel/touch events that originate inside the modal
    // so the modal panel scrolls natively while the page behind stays frozen.
    const panel = modalRef.current
    const stopProp = (e: Event) => e.stopPropagation()
    panel?.addEventListener('wheel', stopProp, { passive: false })
    panel?.addEventListener('touchmove', stopProp, { passive: false })

    // Also freeze Lenis so the background page doesn't drift via keyboard / RAF
    const lenis = getLenis()
    lenis?.stop()

    return () => {
      window.removeEventListener('keydown', onKey)
      panel?.removeEventListener('wheel', stopProp)
      panel?.removeEventListener('touchmove', stopProp)
      lenis?.start()
    }
  }, [onClose])

  return (
    <div className="guide-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={modalRef} className="guide-modal">
        <button className="guide-modal__close" onClick={onClose} aria-label="Close">✕</button>
        <div className="guide-modal__avatar" style={{ background: guide.avatarColor }}>
          <span style={{ color: '#fff' }}>{guide.initials}</span>
        </div>
        <div className="guide-modal__name">{guide.name}</div>
        <div className="guide-modal__role">{guide.role}</div>
        <div className="guide-modal__stats">
          <div className="guide-modal__stat">
            <span className="guide-modal__stat-val">{guide.exp}</span>
            <span className="guide-modal__stat-lbl">Experience</span>
          </div>
          <div className="guide-modal__stat">
            <span className="guide-modal__stat-val">{guide.trips}</span>
            <span className="guide-modal__stat-lbl">Trips Led</span>
          </div>
        </div>
        <p className="guide-modal__bio">{guide.bio}</p>
        <div className="guide-modal__certs">
          <div className="guide-modal__certs-title">Certifications</div>
          {certs.map((c, i) => (
            <div key={i} className="guide-modal__cert-item">{c}</div>
          ))}
        </div>
        <div className="guide-modal__tags">
          {guide.tags.map((t, i) => (
            <span key={i} className={`gp-tag gp-tag--${t.color}`}>{t.label}</span>
          ))}
        </div>
        <a
          href={waMsg}
          target="_blank" rel="noopener noreferrer"
          className="guide-modal__cta"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
          </svg>
          Request {guide.name.split(' ')[0]} as my Guide
        </a>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Guide card
// ─────────────────────────────────────────────
function GuideCard({ g, onSelect }: { g: typeof GUIDES[0]; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={cardRef} className="gp-guide-card" style={{ opacity: 0, cursor: 'pointer' }} onClick={onSelect}>
      <div className="gp-guide-card__avatar-wrap" style={{ background: g.avatarBg }}>
        <div className="gp-guide-card__avatar" style={{ background: g.avatarColor }}>
          {g.initials}
        </div>
        {g.badge && (
          <span className="gp-guide-card__badge" style={{ background: g.badgeColor! }}>
            {g.badge}
          </span>
        )}
      </div>
      <div className="gp-guide-card__body">
        <h3 className="gp-guide-card__name">{g.name}</h3>
        <p className="gp-guide-card__role">{g.role}</p>
        <div className="gp-guide-card__meta">
          <span>⏱ {g.exp}</span>
          <span>🥾 {g.trips}</span>
        </div>
        <p className="gp-guide-card__bio">{g.bio}</p>
        <div className="gp-guide-card__tags">
          {g.tags.map((t, i) => (
            <span key={i} className={`gp-tag gp-tag--${t.color}`}>{t.label}</span>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: '0.8rem', color: 'var(--accent-warm)', fontWeight: 700, letterSpacing: '0.04em' }}>
          View profile →
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function GuidesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedGuide, setSelectedGuide] = useState<typeof GUIDES[0] | null>(null)

  const filters = [
    { key: 'all', label: 'All Guides' },
    { key: 'nature', label: 'Nature & Wildlife' },
    { key: 'adventure', label: 'Adventure Sports' },
    { key: 'survival', label: 'Survival Skills' },
    { key: 'creative', label: 'Creative & Arts' },
  ]

  const visible = GUIDES.filter(g => {
    const matchesCat = activeFilter === 'all' || g.categories.includes(activeFilter)
    const q = search.toLowerCase()
    const matchesSearch = !q || g.name.toLowerCase().includes(q) || g.role.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  // Hero entrance — editorial split layout
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-hero__label',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      )
      gsap.fromTo('.gp-hero__title-line',
        { opacity: 0, y: 70, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.2, duration: 1.1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo('.gp-hero__sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.85 }
      )
      gsap.fromTo('.gp-hero__avatar-item',
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: 'back.out(1.4)', delay: 0.5 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Stats bar entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-stats-bar',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.gp-stats-bar', start: 'top 88%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Trust badges stagger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-trust-badge',
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.gp-trust-section', start: 'top 82%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Filter bar entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-filter-bar',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.gp-filter-bar', start: 'top 90%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Selection steps stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-step',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.gp-selection-section', start: 'top 78%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Promise section entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-promise-text',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.gp-promise-section', start: 'top 78%', once: true },
        }
      )
      gsap.fromTo('.gp-promise-grid',
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.gp-promise-section', start: 'top 78%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // CTA entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gp-cta-inner',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.gp-cta-section', start: 'top 80%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO — Editorial Team Portrait ──── */}
      <div className="gp-hero">
        {/* Decorative bg texture */}
        <div className="gp-hero__bg-texture" aria-hidden="true" />

        <div className="gp-hero__inner">
          {/* Left: text */}
          <div className="gp-hero__text">
            <span className="gp-hero__label section-label section-label--gold-dark" style={{ opacity: 0 }}>
              The LookfarOutdoors Team
            </span>
            <h1 className="gp-hero__headline" aria-label="Meet Our Guides">
              <span className="gp-hero__title-line" style={{ opacity: 0 }}>Meet Our</span>
              <span className="gp-hero__title-line gp-hero__title-line--accent" style={{ opacity: 0 }}>Guides.</span>
            </h1>
            <p className="gp-hero__sub" style={{ opacity: 0 }}>
              12 passionate outdoor educators — trained, certified, and dedicated to every child's safety and growth.
            </p>
          </div>

          {/* Right: avatar mosaic */}
          <div className="gp-hero__avatars" aria-hidden="true">
            {GUIDES.map((g) => (
              <div
                key={g.id}
                className="gp-hero__avatar-item"
                style={{ background: g.avatarColor, opacity: 0 }}
                title={g.name}
              >
                <span>{g.initials}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="gp-hero__wave">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,0 C360,70 1080,0 1440,56 L1440,70 L0,70 Z" fill="var(--forest-deep)" />
          </svg>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────── */}
      <div className="gp-stats-section">
        <div className="gp-stats-bar">
          {STATS.map((s, i) => (
            <StatItem key={i} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      {/* ── TRUST BADGES ─────────────────────── */}
      <section className="gp-trust-section">
        <div className="gp-trust-header">
          <p className="gp-trust-eyebrow">Standards & Credentials</p>
          <h2 className="gp-trust-title">Every LookfarOutdoors Guide Is</h2>
        </div>
        <div className="gp-trust-grid">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className={`gp-trust-badge gp-trust-badge--${b.accent}`}>
              <div className={`gp-trust-badge__icon gp-trust-badge__icon--${b.accent}`}>
                <span>{b.icon}</span>
              </div>
              <h3 className="gp-trust-badge__title">{b.title}</h3>
              <p className="gp-trust-badge__sub">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────── */}
      <div className="gp-filter-section">
        <div className="gp-filter-bar" style={{ opacity: 0 }}>
          {/* Search */}
          <div className="gp-search-wrap">
            <svg className="gp-search-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="search"
              placeholder="Search by name or specialty…"
              className="gp-search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Category pills */}
          <div className="gp-filter-pills">
            {filters.map(f => (
              <button
                key={f.key}
                className={`gp-filter-btn${activeFilter === f.key ? ' gp-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GUIDES GRID ──────────────────────── */}
      <section className="gp-grid-section">
        {visible.length > 0 ? (
          <div className="gp-grid">
            {visible.map(g => <GuideCard key={g.id} g={g} onSelect={() => setSelectedGuide(g)} />)}
          </div>
        ) : (
          <p className="gp-no-results">No guides match your search. Try a different filter.</p>
        )}
      </section>

      {/* ── HOW WE SELECT ────────────────────── */}
      <section className="gp-selection-section">
        <div className="gp-selection-inner">
          <div className="gp-section-header">
            <span className="section-label section-label--dark">Our Standards</span>
            <h2 className="gp-section-title--dark">How We Select Our <em>Guides</em></h2>
            <p className="gp-section-sub--dark">Every LookfarOutdoors guide goes through a rigorous 5-step selection process before leading a single outing.</p>
          </div>

          <div className="gp-steps">
            {SELECTION_STEPS.map((s, i) => (
              <div key={i} className="gp-step" style={{ opacity: 0 }}>
                <div className="gp-step__circle">{s.n}</div>
                {i < SELECTION_STEPS.length - 1 && <div className="gp-step__connector" aria-hidden="true" />}
                <h3 className="gp-step__title">{s.title}</h3>
                <p className="gp-step__sub">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARENT PROMISE ───────────────────── */}
      <section className="gp-promise-section">
        <div className="gp-promise-inner">
          <div className="gp-promise-text" style={{ opacity: 0 }}>
            <span className="section-label section-label--gold-dark">Our Promise</span>
            <h2 className="gp-section-title--dark" style={{ marginTop: 18 }}>
              Your Child's Safety Is <em>Non&#8209;Negotiable</em>
            </h2>
            <p className="gp-section-sub--dark" style={{ marginBottom: 28 }}>
              We maintain strict guide-to-child ratios, carry comprehensive first-aid kits, and conduct detailed safety briefings before every outing. Our guides are trained to handle emergencies and are in constant communication with our base team.
            </p>
            <ul className="gp-checklist">
              {PROMISE_CHECKLIST.map((item, i) => (
                <li key={i} className="gp-checklist__item">
                  <span className="gp-checklist__check">✓</span>
                  <span><strong>{item.strong}</strong>{item.rest}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="gp-promise-grid" style={{ opacity: 0 }}>
            {PROMISE_ICONS.map((p, i) => (
              <div key={i} className={`gp-promise-tile gp-promise-tile--${p.accent}`}>
                <span className="gp-promise-tile__icon">{p.icon}</span>
                <p className="gp-promise-tile__label">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="gp-cta-section">
        <div
          className="gp-cta-bg"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="gp-cta-overlay" />
        <div className="gp-cta-inner" style={{ opacity: 0 }}>
          <span className="cta-pill" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            12+ Certified Guides
          </span>
          <h2 className="gp-cta-headline">Want to Learn More<br /><em>About Our Team?</em></h2>
          <p className="gp-cta-sub">Get in touch and we'll tell you more about the guides who'll be leading your child's adventure.</p>
          <div className="cta-btns">
            <a
              href={buildWhatsAppLink({ route: '/guides' })}
              target="_blank"
              rel="noopener noreferrer"
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
      {/* ── GUIDE MODAL ──────────────────────── */}
      {selectedGuide && (
        <GuideModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
      )}
    </>
  )
}
