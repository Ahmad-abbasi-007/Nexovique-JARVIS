// src/utils/scrollReveal.js

/**
 * Scroll Reveal + Active Nav Highlight
 * - .reveal elements ko viewport me aate hi "active" class deta hai
 * - Navbar me active section ko highlight karta hai
 */

export function initScrollReveal() {
  // 1. Reveal Animation Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  )

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el)
  })

  // 2. Active Nav Section Highlighter
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-links a')

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            navLinks.forEach((link) => {
              link.classList.remove('active')
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active')
              }
            })
          }
        })
      },
      {
        threshold: 0.4,
        rootMargin: '-80px 0px -40% 0px',
      }
    )

    sections.forEach((section) => navObserver.observe(section))
  }

  // 3. Cleanup function (optional, for React StrictMode)
  return () => {
    revealObserver.disconnect()
  }
}