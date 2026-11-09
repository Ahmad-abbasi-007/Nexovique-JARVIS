// src/App.jsx

// src/App.jsx ke sabse upar
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter ki jagah HashRouter

import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Technologies from './components/Technologies'
import Innovation from './components/Innovation'
import Updates from './components/Updates'
import VisionMission from './components/VisionMission'
import Footer from './components/Footer'
import JarvisUI from './jarvis/JarvisUI' // JARVIS Import
import { initScrollReveal } from './utils/scrollReveal'
import './App.css'

// Website ka Home Page
function Home() {
  useEffect(() => {
    const cleanup = initScrollReveal()
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Innovation />
        <Updates />
        <VisionMission />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={<Home />} />
          
          {/* JARVIS Interface Route */}
          <Route path="/jarvis" element={<JarvisUI />} />
        </Routes>
      </div>
    </Router>
  )
}