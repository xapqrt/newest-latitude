import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SHOW_GUIDES_PAGE } from '../config/featureFlags'
import TransitionLink from './TransitionLink'
import lookfarWhiteLogo from '../assets/lookfar-white-logo.png'

export default function Navbar() {
  const { pathname } = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const [shadowed, setShadowed] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const lastY = useRef(0)

  const PROGRAM_SUBROUTES = ['/little-explorers', '/junior-adventurers']
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/programs') return pathname.startsWith('/programs') || PROGRAM_SUBROUTES.includes(pathname)
    return pathname.startsWith(href)
  }

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
        <TransitionLink to="/" className="navbar__logo">
          <img src={lookfarWhiteLogo} alt="Lookfar Outdoors" className="navbar__logo-img" />
        </TransitionLink>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><TransitionLink to="/" className={isActive('/') ? 'navbar__link--active' : ''}>Home</TransitionLink></li>
          <li><TransitionLink to="/programs" className={isActive('/programs') ? 'navbar__link--active' : ''}>Programs</TransitionLink></li>
          {SHOW_GUIDES_PAGE && <li><TransitionLink to="/guides" className={isActive('/guides') ? 'navbar__link--active' : ''}>Our Guides</TransitionLink></li>}
          <li><TransitionLink to="/about" className={isActive('/about') ? 'navbar__link--active' : ''}>About Us</TransitionLink></li>
        </ul>

        {/* Desktop CTA */}
        <TransitionLink to="/contact" className="navbar__cta">Contact Us</TransitionLink>

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
          <li><TransitionLink to="/" className={isActive('/') ? 'navbar__link--active' : ''} onClick={() => setDrawerOpen(false)}>Home</TransitionLink></li>
          <li><TransitionLink to="/programs" className={isActive('/programs') ? 'navbar__link--active' : ''} onClick={() => setDrawerOpen(false)}>Programs</TransitionLink></li>
          {SHOW_GUIDES_PAGE && <li><TransitionLink to="/guides" className={isActive('/guides') ? 'navbar__link--active' : ''} onClick={() => setDrawerOpen(false)}>Our Guides</TransitionLink></li>}
          <li><TransitionLink to="/about" className={isActive('/about') ? 'navbar__link--active' : ''} onClick={() => setDrawerOpen(false)}>About Us</TransitionLink></li>
          <li><TransitionLink to="/contact" className={isActive('/contact') ? 'navbar__link--active' : ''} onClick={() => setDrawerOpen(false)}>Contact Us</TransitionLink></li>
        </ul>
      </div>
    </>
  )
}
