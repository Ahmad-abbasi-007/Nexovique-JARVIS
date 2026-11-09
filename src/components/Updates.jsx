import './Updates.css'

const updates = [
  { 
    date: 'Nov 2025', 
    title: 'JARVIS AI Assistant enters active development', 
    desc: 'Our flagship cross-platform AI personal assistant begins full-scale build, inspired by Iron Man.', 
    tag: 'Flagship News'
  },
  { 
    date: 'Oct 2025', 
    title: 'TAVRIN AI expands its automation suite', 
    desc: 'New intelligent workflows and integrations are being tested for our enterprise-grade platform.', 
    tag: 'Product Update'
  },
  { 
    date: 'Sep 2025', 
    title: 'Nexovique Technologies officially launched', 
    desc: 'Company founded with a product-first AI mission to build next-generation technologies.', 
    tag: 'Company News'
  },
]

export default function Updates() {
  return (
    <section id="newsroom" className="section updates reveal">
      <div className="container">
        <div className="section-tag">Newsroom</div>
        <h2 className="section-title">Latest from Nexovique</h2>
        <p className="section-subtitle">Announcements, product launches, and research milestones from our journey.</p>
        
        <div className="news-grid">
          {updates.map((u) => (
            <div key={u.title} className="news-card">
              <div className="news-top">
                <span className="news-date">{u.date}</span>
                <span className="news-tag">{u.tag}</span>
              </div>
              <h3>{u.title}</h3>
              <p>{u.desc}</p>
              <button className="news-readmore">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}