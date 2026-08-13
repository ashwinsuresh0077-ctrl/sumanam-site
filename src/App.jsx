import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SmoothScroll from './components/SmoothScroll'

// Home stays in the main bundle so the landing page paints without a second
// round trip. The detail routes — and the ~600-project dataset they pull in —
// are split out so a first-time visitor never downloads them up front.
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const FeaturedProjects = lazy(() => import('./pages/FeaturedProjects'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Matches the page background so a route swap reads as a beat, not a flash.
function RouteFallback() {
  return <div className="bg-bg min-h-screen" />
}

function App() {
  return (
    <>
      <SmoothScroll />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/projects" element={<FeaturedProjects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          {/* Catch-all — without it an unmatched URL renders nothing at all. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
