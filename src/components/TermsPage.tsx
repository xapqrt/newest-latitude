import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TermsPage() {
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
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-meta">Last updated: March 2026</p>
      </div>

      <div className="legal-inner">
        <div className="legal-body">
          <p>
            By accessing the Latitude website or enrolling your child in a Latitude program, you agree to the following terms. Please read them carefully.
          </p>

          <h2>Programs & Participation</h2>
          <p>
            Latitude offers outdoor education programs for children aged 5–16 in and around Bangalore. All programs are operated by trained, certified outdoor educators. Participation is subject to availability and suitability for the child's age group.
          </p>
          <ul>
            <li>All participants must be within the stated age range for their program</li>
            <li>A parent or legal guardian must complete registration on behalf of the child</li>
            <li>You must disclose any medical conditions, allergies, or special needs at the time of booking</li>
          </ul>

          <h2>Bookings & Cancellations</h2>
          <p>
            Bookings are confirmed upon receipt of payment or written confirmation from our team. We reserve the right to cancel or reschedule programs due to unsafe weather conditions or insufficient enrolments.
          </p>
          <ul>
            <li>Cancellations made 7+ days before the program: full refund or credit</li>
            <li>Cancellations made 3–6 days before: 50% refund or full credit</li>
            <li>Cancellations made less than 72 hours before: no refund, but credit may be issued at our discretion</li>
            <li>If Latitude cancels a program, a full refund or reschedule will be offered</li>
          </ul>

          <h2>Health & Safety</h2>
          <p>
            Safety is our highest priority. All Latitude programs follow established outdoor safety protocols. Participants must:
          </p>
          <ul>
            <li>Follow all instructions from guides and staff at all times</li>
            <li>Wear appropriate clothing and footwear as advised</li>
            <li>Not participate if unwell or if a medical condition makes participation unsafe</li>
          </ul>
          <p>
            Latitude carries public liability insurance for all programs. Parents/guardians consent to reasonable outdoor activity risk when enrolling their child.
          </p>

          <h2>Photography & Media</h2>
          <p>
            Latitude may photograph or film program activities for use on our website and social media. If you do not consent to your child being photographed, please notify us in writing before the program begins. We will not publish images where a child is identifiable without parental consent.
          </p>

          <h2>Liability</h2>
          <p>
            While Latitude takes all reasonable precautions, outdoor activities carry inherent risks. By enrolling, parents/guardians acknowledge these risks and agree that Latitude is not liable for minor injuries or losses arising from participation in activities conducted within normal safety standards.
          </p>

          <h2>Website Use</h2>
          <p>
            The content on this website is provided for informational purposes. Latitude does not guarantee that program descriptions, availability, or dates shown are always current. Always confirm details with us directly before booking.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of our website or participation in our programs after changes constitutes acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at{' '}
            <a href="mailto:hello@latitudeoutdoors.in">hello@latitudeoutdoors.in</a> or via WhatsApp at +91 98765 43210.
          </p>
        </div>
      </div>
    </div>
  )
}
