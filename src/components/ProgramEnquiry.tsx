import { buildWhatsAppLink } from '../utils/whatsapp'
import TransitionLink from './TransitionLink'

/** Closing call to action shown at the end of each program page. */
export default function ProgramEnquiry({ programId, title }: { programId: string; title: string }) {
  return (
    <section className="fp-enquiry">
      <h2>Join the {title}</h2>
      <p>Message us for dates and we’ll take it from there.</p>
      <div className="fp-enquiry__btns">
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="fp-btn fp-btn--whatsapp"
        >
          Enquire on WhatsApp
        </a>
        <TransitionLink to={`/contact?program=${programId}`} className="fp-btn fp-btn--outline">
          Send an Enquiry
        </TransitionLink>
      </div>
    </section>
  )
}
