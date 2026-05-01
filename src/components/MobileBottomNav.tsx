import { useLocation } from 'react-router-dom'
import { SHOW_GUIDES_PAGE } from '../config/featureFlags'
import TransitionLink from './TransitionLink'

export default function MobileBottomNav() {
  const { pathname } = useLocation()

  const links = [
    {
      href: '/',
      label: 'Home',
      active: pathname === '/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
    },
    {
      href: '/programs',
      label: 'Programs',
      active: pathname.startsWith('/programs') || pathname.includes('explorers') || pathname.includes('adventurers') || pathname.includes('leaders') || pathname.includes('expeditions'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
        </svg>
      ),
    },
    {
      href: '/contact',
      label: 'Book',
      active: pathname.startsWith('/contact'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
        </svg>
      ),
    },
  ]

  const visibleLinks = SHOW_GUIDES_PAGE ? links : links.filter((link) => link.href !== '/guides')

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {visibleLinks.map(link => (
        <TransitionLink
          key={link.href}
          to={link.href}
          className={`mobile-bottom-nav__item${link.active ? ' mobile-bottom-nav__item--active' : ''}`}
          aria-current={link.active ? 'page' : undefined}
        >
          <span className="mobile-bottom-nav__icon">{link.icon}</span>
          <span className="mobile-bottom-nav__label">{link.label}</span>
        </TransitionLink>
      ))}
    </nav>
  )
}