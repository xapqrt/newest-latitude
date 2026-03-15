import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import 'gsap/ScrollTrigger'

interface Stat {
  end: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { end: 1000, suffix: '+', label: 'Happy Kids' },
  { end: 50, suffix: '+', label: 'Programs Run' },
  { end: 4.9, suffix: '★', label: 'Parent Rating' },
]

export default function StatsBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const numRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!barRef.current) return

    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.end,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent =
              (stat.end % 1 === 0
                ? Math.floor(obj.val).toLocaleString()
                : obj.val.toFixed(1)) + stat.suffix
          },
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, barRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={barRef} className="stats-bar">
      {STATS.map((stat, i) => (
        <div key={i} className="stats-bar__item">
          <div
            ref={el => { numRefs.current[i] = el }}
            className="stats-bar__num"
          >
            0{stat.suffix}
          </div>
          <div className="stats-bar__label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
