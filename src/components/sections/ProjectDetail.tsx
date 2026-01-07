'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '@/content/projects'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const sections = sectionsRef.current

    if (sections.length === 0) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(sections, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(sections, { opacity: 0, y: 60 })

    // Animate sections on scroll
    sections.forEach((section, index) => {
      createScrollTrigger(section, () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out'
        })
      })
    })

  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="py-24 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Challenge */}
          <div ref={addToRefs}>
            <h2 className="text-3xl font-display font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-grey-700 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div ref={addToRefs}>
            <h2 className="text-3xl font-display font-bold mb-6">Our Solution</h2>
            <p className="text-lg text-grey-700 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Technologies */}
          <div ref={addToRefs}>
            <h2 className="text-3xl font-display font-bold mb-6">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.technologies.map((tech) => (
                <div 
                  key={tech}
                  className="bg-grey-50 p-4 rounded-lg text-center hover:bg-grey-100 transition-colors"
                >
                  <span className="font-medium text-grey-800">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div ref={addToRefs}>
            <h2 className="text-3xl font-display font-bold mb-6">Results & Impact</h2>
            <p className="text-lg text-grey-700 leading-relaxed mb-8">
              {project.results}
            </p>

            {/* Key Metrics */}
            <div className="bg-grey-50 p-8 rounded-lg">
              <h3 className="text-xl font-display font-semibold mb-6 text-center">
                Project Highlights
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-display font-bold text-black mb-2">
                    {project.category === 'Website Build' ? '< 2s' : '99.9%'}
                  </div>
                  <div className="text-grey-600">
                    {project.category === 'Website Build' ? 'Load Time' : 'Uptime'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-black mb-2">
                    {project.year}
                  </div>
                  <div className="text-grey-600">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-black mb-2">
                    100%
                  </div>
                  <div className="text-grey-600">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Testimonial Placeholder */}
          <div ref={addToRefs}>
            <div className="bg-black text-white p-8 rounded-lg">
              <blockquote className="text-xl font-medium mb-4">
                "BNK Tech delivered exactly what we needed - a solution that not only met our requirements 
                but exceeded our expectations. Their expertise and attention to detail made all the difference."
              </blockquote>
              <cite className="text-grey-300">
                — {project.client} Team
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
