'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/content/site'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, y: 60 })

    // Animate on scroll
    createScrollTrigger(content, () => {
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  return (
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: '#D6B071' }}>
      <div className="container">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-navy">
              Our Mission
            </h2>
            <p className="text-2xl text-navy text-balance leading-relaxed">
              To become South Africa's leading technology powerhouse, delivering world-class solutions 
              that empower businesses to thrive in the digital age.
            </p>
          </div>

          <div className="space-y-12 text-lg text-navy leading-relaxed">
            <p>
              Founded in {siteConfig.company.founded}, BNK Tech emerged from a simple belief: exceptional technology should drive exceptional results. 
              In a rapidly evolving digital landscape, we saw businesses struggling with outdated systems, slow websites, 
              and fragmented IT infrastructure that hindered rather than helped their growth.
            </p>
            
            <p>
              We set out to change that narrative. By combining cutting-edge technology with deep business understanding, 
              we create solutions that don't just solve today's problems—they anticipate tomorrow's opportunities. 
              Every project we undertake is an opportunity to push boundaries and set new standards for what technology can achieve.
            </p>
            
            <p>
              Our vision extends beyond individual projects. We're building the foundation for South Africa's digital future, 
              one business at a time. Through innovation, precision, and unwavering commitment to excellence, 
              we're not just keeping pace with global technology trends—we're setting them.
            </p>
          </div>

          <div className="mt-16 bg-navy text-gold p-8 rounded-lg border border-navy">
            <blockquote className="text-2xl font-medium text-center mb-4">
              "We don't just build technology—we craft experiences that inspire, 
              platforms that scale, and systems that endure."
            </blockquote>
            <cite className="block text-center text-gold">
              — BNK Tech Leadership Team
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
