import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'
import './Footer.css'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Technologies', href: '#technologies' },
  { name: 'Newsroom', href: '#newsroom' },
]

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="Nexovique Technologies" className="footer-logo" />
            <p className="footer-tagline">
              Intelligent Solutions. Smarter Future.
            </p>
            <p className="footer-desc">
              Building our own AI products, applications, and technologies under the
              Nexovique brand.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="#" aria-label="GitHub"><FiGithub /></a>
              <a href="mailto:hello@nexovique.com" aria-label="Email"><FiMail /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href}>{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Our Focus</h4>
            <ul>
              <li><span>AI Development</span></li>
              <li><span>AI Automation</span></li>
              <li><span>Web Development</span></li>
              <li><span>Machine Learning</span></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="nexoviquetechnology@gmail.com">nexoviquetechnology@gmail.com</a></li>
              <li><span>Available Worldwide</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nexovique Technologies. All rights reserved.</p>
          <p className="footer-built">Built with <a href="https://github.com/Ahmad-abbasi-007" target="_blank" rel="noopener noreferrer">Abbasi</a></p>
        </div>
      </div>
    </footer>
  )
}