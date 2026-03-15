import { useEffect, useRef } from 'react'

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      frame++
      // Only update every 3 frames for performance
      if (frame % 3 === 0) {
        const w = canvas.width
        const h = canvas.height
        const imageData = ctx.createImageData(w, h)
        const buf = imageData.data

        for (let i = 0; i < buf.length; i += 4) {
          const v = (Math.random() * 255) | 0
          buf[i] = v
          buf[i + 1] = v
          buf[i + 2] = v
          buf[i + 3] = 18  // very low alpha
        }
        ctx.putImageData(imageData, 0, 0)
      }
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="film-grain-canvas"
      aria-hidden="true"
    />
  )
}
