import { FiActivity, FiAperture, FiLayers } from 'react-icons/fi'
import './Innovation.css'

const items = [
  { icon: <FiActivity />, title: 'AI Research Lab', desc: 'Exploring next-generation neural architectures and intelligent systems.' },
  { icon: <FiAperture />, title: 'Experimental Prototypes', desc: 'Rapidly testing bold ideas that could redefine AI interaction.' },
  { icon: <FiLayers />, title: 'Future Technologies', desc: 'Upcoming innovations in automation, vision, and generative AI.' },
]

export default function Innovation() {
  return (
    <section className="section innovation">
      <div className="container">
        <div className="section-tag">Innovation & Research</div>
        <h2 className="section-title">Ideas becoming intelligence</h2>
        <p className="section-subtitle">
          Our research team continuously experiments with ideas that will power tomorrow's products.
        </p>
        <div className="innov-grid">
          {items.map((i) => (
            <div key={i.title} className="innov-card">
              <div className="innov-icon">{i.icon}</div>
              <h3>{i.title}</h3>
              <p>{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}