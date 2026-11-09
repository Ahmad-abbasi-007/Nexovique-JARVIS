import { FiCpu, FiZap, FiGlobe, FiSettings } from 'react-icons/fi'
import './Technologies.css'

const techs = [
  { icon: <FiCpu />, name: 'Artificial Intelligence', desc: 'Deep learning, neural networks, and intelligent systems.' },
  { icon: <FiZap />, name: 'Machine Learning', desc: 'Predictive models and data-driven intelligence.' },
  { icon: <FiGlobe />, name: 'Web Development', desc: 'Modern, fast, scalable web applications.' },
  { icon: <FiSettings />, name: 'Automation', desc: 'Smart workflow automation and AI integrations.' },
]

export default function Technologies() {
  return (
    <section id="technologies" className="section technologies">
      <div className="container">
        <div className="section-tag">Technologies</div>
        <h2 className="section-title">The tech stack powering our vision</h2>
        <p className="section-subtitle">
          We leverage modern AI and engineering tools to build world-class products.
        </p>
        <div className="tech-grid">
          {techs.map((t) => (
            <div key={t.name} className="tech-card">
              <div className="tech-icon">{t.icon}</div>
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}