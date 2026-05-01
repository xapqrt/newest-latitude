import { useEffect } from 'react'

interface JsonLdProps {
  schema: Record<string, unknown>
}

export default function JsonLd({ schema }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.id = 'json-ld'
    document.head.appendChild(script)
    return () => {
      const existing = document.getElementById('json-ld')
      existing?.remove()
    }
  }, [schema])
  return null
}