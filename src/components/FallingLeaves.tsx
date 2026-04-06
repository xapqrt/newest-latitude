/**
 * FallingLeaves — pure-CSS falling leaf overlay rendered site-wide.
 * Lightweight: no canvas, no RAF, no JS animation. Each leaf is a small
 * inline SVG driven entirely by CSS @keyframes on the GPU.
 */

const LEAF_COUNT = 12

// Deterministic-looking random via index — avoids Math.random() on every render
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

interface LeafStyle {
  left: string
  animationDuration: string
  animationDelay: string
  opacity: number
  fontSize: string
}

function getLeafStyle(i: number): LeafStyle {
  return {
    left: `${seeded(i) * 100}%`,
    animationDuration: `${12 + seeded(i + 3) * 16}s`,
    animationDelay: `${seeded(i + 7) * -20}s`,
    opacity: 0.12 + seeded(i + 11) * 0.16,
    fontSize: `${10 + seeded(i + 5) * 14}px`,
  }
}

export default function FallingLeaves() {
  return (
    <div className="falling-leaves" aria-hidden="true">
      {Array.from({ length: LEAF_COUNT }, (_, i) => (
        <span key={i} className="falling-leaf" style={getLeafStyle(i)}>
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.71c.37.45.78.87 1.23 1.25C10.46 22.63 14 24 17 24c0-6-3-8-3-8s4-1.5 7-5c-2 0-4-.5-4-.5s2.5-2.5 4-6.5C18 5 17 8 17 8z"/>
          </svg>
        </span>
      ))}
    </div>
  )
}
