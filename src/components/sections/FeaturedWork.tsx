'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/content/projects'
import { createScrollTrigger } from '@/lib/motion'
import BnkSection from '@/components/layout/BnkSection'
import BnkCard from '@/components/ui/BnkCard'
import BnkButton from '@/components/ui/BnkButton'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || cards.length === 0) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(cards, { opacity: 0, y: 60 })

    // Animate cards on scroll
    cards.forEach((card, index) => {
      createScrollTrigger(card, () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out'
        })
      })
    })

  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const featuredProjects = projects.slice(0, 3)

  return (
    <BnkSection
      ref={sectionRef}
      variant="white"
      diagonal="right"
      depth="flat"
      topAccent={true}
      padding="loose"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-bnk-navy">
            Featured Work
          </h2>
          <p className="text-xl text-bnk-silver max-w-3xl mx-auto">
            Explore our recent website projects and see how we've helped businesses 
            transform their digital presence with high-performance web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <BnkCard
              key={project.slug}
              ref={addToRefs}
              variant="floating"
              headerAccent={true}
              padding="normal"
              className="group cursor-pointer"
              onClick={() => window.location.href = `/work/${project.slug}`}
            >
              <Link href={`/work/${project.slug}`}>
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-bnk-cream to-bnk-cream-light flex items-center justify-center mb-6 rounded-lg overflow-hidden">
                  <div className="text-bnk-silver text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-bnk-bronze-light/30 rounded-lg flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M9 9h6v6H9z" fill="currentColor"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium">{project.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-bnk-bronze bg-bnk-gold-light/20 px-3 py-1 rounded-full border border-bnk-bronze-light">
                    {project.category}
                  </span>
                  <span className="text-sm text-bnk-silver-light">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-display font-semibold mb-3 text-bnk-navy group-hover:text-bnk-gold transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-bnk-silver mb-4 line-clamp-3">
                  {project.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs font-medium text-bnk-ink-light bg-bnk-cream-light px-2 py-1 rounded border border-bnk-bronze-light"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-medium text-bnk-silver-light">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-sm font-medium text-bnk-navy group-hover:text-bnk-bronze transition-colors">
                  View Project
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </BnkCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <BnkButton variant="primary" size="lg" magnetic={true}>
            <Link href="/work">View All Projects</Link>
          </BnkButton>
        </div>
      </div>
    </BnkSection>
  )
}
