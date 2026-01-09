'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { siteConfig } from '@/content/site'

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, y: 60 })

    // Animation
    gsap.to(content, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    })

  }, [])

  return (
    <section ref={containerRef} className="py-24" style={{ backgroundColor: '#B8965E' }}>
      <div className="container">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-balance text-navy">
            Building the Future of Technology
          </h1>
          
          <p className="text-xl md:text-2xl text-navy mb-12 text-balance leading-relaxed">
            BNK Tech is more than a technology company—we're architects of digital transformation, 
            partnering with businesses to turn ambitious visions into reality.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-navy mb-2">{siteConfig.company.founded}</div>
              <div className="text-navy">Founded</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-navy mb-2">50+</div>
              <div className="text-navy">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-navy mb-2">99.9%</div>
              <div className="text-navy">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-navy mb-2">24/7</div>
              <div className="text-navy">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
