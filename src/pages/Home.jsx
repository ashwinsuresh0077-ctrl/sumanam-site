import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Clients from '../components/Clients'
import Stats from '../components/Stats'
import Services from '../components/Services'
import About from '../components/About'
import Work from '../components/Work'
import Projects from '../components/Projects'
import CTABand from '../components/CTABand'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  // Hash scrolling on arrival is handled globally by <SmoothScroll>.
  return (
    <div className="bg-bg min-h-screen">
      <Navbar />
      <Hero />
      <Clients />
      <Stats />
      <Services />
      <About />
      <Work />
      <Projects />
      <CTABand />
      <Contact />
      <Footer />
    </div>
  )
}
