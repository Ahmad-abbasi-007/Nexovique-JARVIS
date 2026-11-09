import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom' // Import Link
import './Projects.css'

const projects = [
  {
    name: 'JARVIS AI Assistant',
    tag: 'Flagship Product',
    desc: 'An advanced, cross-platform AI personal assistant inspired by Iron Man. Features voice control, multi-language support, and system automation.',
    status: 'In Development',
    highlight: true,
    link: '/jarvis', // Ye link add kiya
  },
  {
    name: 'TAVRIN AI',
    tag: 'AI Platform',
    desc: 'An advanced AI assistant platform designed for intelligent automation and smart decision-making.',
    status: 'Active Development',
    link: '#',
  },
  {
    name: 'Project Nova',
    tag: 'Coming Soon',
    desc: 'A next-gen machine learning engine focused on predictive analytics and real-time intelligence.',
    status: 'Planned',
    link: '#',
  },
  {
    name: 'Project Pulse',
    tag: 'Coming Soon',
    desc: 'An AI-powered automation suite for modern digital workflows and smart integrations.',
    status: 'Planned',
    link: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section projects reveal">
      <div className="container">
        <div className="section-tag">Our Projects</div>
        <h2 className="section-title">AI products we're building</h2>
        <p className="section-subtitle">
          Every project below is our own innovation — designed, developed, and launched by Nexovique Technologies.
        </p>
        <div className="projects-grid">
          {projects.map((p) => (
            <Link to={p.link} key={p.name} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={`project-card ${p.highlight ? 'highlight' : ''}`}>
                <div className="project-head">
                  <span className="project-tag">{p.tag}</span>
                  <FiArrowUpRight className="project-arrow" />
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="project-status">
                  <span className="dot" /> {p.status}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}