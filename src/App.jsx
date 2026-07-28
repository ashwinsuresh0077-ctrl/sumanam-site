import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Technology from './components/Technology'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Projects />
      <Technology />
      <Process />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
