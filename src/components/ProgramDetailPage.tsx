import '../program-detail.css'
import { PROGRAM_PAGES } from '../data/programPages'
import ProgramEnquiry from './ProgramEnquiry'
import { getProgramById } from '../data/programs'

export default function ProgramDetailPage({ programId }: { programId: string }) {
  const data = PROGRAM_PAGES[programId]
  const program = getProgramById(programId)

  return (
    <div className="fp">
      <header className="fp-hero">
        <img src={data.heroImage} alt={data.heroAlt} className="fp-hero__img" fetchPriority="high" />
        <div className="fp-hero__overlay" />
        <div className="fp-hero__content">
          <p className="fp-eyebrow fp-eyebrow--light">{data.eyebrow}</p>
          <h1 className="fp-hero__title">
            {data.headlineLead} <em>{data.headlineEm}</em>
          </h1>
          <p className="fp-hero__sub">{data.sub}</p>
          {data.priceCards && <a href="#pricing" className="fp-hero__link">See what it costs ↓</a>}
        </div>
      </header>

      <section className="fp-facts" aria-label="Key details">
        {data.facts.map((fact) => (
          <div key={fact.label} className="fp-fact">
            <span className="fp-fact__label">{fact.label}</span>
            <span className="fp-fact__value">{fact.value}</span>
          </div>
        ))}
      </section>

      <section className="fp-section fp-overview">
        <div>
          <h2 className="fp-title">{data.overviewTitle}</h2>
          {data.overview.map((text) => <p key={text} className="fp-text">{text}</p>)}
        </div>
        <img src={data.overviewImage} alt={data.overviewAlt} className="fp-overview__img" loading="lazy" />
      </section>

      <section className="fp-band">
        <div className="fp-section">
          <h2 className="fp-title fp-title--center">What’s on</h2>
          <div className="fp-activities">
            {data.activities.map((activity) => (
              <article key={activity.title} className="fp-activity">
                <span className="fp-activity__icon" aria-hidden="true">{activity.icon}</span>
                <h3>{activity.title}</h3>
                <p>{activity.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fp-section fp-section--narrow">
        <h2 className="fp-title fp-title--center">{data.itineraryTitle}</h2>
        {data.itinerary.map((day, dayIndex) => (
          <details key={day.heading ?? dayIndex} className="fp-day" open={dayIndex === 0 || !day.heading}>
            {day.heading ? <summary className="fp-day__heading">{day.heading}</summary> : <summary className="fp-day__heading fp-day__heading--hidden">Itinerary</summary>}
            <ol className="fp-timeline">
              {day.items.map((item) => (
                <li key={item.time + item.title} className="fp-timeline__item">
                  <span className="fp-timeline__time">{item.time}</span>
                  <div className="fp-timeline__body">
                    <span className="fp-timeline__title">{item.title}</span>
                    {item.desc && <span className="fp-timeline__desc">{item.desc}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </details>
        ))}
        <p className="fp-note">{data.itineraryNote}</p>
      </section>

      {data.priceCards && (
      <section id="pricing" className="fp-pricing">
        <div className="fp-section">
          <h2 className="fp-title fp-title--center fp-title--light">What it costs</h2>
          <div className="fp-price-grid">
            {data.priceCards?.map((card) => (
              <div key={card.label} className="fp-price">
                <span className="fp-price__label">{card.label}</span>
                <span className="fp-price__value">{card.price}</span>
                {card.unit && <span className="fp-price__unit">{card.unit}</span>}
              </div>
            ))}
          </div>
          <p className="fp-pricing__foot">{data.priceFootnote}</p>
          <div className={`fp-lists${data.bringAlong ? ' fp-lists--two' : ''}`}>
            <div className="fp-list">
              <h3>What’s included</h3>
              <ul>{data.includes?.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            {data.bringAlong && (
              <div className="fp-list">
                <h3>What to bring</h3>
                <ul>{data.bringAlong.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {data.safety && (
        <section className="fp-section">
          <h2 className="fp-title fp-title--center">Safety &amp; Care</h2>
          <div className="fp-safety">
            {data.safety.map((item) => (
              <article key={item.title} className="fp-safety__item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {data.reviews && (
        <section className="fp-band">
          <div className="fp-section">
            <h2 className="fp-title fp-title--center">What parents say</h2>
            <div className="fp-reviews">
              {data.reviews.map((review) => (
                <figure key={review.name} className="fp-review">
                  <blockquote>“{review.text}”</blockquote>
                  <figcaption><strong>{review.name}</strong> · {review.detail}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.gallery && (
      <section className="fp-section">
        <div className="fp-gallery">
          {data.gallery.map((photo) => (
            <img key={photo.alt} src={photo.src} alt={photo.alt} loading="lazy" />
          ))}
        </div>
      </section>
      )}

      <ProgramEnquiry programId={programId} title={program?.title ?? ''} />
    </div>
  )
}
