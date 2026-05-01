import { SHOW_GUIDES_PAGE } from '../config/featureFlags'
import { buildWhatsAppLink } from '../utils/whatsapp'
import { getVisiblePrograms } from '../data/programs'
import TransitionLink from './TransitionLink'

export default function Footer() {
  const visibleFooterProgramLinks = getVisiblePrograms()

  return (
    <footer className="footer">
      {/* SVG texture overlay */}
      <div className="footer-texture" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerLeaf" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 10 Q52 25 40 40 Q28 25 40 10Z"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
              <circle cx="40" cy="42" r="1.5" fill="rgba(255,255,255,0.03)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerLeaf)" />
        </svg>
      </div>

      <div className="footer-inner">
        {/* Pull-quote */}
        <div className="footer-pullquote">
          <p className="footer-pullquote__text">
            "The best investment you can make<br />
            <em>is in a childhood worth remembering.</em>"
          </p>
        </div>

        {/* WhatsApp CTA */}
        <div className="footer-wa-cta">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-wa-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
            </svg>
            Chat with us on WhatsApp
          </a>
          <p className="footer-wa-subtext">Usually replies within the hour</p>
        </div>

        {/* Main grid */}
        <div className="footer-grid">
          {/* Brand col */}
          <div>
            <div className="footer-brand-name">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#1f6b2e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="footer-brand-name__text">
                <span>lookfar</span>
                <span className="footer-brand-name__accent">outdoors</span>
              </span>
            </div>
            <p className="footer-brand-tagline">
              Outdoor education experiences for children in Bangalore — where nature is the teacher.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="footer-social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/919148422940"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.975-1.306A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><TransitionLink to="/">Home</TransitionLink></li>
              <li><TransitionLink to="/programs">Programs</TransitionLink></li>
              {SHOW_GUIDES_PAGE && <li><TransitionLink to="/guides">Our Guides</TransitionLink></li>}
              <li><TransitionLink to="/about">About Us</TransitionLink></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              {visibleFooterProgramLinks.map((p) => (
                <li key={p.href}><TransitionLink to={p.href}>{p.title}</TransitionLink></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                 <a href="mailto:hello@lookfaroutdoors.in">hello@lookfaroutdoors.in</a>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                +91 91484 22940
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Bangalore, Karnataka
              </li>
            </ul>
          </div>
        </div>

        {/* Amber rule */}
        <div className="footer-rule" aria-hidden="true" />

        <div className="footer-bottom">
          <p>© 2026 LookfarOutdoors. All rights reserved.</p>
          <div className="footer-bottom-links">
            <TransitionLink to="/privacy">Privacy Policy</TransitionLink>
            <TransitionLink to="/terms">Terms of Service</TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
