import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PrivacyPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.legal-hero',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.15 }
      )
      gsap.fromTo('.legal-body > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, delay: 0.4 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="legal-page">
      <div className="legal-hero">
        <span className="section-label">Legal</span>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-meta">Last updated: March 2026</p>
      </div>

      <div className="legal-inner">
        <div className="legal-body">
          <p>
            LookFarOutdoors ("we", "our", or "us") operates the website at lookfaroutdoors.in. This Privacy Policy describes how we collect, use, and protect your personal information when you interact with our website or enquire about our programs.
          </p>

          <h2>Information We Collect</h2>
          <p>When you contact us or submit an enquiry, we may collect:</p>
          <ul>
            <li>Your name and your child's name and age</li>
            <li>Email address and phone number</li>
            <li>Any additional information you provide in your message</li>
          </ul>
          <p>We do not collect payment information directly — all bookings are handled via direct communication.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information you provide solely to:</p>
          <ul>
            <li>Respond to your enquiries and booking requests</li>
            <li>Provide information about upcoming programs and availability</li>
            <li>Communicate logistics and safety information for booked programs</li>
          </ul>
          <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

          <h2>WhatsApp & Communication</h2>
          <p>
            When you use our WhatsApp contact buttons, your message is sent directly to our team via WhatsApp. WhatsApp's own privacy policy governs the handling of that communication on their platform.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use minimal session cookies necessary for the site to function. We do not use tracking cookies or third-party advertising cookies. We do not show a cookie banner because we do not collect analytics or marketing data.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain your contact information only as long as necessary to process your enquiry or manage your child's program participation. You may request deletion of your data at any time by contacting us.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our programs are designed for children aged 5–16. All contact and registration is handled with parents or legal guardians. We do not knowingly collect personal information directly from children under 13 without parental consent.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please contact us at{' '}
            <a href="mailto:hello@lookfaroutdoors.in">hello@lookfaroutdoors.in</a> or via WhatsApp at +91 91484 22940.
          </p>
        </div>
      </div>
    </div>
  )
}
