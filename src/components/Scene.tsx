import type { ReactNode } from 'react'

/**
 * A run of sections over one or more photos stacked top to bottom. The photos scroll with the page
 * (nothing locks) and dissolve into each other and into the page colour.
 */
export default function Scene({ images, tone = 'pine', children }: { images: string[]; tone?: 'pine' | 'night' | 'dusk'; children: ReactNode }) {
  return (
    <div className={`scene scene--${tone}`}>
      <div className="scene__bg" aria-hidden="true">
        {images.map((src) => (
          <div key={src} className="scene__slice"><img src={src} alt="" /></div>
        ))}
      </div>
      {children}
    </div>
  )
}
