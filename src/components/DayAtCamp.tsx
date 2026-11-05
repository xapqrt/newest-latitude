import InstagramLink from './InstagramLink'
import { COPY } from '../data/copy'
import trek from '../assets/photos/trek-line.webp'
import kayak from '../assets/photos/kayak-kids.webp'
import pottery from '../assets/photos/pottery.webp'
import lake from '../assets/photos/lakeside.webp'
import friends from '../assets/photos/kids-group.webp'
import boulders from '../assets/photos/boulders.webp'

const TILES = [
  { src: trek, label: 'Forest treks', alt: 'Kids and guides walking along a forest trail' },
  { src: kayak, label: 'Paddling and splashing', alt: 'Kids in life jackets holding up paddles by a lake' },
  { src: pottery, label: 'Pottery and painting', alt: 'A child holding a clay pot they made' },
  { src: lake, label: 'Lake and coracle', alt: 'Families at a lakeside meadow' },
  { src: friends, label: 'New friends', alt: 'Kids and guides posing in a field' },
  { src: boulders, label: 'Boulders and hilltops', alt: 'Families resting among granite boulders' },
]

export default function DayAtCamp() {
  return (
    <section className="day">
      <div className="programs__head" data-reveal>
        <h2>{COPY.day.heading}</h2>
      </div>
      <div className="day__grid">
        {TILES.map((t) => (
          <figure key={t.label} className="day__tile" data-reveal>
            <img src={t.src} alt={t.alt} loading="lazy" />
            <figcaption>{t.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="day__more" data-reveal><InstagramLink /></div>
    </section>
  )
}
