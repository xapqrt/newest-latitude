import { useLocation } from 'react-router-dom'
import { SHOW_GUIDES_PAGE } from '../config/featureFlags'
import TransitionLink from './TransitionLink'
import { PROGRAMS } from '../data/programs'
import { buildWhatsAppLink } from '../utils/whatsapp'

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
      active: pathname.startsWith('/programs') || PROGRAMS.some((p) => p.href === pathname),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
        </svg>
      ),
    },
    {
      href: '/contact',
      label: 'Enquire',
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
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-bottom-nav__item mobile-bottom-nav__item--whatsapp"
      >
        <span className="mobile-bottom-nav__icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
          </svg>
        </span>
        <span className="mobile-bottom-nav__label">WhatsApp</span>
      </a>
    </nav>
  )
}