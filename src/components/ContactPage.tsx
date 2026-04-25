import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const PROGRAMS_LIST = [
  { value: 'little-explorers', label: 'Little Explorers', age: 'Ages 5–7', duration: 'Half Day (4 hrs)', location: 'Cubbon Park / Lalbagh' },
  { value: 'junior-adventurers', label: 'Junior Adventurers', age: 'Ages 8–10', duration: 'Full Day (8 hrs)', location: 'Ramanagara' },
  { value: 'outdoor-leaders', label: 'Outdoor Leaders', age: 'Ages 11–13', duration: 'Weekend (2 days)', location: 'Savandurga / Turahalli' },
  { value: 'teen-expeditions', label: 'Teen Expeditions', age: 'Ages 14–16', duration: '2–3 Days', location: 'Bheemeshwari / Kanakapura' },
]

const TRUST_BADGES = [
  { label: '100% Secure', accent: 'green', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
  )},
  { label: 'Money-Back Guarantee', accent: 'gold', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
  )},
  { label: '24/7 Support', accent: 'green', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
  )},
  { label: '2,500+ Kids Served', accent: 'gold', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
  )},
]

// ─────────────────────────────────────────────
// Multi-step form
// ─────────────────────────────────────────────
type FormData = {
  name: string
  email: string
  phone: string
  numChildren: string
  program: string
  message: string
  agreeTerms: boolean
}

function BookingForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', numChildren: '',
    program: '', message: '', agreeTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const prog = PROGRAMS_LIST.find(p => p.value === selectedProgram)

  function setField<K extends keyof FormData>(k: K, v: FormData[K]) {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  function validateStep1() {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Phone number required'
    if (!form.numChildren) e.numChildren = 'Please select number of children'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2() {
    const e: typeof errors = {}
    if (!form.program) e.program = 'Please select a program'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep(s => s + 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.agreeTerms) {
      setErrors({ agreeTerms: 'You must agree to continue' })
      return
    }
    setSubmitting(true)
    // Build a pre-filled WhatsApp message from form data
    const progLabel = PROGRAMS_LIST.find(p => p.value === form.program)?.label || form.program
    const msg = [
      `Hi LookFarOutdoors! I'd like to book an adventure.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Program: ${progLabel}`,
      `Children: ${form.numChildren}`,
      form.message ? `Notes: ${form.message}` : null,
    ].filter(Boolean).join('\n')
    const waUrl = `https://wa.me/919148422940?text=${encodeURIComponent(msg)}`
    setSubmitting(false)
    setSubmitted(true)
    // Open WhatsApp in new tab after a brief moment to show success state
    setTimeout(() => window.open(waUrl, '_blank', 'noopener,noreferrer'), 600)
  }

  const progressPct = ((step - 1) / 2) * 100

  if (submitted) {
    return (
      <div className="cp-form-success">
        <div className="cp-form-success__icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h2>Booking Request Sent!</h2>
        <p>Thank you, <strong>{form.name}</strong>! We'll get back to you within 24 hours to confirm all the details for <strong>{prog?.label || form.program}</strong>.</p>
        <a href="https://wa.me/919148422940?text=Hi%20LookFarOutdoors!" target="_blank" rel="noopener noreferrer" className="cp-whatsapp-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="cp-form-card">
      {/* Progress */}
      <div className="cp-progress">
        {[{ n: 1, label: 'Your Details' }, { n: 2, label: 'Choose Program' }, { n: 3, label: 'Final Details' }].map((s, i) => (
          <div key={s.n} className="cp-progress__step-wrap">
            <div className={`cp-progress__step${step >= s.n ? ' cp-progress__step--active' : ''}`}>
              {step > s.n ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              ) : s.n}
            </div>
            <span className={`cp-progress__label${step >= s.n ? ' cp-progress__label--active' : ''}`}>{s.label}</span>
            {i < 2 && <div className={`cp-progress__line${step > s.n ? ' cp-progress__line--done' : ''}`} />}
          </div>
        ))}
      </div>
      <div className="cp-progress__bar"><div className="cp-progress__fill" style={{ width: `${progressPct}%` }} /></div>

      <form onSubmit={handleSubmit}>
        {/* Step 1 */}
        {step === 1 && (
          <div className="cp-form-step">
            <h2 className="cp-form-step__title">Let's Get Started</h2>
            <p className="cp-form-step__sub">Tell us a bit about yourself and your child</p>
            <div className="cp-form-fields">
              <div className="cp-field">
                <label>Parent / Guardian Name *</label>
                <input type="text" placeholder="Your full name" value={form.name}
                  onChange={e => setField('name', e.target.value)} />
                {errors.name && <span className="cp-error">{errors.name}</span>}
              </div>
              <div className="cp-field-row">
                <div className="cp-field">
                  <label>Email Address *</label>
                  <input type="email" placeholder="you@email.com" value={form.email}
                    onChange={e => setField('email', e.target.value)} />
                  {errors.email && <span className="cp-error">{errors.email}</span>}
                </div>
                <div className="cp-field">
                  <label>Phone Number *</label>
                  <input type="tel" placeholder="+91 91484 22940" value={form.phone}
                    onChange={e => setField('phone', e.target.value)} />
                  {errors.phone && <span className="cp-error">{errors.phone}</span>}
                </div>
              </div>
              <div className="cp-field">
                <label>Number of Children *</label>
                <select value={form.numChildren} onChange={e => setField('numChildren', e.target.value)}>
                  <option value="">Select number</option>
                  {['1 child', '2 children', '3 children', '4 children', '5+ children'].map((o, i) => (
                    <option key={i} value={i === 4 ? '5+' : String(i + 1)}>{o}</option>
                  ))}
                </select>
                {errors.numChildren && <span className="cp-error">{errors.numChildren}</span>}
              </div>
            </div>
            <div className="cp-form-actions cp-form-actions--end">
              <button type="button" className="cp-btn-primary" onClick={next}>
                Continue
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="cp-form-step">
            <h2 className="cp-form-step__title">Choose Your Adventure</h2>
            <p className="cp-form-step__sub">Select the program that best fits your child's age</p>
            <div className="cp-form-fields">
              <div className="cp-program-grid">
                {PROGRAMS_LIST.map(p => (
                  <label key={p.value} className={`cp-program-option${form.program === p.value ? ' cp-program-option--selected' : ''}`}>
                    <input type="radio" name="program" value={p.value}
                      checked={form.program === p.value}
                      onChange={() => { setField('program', p.value); setSelectedProgram(p.value) }}
                    />
                    <div className="cp-program-option__inner">
                      <div>
                        <div className="cp-program-option__name">{p.label}</div>
                        <div className="cp-program-option__age">{p.age}</div>
                      </div>
                      {form.program === p.value && (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                        </svg>
                      )}
                    </div>
                    {prog && form.program === p.value && (
                      <div className="cp-program-snippet">
                        <span>
                          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                          {prog.duration}
                        </span>
                        <span>
                          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                          {prog.location}
                        </span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              {errors.program && <span className="cp-error">{errors.program}</span>}
            </div>
            <div className="cp-form-actions cp-form-actions--between">
              <button type="button" className="cp-btn-ghost" onClick={() => setStep(1)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
                Back
              </button>
              <button type="button" className="cp-btn-primary" onClick={next}>
                Continue
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="cp-form-step">
            <h2 className="cp-form-step__title">Almost There!</h2>
            <p className="cp-form-step__sub">Any additional information we should know?</p>
            <div className="cp-form-fields">
              <div className="cp-field">
                <label>Additional Notes (Optional)</label>
                <textarea rows={4} placeholder="Special requirements, dietary restrictions, medical conditions, or any questions..."
                  value={form.message} onChange={e => setField('message', e.target.value)} />
              </div>

              {/* Summary */}
              <div className="cp-summary">
                <h3>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  Booking Summary
                </h3>
                <div className="cp-summary__rows">
                  {[
                    ['Name', form.name],
                    ['Email', form.email],
                    ['Phone', form.phone],
                    ['Program', prog?.label || form.program],
                    ['Duration', prog?.duration || '—'],
                    ['Location', prog?.location || '—'],
                    ['Children', form.numChildren],
                  ].map(([k, v]) => (
                    <div key={k} className="cp-summary__row">
                      <span>{k}</span>
                      <span>{v || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <label className="cp-terms">
                <input type="checkbox" checked={form.agreeTerms}
                  onChange={e => setField('agreeTerms', e.target.checked)} />
                <span>
                  I agree to LookFarOutdoors' <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                  I understand this is a booking request and final confirmation will be provided by the LookFarOutdoors team.
                </span>
              </label>
              {errors.agreeTerms && <span className="cp-error">{errors.agreeTerms}</span>}
            </div>
            <div className="cp-form-actions cp-form-actions--between">
              <button type="button" className="cp-btn-ghost" onClick={() => setStep(2)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
                Back
              </button>
              <button type="submit" className="cp-btn-primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
                {!submitting && <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cp-hero__eyebrow',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 }
      )
      gsap.fromTo('.cp-hero__headline',
        { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo('.cp-hero__sub',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 }
      )
      gsap.fromTo('.cp-hero__cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.95 }
      )
      gsap.fromTo('.cp-hero__info-item',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out', delay: 0.6 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Trust badges entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cp-trust-badge',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.cp-trust-row', start: 'top 88%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  // Form section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cp-form-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.cp-form-card', start: 'top 88%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <div ref={heroRef} className="cp-hero">
        <div className="cp-hero__inner">
          {/* Left: headline */}
          <div className="cp-hero__left">
            <span className="cp-hero__eyebrow section-label" style={{ opacity: 0 }}>Secure Your Spot</span>
            <h1 className="cp-hero__headline" style={{ opacity: 0 }}>
              Book Your Child's <em>Adventure</em>
            </h1>
            <p className="cp-hero__sub" style={{ opacity: 0 }}>
              Choose your program and reserve a spot. Our team confirms within 24 hours.
            </p>
            <div className="cp-hero__cta" style={{ opacity: 0 }}>
              <a href="#booking-form" className="cp-btn-primary">
                Start Booking
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </a>
            </div>
          </div>
          {/* Right: contact info panel */}
          <div className="cp-hero__right">
            <div className="cp-hero__info-card">
              <div className="cp-hero__info-item" style={{ opacity: 0 }}>
                <div className="cp-hero__info-icon cp-hero__info-icon--green">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <p className="cp-hero__info-label">Email us</p>
                  <p className="cp-hero__info-val">hello@lookfaroutdoors.in</p>
                </div>
              </div>
              <div className="cp-hero__info-item" style={{ opacity: 0 }}>
                <div className="cp-hero__info-icon cp-hero__info-icon--gold">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/></svg>
                </div>
                <div>
                  <p className="cp-hero__info-label">WhatsApp</p>
                  <p className="cp-hero__info-val">+91 91484 22940</p>
                </div>
              </div>
              <div className="cp-hero__info-item" style={{ opacity: 0 }}>
                <div className="cp-hero__info-icon cp-hero__info-icon--green">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <p className="cp-hero__info-label">Based in</p>
                  <p className="cp-hero__info-val">Bangalore, Karnataka</p>
                </div>
              </div>
              <div className="cp-hero__info-stats">
                <div className="cp-hero__stat">
                  <span className="cp-hero__stat-num">2,500+</span>
                  <span className="cp-hero__stat-lbl">Kids Served</span>
                </div>
                <div className="cp-hero__stat">
                  <span className="cp-hero__stat-num">4.9★</span>
                  <span className="cp-hero__stat-lbl">Parent Rating</span>
                </div>
                <div className="cp-hero__stat">
                  <span className="cp-hero__stat-num">24 hrs</span>
                  <span className="cp-hero__stat-lbl">Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cp-hero__wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,0 C360,60 1080,0 1440,48 L1440,60 L0,60 Z" fill="var(--forest-deep)" />
          </svg>
        </div>
      </div>

      {/* ── TRUST BADGES ─────────────────────── */}
      <section className="cp-trust-section">
        <div className="cp-trust-row">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className={`cp-trust-badge cp-trust-badge--${b.accent}`}>
              <div className="cp-trust-badge__icon">{b.icon}</div>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM ─────────────────────────────── */}
      <section className="cp-form-section" id="booking-form">
        <div className="cp-form-section__inner">
          <div className="cp-form-header">
            <span className="section-label section-label--gold-dark">Booking Request</span>
            <h2 className="cp-form-title">Start Your <em>Adventure</em></h2>
            <p className="cp-form-sub">Fill in your details below. We'll confirm availability and send a full itinerary within 24 hours.</p>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────── */}
      <section className="cp-social-proof">
        <div className="cp-social-proof__inner">
          <p className="cp-social-proof__note">
            <strong>24</strong> families booked in the last 7 days
          </p>
          <div className="cp-social-proof__pills">
            {[
              { icon: '★', label: '4.9 / 5 Rating' },
              { icon: '✓', label: '100% Safe Record' },
              { icon: '🏆', label: 'Award Winning' },
            ].map((p, i) => (
              <span key={i} className="cp-proof-pill">
                <span>{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA ─────────────────────── */}
      <section className="cp-wa-section">
        <div className="cp-wa-inner">
          <div className="cp-wa-content">
            <h2>Prefer to chat <em>directly?</em></h2>
            <p>Message us on WhatsApp and we'll help you pick the right program, check availability, and answer any questions — in minutes.</p>
            <a
              href="https://wa.me/919148422940?text=Hi%20LookFarOutdoors!%20I'd%20like%20to%20book%20an%20adventure."
              target="_blank"
              rel="noopener noreferrer"
              className="cp-whatsapp-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
          <div className="cp-wa-details">
            <div className="cp-contact-item">
              <div className="cp-contact-item__icon cp-contact-item__icon--green">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div>
                <p className="cp-contact-item__label">Email</p>
                <p className="cp-contact-item__val">hello@lookfaroutdoors.in</p>
              </div>
            </div>
            <div className="cp-contact-item">
              <div className="cp-contact-item__icon cp-contact-item__icon--gold">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </div>
              <div>
                <p className="cp-contact-item__label">Phone</p>
                <p className="cp-contact-item__val">+91 91484 22940</p>
              </div>
            </div>
            <div className="cp-contact-item">
              <div className="cp-contact-item__icon cp-contact-item__icon--green">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <div>
                <p className="cp-contact-item__label">Based In</p>
                <p className="cp-contact-item__val">Bangalore, Karnataka</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
