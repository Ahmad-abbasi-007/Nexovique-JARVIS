import { FiEye, FiFlag } from 'react-icons/fi'
import './VisionMission.css'

export default function VisionMission() {
  return (
    <section className="section vision">
      <div className="container">
        <div className="section-tag">Vision & Mission</div>
        <h2 className="section-title">What drives us forward</h2>
        <div className="vm-grid">
          <div className="vm-card">
            <FiEye className="vm-icon" />
            <h3>Our Vision</h3>
            <p>
              To become a globally recognized AI company known for creating intelligent
              technologies that empower and elevate human potential.
            </p>
          </div>
          <div className="vm-card">
            <FiFlag className="vm-icon" />
            <h3>Our Mission</h3>
            <p>
              To build, launch, and scale powerful AI-driven products that solve real-world
              problems and shape a smarter future.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}