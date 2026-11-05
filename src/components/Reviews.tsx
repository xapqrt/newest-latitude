import { COPY } from '../data/copy'
import { REVIEWS } from '../data/reviews'

export default function Reviews() {
  return (
    <section className="band band--reviews">
      <div className="band__inner">
        <h2 className="band__title" data-reveal>{COPY.reviews.heading}</h2>
        <div className="reviews__grid">
          {REVIEWS.map((review) => (
            <figure key={review.name + review.detail} className="review" data-reveal>
              <blockquote>“{review.text}”</blockquote>
              <figcaption>
                <span className="review__avatar" aria-hidden="true">{review.name[0]}</span>
                <span><strong>{review.name}</strong><br />{review.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
