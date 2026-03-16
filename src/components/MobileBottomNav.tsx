export default function MobileBottomNav() {
  const path = window.location.pathname

  const links = [
    {
      href: '/',
      label: 'Home',
      active: path === '/',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
    },
    {
      href: '/programs',
      label: 'Programs',
      active: path.startsWith('/programs') || path.includes('explorers') || path.includes('adventurers') || path.includes('leaders') || path.includes('expeditions'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
        </svg>
      ),
    },
    {
      href: '/guides',
      label: 'Guides',
      active: path.startsWith('/guides'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
    },
    {
      href: '/contact',
      label: 'Book',
      active: path.startsWith('/contact'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
        </svg>
      ),
    },
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          className={`mobile-bottom-nav__item${link.active ? ' mobile-bottom-nav__item--active' : ''}`}
          aria-current={link.active ? 'page' : undefined}
        >
          <span className="mobile-bottom-nav__icon">{link.icon}</span>
          <span className="mobile-bottom-nav__label">{link.label}</span>
        </a>
      ))}
    </nav>
  )
}
