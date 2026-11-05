import { buildWhatsAppLink } from '../utils/whatsapp'
import { COPY } from '../data/copy'
import TransitionLink from './TransitionLink'

export default function CTA() {
  return (
    <section className="band band--cta" id="contact">
      <div className="band__inner band__inner--center">
        <h2 className="band__title" data-reveal>{COPY.cta.heading}</h2>
        <p data-reveal>{COPY.cta.sub}</p>
        <div className="cta__btns" data-reveal>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary-hero">Chat on WhatsApp</a>
          <TransitionLink to="/contact" className="btn-ghost-hero">Send an enquiry</TransitionLink>
        </div>
      </div>
    </section>
  )
}
