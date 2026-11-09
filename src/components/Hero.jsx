import { FiArrowRight, FiCpu } from 'react-icons/fi'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" />
      <div className="container hero-inner">
        <div className="hero-tag">
          <FiCpu /> AI-Powered Innovation
        </div>
        <h1 className="hero-title">
          Intelligent Solutions.<br />
          <span className="gradient-text">Smarter Future.</span>
        </h1>
        <p className="hero-desc">
          Nexovique Technologies builds next-generation AI products, applications,
          and automation systems — engineered to shape the future of intelligence.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary">
            Explore Our Products <FiArrowRight />
          </a>
          <a href="#about" className="btn btn-secondary">
            Learn More
          </a>
        </div>
        <div className="hero-stats">
          <div><h3>AI</h3><p>Development</p></div>
          <div><h3>AI</h3><p>Automation</p></div>
          <div><h3>Web</h3><p>Development</p></div>
        </div>
      </div>
    </section>
  )
}