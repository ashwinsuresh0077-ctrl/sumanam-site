import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-[#060d18] min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Projects />
      <Clients />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
