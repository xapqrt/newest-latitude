import { useState, useCallback } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Programs from './components/Programs'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import HowItWorks from './components/HowItWorks'
import CTA from './components/CTA'
import Footer from './components/Footer'
import FilmGrain from './components/FilmGrain'
import ProgramsPage from './components/ProgramsPage'
import GuidesPage from './components/GuidesPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import LittleExplorersPage from './components/LittleExplorersPage'
import JuniorAdventurersPage from './components/JuniorAdventurersPage'
import OutdoorLeadersPage from './components/OutdoorLeadersPage'
import TeenExpeditionsPage from './components/TeenExpeditionsPage'

// Minimal path helper — works with Vite dev server and hash routing
function usePage() {
  const path = window.location.pathname
  if (path.includes('little-explorers')) return 'little-explorers'
  if (path.includes('junior-adventurers')) return 'junior-adventurers'
  if (path.includes('outdoor-leaders')) return 'outdoor-leaders'
  if (path.includes('teen-expeditions')) return 'teen-expeditions'
  if (path.includes('programs')) return 'programs'
  if (path.includes('guides')) return 'guides'
  if (path.includes('about')) return 'about'
  if (path.includes('contact')) return 'contact'
  return 'home'
}

function AppContent() {
  useSmoothScroll()
  const page = usePage()

  return (
    <>
      <FilmGrain />
      <Navbar />
      <main>
        {page === 'little-explorers' ? (
          <LittleExplorersPage />
        ) : page === 'junior-adventurers' ? (
          <JuniorAdventurersPage />
        ) : page === 'outdoor-leaders' ? (
          <OutdoorLeadersPage />
        ) : page === 'teen-expeditions' ? (
          <TeenExpeditionsPage />
        ) : page === 'programs' ? (
          <ProgramsPage />
        ) : page === 'guides' ? (
          <GuidesPage />
        ) : page === 'about' ? (
          <AboutPage />
        ) : page === 'contact' ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <div className="stats-bar-wrap">
              <StatsBar />
            </div>
            <Programs />
            <WhyUs />
            <Testimonials />
            <HowItWorks />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderDone = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderDone} />}
      {loaded && <AppContent />}
    </>
  )
}
