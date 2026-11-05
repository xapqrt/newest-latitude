import { useRef } from 'react'
import Scene from './Scene'
import TransitionLink from './TransitionLink'
import { buildWhatsAppLink } from '../utils/whatsapp'
import { useScrollEffects } from '../hooks/useScrollEffects'
import boulders from '../assets/bg/boulders.webp'
import hills from '../assets/bg/hills.webp'
import camp from '../assets/bg/camp.webp'
import lake from '../assets/bg/lake.webp'
import kidsGroup from '../assets/photos/kids-group.webp'

const BELIEFS = [
  { title: 'The field is the school', text: 'A trail, a stream and an open ridge teach things a room with four walls cannot.' },
  { title: 'Space to be bored', text: 'Free time is where kids invent games and find out what they actually enjoy.' },
  { title: 'Risk is part of growing', text: 'Climbing a rock or crossing a stream are small rehearsals for a capable life.' },
  { title: 'We trust children', text: 'Kids can do more than we think. We set it up, then step back.' },
]

const PROMISES = [
  { who: 'To the child', text: 'We will not over-explain or over-protect. We will bring you somewhere real and let you find out what you are made of.' },
  { who: 'To the parent', text: 'We will bring your child home muddy, tired and more themselves than when they left.' },
  { who: 'To the land', text: 'We treat forests, trails and lakes as classrooms worth caring for, and teach every child to do the same.' },
]

const SAFETY = [
  { title: '1:3 guide to child', text: 'On kids’ camps, every child gets close, personal attention.' },
  { title: 'First-aid trained', text: 'Our guides carry field medical kits and know how to use them.' },
  { title: 'Parent updates', text: 'Photos and updates on WhatsApp, so you know they are having fun.' },
  { title: 'Scouted sites', text: 'Every trail and basecamp is checked by our team before a child goes there.' },
  { title: 'Background-checked guides', text: 'Verified, reference-checked and tested in the field.' },
  { title: 'Emergency plans', text: 'Clear action plans for every site, so nothing is left to chance.' },
]

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollEffects(ref)
  return (
    <div ref={ref} className="about">
      <section className="about-hero">
        <img src={boulders} alt="" className="about-hero__img" fetchPriority="high" />
        <div className="about-hero__shade" />
        <div className="about-hero__inner">
          <h1>Real terrain.<br /><span>Real discovery.</span></h1>
          <p>Lookfar Outdoors takes children into forests, fields and open country, and gives them back what a planned-to-the-minute childhood rarely has: the chance to find out what they can do.</p>
        </div>
      </section>

      <Scene images={[hills, camp]} tone="pine">
        <section className="band">
          <div className="band__inner about-story">
            <img src={kidsGroup} alt="Kids and guides on a Lookfar camp" className="about-story__img" loading="lazy" data-reveal />
            <div data-reveal>
              <h2>How it started</h2>
              <p>A couple of years ago we left our IT careers and moved to Dehradun, trading screens for the trails of the Himalayas.</p>
              <p>Out there we saw it clearly: a child learns more about resilience from crossing a real stream or finding an unclear trail than from any textbook.</p>
              <p>Lookfar Outdoors is that lesson, brought to a field school for the next generation.</p>
            </div>
          </div>
        </section>

        <section className="band">
          <div className="band__inner">
            <h2 className="band__title" data-reveal>What we believe</h2>
            <div className="why__grid about-grid">
              {BELIEFS.map((b) => (
                <article key={b.title} className="why__card" data-reveal>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Scene>

      <Scene images={[lake]} tone="dusk">
        <section className="band">
          <div className="band__inner">
            <h2 className="band__title" data-reveal>Our promise</h2>
            <div className="about-promise">
              {PROMISES.map((p) => (
                <article key={p.who} className="review" data-reveal>
                  <h3>{p.who}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="band__inner">
            <h2 className="band__title" data-reveal>How we keep kids safe</h2>
            <div className="about-safety">
              {SAFETY.map((s) => (
                <div key={s.title} className="about-safety__item" data-reveal>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band--cta">
          <div className="band__inner band__inner--center">
            <h2 className="band__title" data-reveal>Come and see for yourself</h2>
            <div className="cta__btns" data-reveal>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-primary-hero">Chat on WhatsApp</a>
              <TransitionLink to="/programs" className="btn-ghost-hero">See the programs</TransitionLink>
            </div>
          </div>
        </section>
      </Scene>
    </div>
  )
}
