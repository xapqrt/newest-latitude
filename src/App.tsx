import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import JsonLd from './components/JsonLd'
import { organizationSchema, programSchema } from './data/schema'
import { getVisiblePrograms } from './data/programs'

// Lazy-load page components
const ProgramsPage          = lazy(() => import('./components/ProgramsPage'))
const GuidesPage            = lazy(() => import('./components/GuidesPage'))
const AboutPage             = lazy(() => import('./components/AboutPage'))
const ContactPage           = lazy(() => import('./components/ContactPage'))
const LittleExplorersPage   = lazy(() => import('./components/LittleExplorersPage'))
const JuniorAdventurersPage = lazy(() => import('./components/JuniorAdventurersPage'))
const NotFoundPage          = lazy(() => import('./components/NotFoundPage'))
const PrivacyPage           = lazy(() => import('./components/PrivacyPage'))
const TermsPage             = lazy(() => import('./components/TermsPage'))

// Per-page meta
const PAGE_META: Record<string, { title: string; description: string; ogImage?: string }> = {
  home: {
    title: 'LookfarOutdoors — Kids Outdoor Adventures in Bangalore',
    description: 'LookfarOutdoors offers outdoor education experiences for kids in Bangalore. Nature trails, rock climbing, survival skills & more.',
  },
  programs: {
    title: 'Programs — LookfarOutdoors',
    description: 'Explore our age-appropriate outdoor programs for children in Bangalore.',
  },
  about: {
    title: 'About Us — LookfarOutdoors',
    description: "Learn about LookfarOutdoors' mission to get Bangalore's kids outside and into nature.",
  },
  contact: {
    title: 'Contact Us — LookfarOutdoors',
    description: 'Book a program or get in touch with the LookfarOutdoors team in Bangalore.',
  },
  'little-explorers': {
    title: 'Outdoor Education Camp - 3D2N — LookfarOutdoors',
    description: 'Outdoor education camp with hands-on wilderness challenges for kids aged 7–12 in Kanakapura, guided at a 1:3 ratio.',
  },
  'junior-adventurers': {
    title: 'Outdoor Education Camp - 5D4N — LookfarOutdoors',
    description: 'Outdoor education camp with hands-on wilderness challenges for kids aged 7–12 in Kanakapura, guided at a 1:3 ratio.',
  },
  privacy: {
    title: 'Privacy Policy — LookfarOutdoors',
    description: 'Privacy policy for LookfarOutdoors outdoor education programs in Bangalore.',
  },
  terms: {
    title: 'Terms of Service — LookfarOutdoors',
    description: 'Terms and conditions for LookfarOutdoors outdoor education programs in Bangalore.',
  },
}

function getPageKey(pathname: string): string {
  if (pathname === '/') return 'home'
  const key = pathname.replace(/^\//, '').split('/')[0]
  return PAGE_META[key] ? key : '404'
}

function usePageMeta(pageKey: string) {
  useEffect(() => {
    const meta = PAGE_META[pageKey] ?? PAGE_META.home
    document.title = meta.title
    const el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (el) el.setAttribute('content', meta.description)
  }, [pageKey])
}

function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  useScrollToTop()
  return <>{children}</>
}

// Dark spinner while lazy chunks load
function PageFallback() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a1f10',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid rgba(255,255,255,0.1)',
        borderTop: '3px solid #d4880a',
        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

function HomePage() {
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

function AppContent() {
  useSmoothScroll()
  const { pathname } = useLocation()
  const pageKey = getPageKey(pathname)
  usePageMeta(pageKey === '404' ? 'home' : pageKey)
  const [splashDone, setSplashDone] = useState(false)
  const handleSplashDone = useCallback(() => setSplashDone(true), [])

  const orgSchema = organizationSchema()
  const programSchemas = getVisiblePrograms().map(programSchema)

  return (
    <>
      <JsonLd schema={orgSchema} />
      {programSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <SplashLoader onDone={handleSplashDone} />
      <PageTransition />
      <ScrollProgress />
      <FilmGrain />
      <FallingLeaves />
      <Navbar />
      <main style={{ visibility: splashDone ? 'visible' : 'hidden' }}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<PageWrapper><ProgramsPage /></PageWrapper>} />
            <Route path="/guides" element={<PageWrapper><GuidesPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/little-explorers" element={<PageWrapper><LittleExplorersPage /></PageWrapper>} />
            <Route path="/junior-adventurers" element={<PageWrapper><JuniorAdventurersPage /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><TermsPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
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