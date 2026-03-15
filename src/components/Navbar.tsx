import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [shadowed, setShadowed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setShadowed(y > 40)
      setHidden(y > lastY.current && y > 200)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = [
    'navbar',
    shadowed ? 'navbar--shadow' : '',
    hidden ? 'navbar--hidden' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <nav ref={navRef} className={navClass}>
        {/* Logo */}
        <a href="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          Latitude
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><a href="/">Home</a></li>
          <li><a href="/programs">Programs</a></li>
          <li><a href="/guides">Our Guides</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>

        {/* Desktop CTA */}
        <a href="/contact" className="navbar__cta">Contact Us</a>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`navbar__drawer-overlay${drawerOpen ? ' navbar__drawer-overlay--visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`navbar__drawer${drawerOpen ? ' navbar__drawer--open' : ''}`}>
        <button className="navbar__drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
          ✕
        </button>
        <ul className="navbar__drawer-links">
          <li><a href="/" onClick={() => setDrawerOpen(false)}>Home</a></li>
          <li><a href="/programs" onClick={() => setDrawerOpen(false)}>Programs</a></li>
          <li><a href="/guides" onClick={() => setDrawerOpen(false)}>Our Guides</a></li>
          <li><a href="/about" onClick={() => setDrawerOpen(false)}>About Us</a></li>
          <li><a href="/contact" onClick={() => setDrawerOpen(false)}>Contact Us</a></li>
        </ul>
      </div>
    </>
  )
}
