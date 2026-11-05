import { getVisiblePrograms } from '../data/programs'
import TransitionLink from './TransitionLink'
import { COPY } from '../data/copy'
import campsite from '../assets/photos/campsite-tents.webp'

const PHOTO_OVERRIDE: Record<string, string> = { 'junior-adventurers': campsite }

export function ProgramPanels() {
  return (
    <div className="programs__list">
      {getVisiblePrograms().map((p, i) => (
        <TransitionLink key={p.id} to={p.href} className={`panel${i % 2 ? ' panel--right' : ''}`} data-reveal>
          <img data-parallax className="panel__img" src={PHOTO_OVERRIDE[p.id] ?? p.img} alt={p.title} loading="lazy" />
          <span className={`panel__badge panel__badge--${p.audience}`}>{p.audience === 'family' ? 'Family · all ages' : 'Kids · 7–12'}</span>
          <div className="panel__shade" />
          <div className="panel__body">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="panel__meta">
              <span>{p.duration}</span>
              <span>{p.price ?? 'Ask us for pricing'}</span>
            </div>
            <span className="panel__cta">See the plan <i aria-hidden="true">→</i></span>
          </div>
        </TransitionLink>
      ))}
    </div>
  )
}

export default function Programs() {
  return (
    <section className="programs">
      <div className="programs__head" data-reveal>
        <h2>{COPY.programs.heading}</h2>
        <p>{COPY.programs.sub}</p>
        <ul className="chips">
          <li><strong>1:3</strong> guide to child</li>
          <li><strong>7–12</strong> kids’ camps</li>
          <li><strong>All ages</strong> family camps</li>
        </ul>
      </div>
      <ProgramPanels />
    </section>
  )
}
