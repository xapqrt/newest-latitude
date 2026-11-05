import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Scene from './components/Scene'
import trail from './assets/bg/trail.webp'
import hills from './assets/bg/hills.webp'
import boulders from './assets/bg/boulders.webp'
import night from './assets/bg/night.webp'
import lake from './assets/bg/lake.webp'
import DayAtCamp from './components/DayAtCamp'
import FallingLeaves from './components/FallingLeaves'
import { useScrollEffects } from './hooks/useScrollEffects'
import Reviews from './components/Reviews'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollProgress from './components/ScrollProgress'
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
const ProgramDetailPage     = lazy(() => import('./components/ProgramDetailPage'))
const NotFoundPage          = lazy(() => import('./components/NotFoundPage'))
const PrivacyPage           = lazy(() => import('./components/PrivacyPage'))
const TermsPage             = lazy(() => import('./components/TermsPage'))

// Per-page meta
const PAGE_META: Record<string, { title: string; description: string; ogImage?: string }> = {
  home: {
    title: 'Lookfar Outdoors: Outdoor Camps for Kids & Families near Bangalore',
    description: 'Outdoor education camps for kids aged 7–12 and family camps for all ages near Bangalore. Treks, rappelling, campfires, stargazing and more.',
  },
  programs: {
    title: 'Programs — LookfarOutdoors',
    description: 'Compare our outdoor education camps for kids and our family camps near Bangalore: itineraries, activities and pricing.',
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
  'family-camp-2d1n': {
    title: 'Family Camp - 2 Days, 1 Night — LookfarOutdoors',
    description: 'A 2-day, 1-night outdoor camp for families near Bangalore. Jungle trek, campfire, stargazing, pottery and tree planting, with all meals, camping gear and travel included.',
  },
  'family-day-trip': {
    title: 'Family Camp - 1 Day — LookfarOutdoors',
    description: 'A one-day family outdoor trip near Bangalore. Farm tour, lakeside birdwatching, coracle ride and an afternoon trek, with transport and four vegetarian meals included.',
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
      minHeight: '100vh', background: '#f8f4ea',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid #cfe0d6',
        borderTop: '3px solid #2f7a5c',
        borderRadius: '50%', animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

function HomePage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollEffects(ref)
  return (
    <div ref={ref}>
      <Hero />
      <Scene images={[hills, trail]} tone="pine">
        <Programs />
      </Scene>
      <Scene images={[boulders, night]} tone="night">
        <DayAtCamp />
        <WhyUs />
      </Scene>
      <Scene images={[lake]} tone="dusk">
        <Reviews />
        <CTA />
      </Scene>
    </div>
  )
}

function AppContent() {
  useSmoothScroll()
  const { pathname } = useLocation()
  const pageKey = getPageKey(pathname)
  usePageMeta(pageKey === '404' ? 'home' : pageKey)

  const orgSchema = organizationSchema()
  const programSchemas = getVisiblePrograms().map(programSchema)

  return (
    <>
      <JsonLd schema={orgSchema} />
      {programSchemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <PageTransition />
      <ScrollProgress />
      <FallingLeaves />
      <Navbar />
      <main>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/programs" element={<PageWrapper><ProgramsPage /></PageWrapper>} />
            <Route path="/guides" element={<PageWrapper><GuidesPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/little-explorers" element={<PageWrapper><ProgramDetailPage programId="little-explorers" /></PageWrapper>} />
            <Route path="/junior-adventurers" element={<PageWrapper><ProgramDetailPage programId="junior-adventurers" /></PageWrapper>} />
            <Route path="/family-camp-2d1n" element={<PageWrapper><ProgramDetailPage programId="family-camp-2d1n" /></PageWrapper>} />
            <Route path="/family-day-trip" element={<PageWrapper><ProgramDetailPage programId="family-day-trip" /></PageWrapper>} />
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