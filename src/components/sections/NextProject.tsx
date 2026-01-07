'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '@/content/projects'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface NextProjectProps {
  project: Project
}

export default function NextProject({ project }: NextProjectProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(section, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(section, { opacity: 0, y: 60 })

    // Animate on scroll
    createScrollTrigger(section, () => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  return (
    <section className="py-24 bg-grey-100">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Next Project</h2>
          <p className="text-grey-700">Explore another success story</p>
        </div>

        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <Link 
            href={`/work/${project.slug}`}
            className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            data-cursor="view"
          >
            {/* Project Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-grey-200 to-grey-300 flex items-center justify-center">
              <div className="text-grey-600 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-grey-400 rounded-lg flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9h6v6H9z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg font-medium">{project.category}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-grey-600 bg-grey-100 px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-sm text-grey-500">{project.year}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-grey-800 transition-colors">
                {project.title}
              </h3>

              <p className="text-grey-700 mb-6 leading-relaxed">
                {project.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs font-medium text-grey-600 bg-grey-100 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-medium text-grey-600">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm font-medium text-black group-hover:text-grey-700 transition-colors">
                  View Project
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Back to Work */}
        <div className="text-center mt-12">
          <Link href="/work" className="btn btn-outline magnetic">
            ← Back to All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
