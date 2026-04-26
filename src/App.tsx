import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FilmGrain from './components/FilmGrain'
import FallingLeaves from './components/FallingLeaves'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollProgress from './components/ScrollProgress'
import SplashLoader from './components/SplashLoader'
import PageTransition from './components/PageTransition'
import MobileBottomNav from './components/MobileBottomNav'
import { SHOW_GUIDES_PAGE } from './config/featureFlags'

// Lazy-load page components — only the current page's JS is fetched
const ProgramsPage          = lazy(() => import('./components/ProgramsPage'))
const GuidesPage            = lazy(() => import('./components/GuidesPage'))
const AboutPage             = lazy(() => import('./components/AboutPage'))
const ContactPage           = lazy(() => import('./components/ContactPage'))
const LittleExplorersPage   = lazy(() => import('./components/LittleExplorersPage'))
const JuniorAdventurersPage = lazy(() => import('./components/JuniorAdventurersPage'))
const NotFoundPage          = lazy(() => import('./components/NotFoundPage'))
const PrivacyPage           = lazy(() => import('./components/PrivacyPage'))
const TermsPage             = lazy(() => import('./components/TermsPage'))

// Per-page meta — title + description
const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'LookFarOutdoors — Kids Outdoor Adventures in Bangalore',
    description: 'LookFarOutdoors offers outdoor education experiences for kids in Bangalore. Nature trails, rock climbing, survival skills & more.',
  },
  programs: {
    title: 'Programs — LookFarOutdoors',
    description: 'Explore our age-appropriate outdoor programs for children in Bangalore.',
  },
  guides: {
    title: 'Our Guides — LookFarOutdoors',
    description: 'Meet the expert outdoor educators and guides behind every LookFarOutdoors adventure.',
  },
  about: {
    title: 'About Us — LookFarOutdoors',
    description: "Learn about LookFarOutdoors' mission to get Bangalore's kids outside and into nature.",
  },
  contact: {
    title: 'Contact Us — LookFarOutdoors',
    description: 'Book a program or get in touch with the LookFarOutdoors team in Bangalore.',
  },
  'little-explorers': {
    title: 'Outdoor Education Camp - 3D2N — LookFarOutdoors',
    description: 'Outdoor education camp with hands-on wilderness challenges for kids aged 7–12 in Kanakapura, guided at a 1:3 ratio.',
  },
  'junior-adventurers': {
    title: 'Junior Adventurers (Ages 8–10) — LookFarOutdoors',
    description: 'Full-day rock climbing, camping and survival skills for kids aged 8–10.',
  },
  'outdoor-leaders': {
    title: 'Outdoor Leaders (Ages 11–13) — LookFarOutdoors',
    description: 'Weekend trekking and leadership development programs for kids aged 11–13.',
  },
  'teen-expeditions': {
    title: 'Teen Expeditions (Ages 14–16) — LookFarOutdoors',
    description: 'Multi-day wilderness expeditions and first aid training for teenagers aged 14–16.',
  },
  privacy: {
    title: 'Privacy Policy — LookFarOutdoors',
    description: 'Privacy policy for LookFarOutdoors outdoor education programs in Bangalore.',
  },
  terms: {
    title: 'Terms of Service — LookFarOutdoors',
    description: 'Terms and conditions for LookFarOutdoors outdoor education programs in Bangalore.',
  },
}

if (SHOW_GUIDES_PAGE) {
  PAGE_META.guides = {
    title: 'Our Guides — LookFarOutdoors',
    description: 'Meet the expert outdoor educators and guides behind every LookFarOutdoors adventure.',
  }
}

function usePageMeta(page: string) {
  useEffect(() => {
    const meta = PAGE_META[page] ?? PAGE_META.home
    document.title = meta.title
    const el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (el) el.setAttribute('content', meta.description)
  }, [page])
}

// Scroll to top on every page mount
function useScrollToTop() {
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop()
  return <>{children}</>
}

// Minimal path helper — works with Vite dev server and SPA routing
function usePage() {
  const path = window.location.pathname
  if (path.includes('little-explorers'))   return 'little-explorers'
  if (path.includes('junior-adventurers')) return 'junior-adventurers'
  if (path.includes('programs'))           return 'programs'
  if (path.includes('guides') && SHOW_GUIDES_PAGE) return 'guides'
  if (path.includes('about'))              return 'about'
  if (path.includes('contact'))            return 'contact'
  if (path.includes('privacy'))            return 'privacy'
  if (path.includes('terms'))              return 'terms'
  // Any path that isn't root and didn't match above is a 404
  if (path !== '/')                        return '404'
  return 'home'
}

// Minimal dark spinner shown while lazy chunks load
function PageFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1f10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid rgba(255,255,255,0.1)',
        borderTop: '3px solid #d4880a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

function AppContent() {
  useSmoothScroll()
  const page = usePage()
  usePageMeta(page === '404' ? 'home' : page)
  const [splashDone, setSplashDone] = useState(false)
  const handleSplashDone = useCallback(() => setSplashDone(true), [])

  const renderPage = () => {
    switch (page) {
      case 'little-explorers':    return <PageWrapper><LittleExplorersPage /></PageWrapper>
      case 'junior-adventurers':  return <PageWrapper><JuniorAdventurersPage /></PageWrapper>
      case 'programs':            return <PageWrapper><ProgramsPage /></PageWrapper>
      case 'guides':              return <PageWrapper><GuidesPage /></PageWrapper>
      case 'about':               return <PageWrapper><AboutPage /></PageWrapper>
      case 'contact':             return <PageWrapper><ContactPage /></PageWrapper>
      case 'privacy':             return <PageWrapper><PrivacyPage /></PageWrapper>
      case 'terms':               return <PageWrapper><TermsPage /></PageWrapper>
      case '404':                 return <PageWrapper><NotFoundPage /></PageWrapper>
      default:
        return (
          <>
            <Hero />
            <Programs />
            <WhyUs />
            <Testimonials />
            <HowItWorks />
            <CTA />
          </>
        )
    }
  }

  return (
    <>
      <SplashLoader onDone={handleSplashDone} />
      <PageTransition />
      <ScrollProgress />
      <FilmGrain />
      <FallingLeaves />
      <Navbar />
      <main style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <Suspense fallback={<PageFallback />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomNav />
    </>
  )
}

export default function App() {
  return <AppContent />
}
