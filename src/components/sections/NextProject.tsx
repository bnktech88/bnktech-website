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
    <section className="py-24 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4 text-brand">Next Project</h2>
          <p className="text-muted">Explore another success story</p>
        </div>

        <div ref={sectionRef} className="max-w-4xl mx-auto">
          <Link 
            href={`/work/${project.slug}`}
            className="group block bg-bnk-neutral-50 rounded-lg overflow-hidden border hover:shadow-xl hover:shadow-brand/10 transition-all duration-500 hover:-translate-y-2"
            data-cursor="view"
          >
            {/* Project Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-surface to-surface-2 flex items-center justify-center">
              <div className="text-muted text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-border rounded-lg flex items-center justify-center">
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
                <span className="text-sm font-medium text-muted bg-surface px-3 py-1 rounded-full border">
                  {project.category}
                </span>
                <span className="text-sm text-subtle">{project.year}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-brand group-hover:text-accent-hover transition-colors">
                {project.title}
              </h3>

              <p className="text-muted mb-6 leading-relaxed">
                {project.summary}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs font-medium text-subtle bg-surface px-2 py-1 rounded border"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-medium text-subtle">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-sm font-medium text-brand group-hover:text-accent-hover transition-colors">
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
