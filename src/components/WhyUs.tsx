
import { COPY } from '../data/copy'

const FEATURES = [
  { title: 'Safe, always', desc: 'First-aid trained guides on every trip.', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z' },
  { title: 'Guides who get kids', desc: 'Patient, warm and great with children.', icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
  { title: 'Wild, but close', desc: 'Forests, boulders and lakes near the city.', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
  { title: 'You’ll notice it', desc: 'Kids come home braver and more confident.', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
]

export default function WhyUs() {
  return (
    <section className="band band--why">
      <div className="band__inner">
        <h2 className="band__title" data-reveal>{COPY.why.heading[0]} <span>{COPY.why.heading[1]}</span></h2>
        <p className="why__aside" data-reveal>{COPY.why.aside}</p>
        <div className="why__grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="why__card" data-reveal>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={f.icon} /></svg>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
