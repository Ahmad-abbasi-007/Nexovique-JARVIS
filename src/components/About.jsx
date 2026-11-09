import { FiCode, FiZap, FiTarget } from 'react-icons/fi'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about reveal">
      <div className="container">
        <div className="section-tag">About Us</div>
        <h2 className="section-title">We build technology that defines the future</h2>
        <p className="section-subtitle">
          Nexovique Technologies is a product-first technology company. We do not offer client services. 
          Instead, our entire focus is on designing, developing, and launching our own AI-driven applications, 
          software, and platforms.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <FiCode className="about-icon" />
            <h3>Product-First Philosophy</h3>
            <p>We build, own, and scale our own technologies. Every product reflects our vision for a smarter future.</p>
          </div>
          <div className="about-card">
            <FiZap className="about-icon" />
            <h3>Cutting-Edge Innovation</h3>
            <p>We push the boundaries of artificial intelligence to solve complex, real-world problems.</p>
          </div>
          <div className="about-card">
            <FiTarget className="about-icon" />
            <h3>Global Impact</h3>
            <p>Our goal is to develop world-class AI products that can compete and lead on a global scale.</p>
          </div>
        </div>
      </div>
    </section>
  )
}