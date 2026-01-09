'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/content/projects'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function WorkGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const grid = gridRef.current
    const cards = cardsRef.current

    if (!grid || cards.length === 0) return

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
          delay: (index % 3) * 0.1,
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

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              ref={addToRefs}
              className="group cursor-pointer"
              data-cursor="view"
            >
              <Link href={`/work/${project.slug}`}>
                <div className="bg-neutral-50 rounded-lg overflow-hidden border border-neutral-300 hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-500 group-hover:-translate-y-2">
                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                    <div className="text-primary-500 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary-300 rounded-lg flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M9 9h6v6H9z" fill="currentColor"/>
                        </svg>
                      </div>
                      <p className="text-sm font-medium">{project.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-accent-700 bg-accent-100 px-3 py-1 rounded-full border border-accent-200">
                        {project.category}
                      </span>
                      <span className="text-sm text-primary-500">{project.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold mb-3 text-primary-900 group-hover:text-accent-700 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-primary-600 mb-6 line-clamp-3">
                      {project.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs font-medium text-primary-600 bg-neutral-100 px-2 py-1 rounded border border-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs font-medium text-primary-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-500">{project.client}</span>
                      <div className="flex items-center text-sm font-medium text-primary-900 group-hover:text-accent-600 transition-colors">
                        View Project
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <p className="text-primary-600 mb-6">
            Showing {projects.length} projects. Have a specific project in mind?
          </p>
          <Link href="/contact" className="btn btn-primary magnetic">
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  )
}
