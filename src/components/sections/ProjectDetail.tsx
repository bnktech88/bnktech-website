'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Check, ExternalLink, Target, Zap, BarChart3 } from 'lucide-react'
import Link from 'next/link'
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
          delay: index * 0.1,
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
    <>
      {/* Context Section */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-navy">Context</h2>
            <p className="text-xl text-navy mb-8 leading-relaxed">
              {project.context.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-navy flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Constraints
                </h3>
                <ul className="space-y-2">
                  {project.context.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-bnk-bronze rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-navy/80">{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-navy flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Goals
                </h3>
                <ul className="space-y-2">
                  {project.context.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-navy/80">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-bnk-gold">Problem</h2>
            <p className="text-xl text-bnk-gold/80 mb-12 leading-relaxed">
              {project.problem.description}
            </p>
            
            <div className="bg-bnk-gold/5 rounded-xl p-8 border border-bnk-gold/20">
              <h3 className="text-2xl font-semibold mb-8 text-bnk-gold text-center">Before Metrics</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {project.problem.beforeMetrics.map((metric, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-2xl font-bold text-red-700 mb-2">{metric.value}</div>
                    <div className="text-navy font-medium mb-1">{metric.label}</div>
                    {metric.context && (
                      <div className="text-sm text-gray-600">{metric.context}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-navy">Approach</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-navy">Architecture Overview</h3>
              <p className="text-gray-700 leading-relaxed">{project.approach.architecture}</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-navy">Key Technical Decisions</h3>
              <div className="space-y-4">
                {project.approach.keyDecisions.map((decision, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-bnk-navy text-bnk-gold rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 leading-relaxed">{decision}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-bnk-gold">Solution</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-bnk-gold/10 rounded-xl p-8 border border-bnk-gold/20">
                <h3 className="text-2xl font-semibold mb-6 text-bnk-gold">Feature Highlights</h3>
                <ul className="space-y-4">
                  {project.solution.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-bnk-bronze mt-1 mr-3 flex-shrink-0" />
                      <span className="text-bnk-gold/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-bnk-gold/10 rounded-xl p-8 border border-bnk-gold/20">
                <h3 className="text-2xl font-semibold mb-6 text-bnk-gold">Key Features</h3>
                <ul className="space-y-4">
                  {project.solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-bnk-bronze rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-bnk-gold/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-8 text-navy text-center">Results</h2>
            <p className="text-xl text-navy/80 mb-12 text-center max-w-3xl mx-auto">
              {project.results.summary}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {project.results.metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <h3 className="text-lg font-semibold mb-4 text-navy">{metric.label}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm text-gray-500">Before: <span className="text-red-600 font-medium">{metric.before}</span></div>
                    <div className="text-sm text-gray-500">After: <span className="text-green-600 font-medium">{metric.after}</span></div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-bold">
                    {metric.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-8 text-bnk-gold">Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech) => (
                <div 
                  key={tech}
                  className="bg-bnk-gold/10 px-6 py-3 rounded-full border border-bnk-gold/20 hover:border-bnk-gold/40 transition-all duration-200"
                >
                  <span className="font-medium text-bnk-gold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial or Results Statement */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto">
            {project.testimonial ? (
              <div className="bg-bnk-navy text-bnk-gold p-12 rounded-xl text-center">
                <blockquote className="text-2xl font-medium mb-6 italic">
                  "{project.testimonial.quote}"
                </blockquote>
                <cite className="text-bnk-bronze font-semibold">
                  — {project.testimonial.author}, {project.testimonial.role}
                </cite>
              </div>
            ) : (
              <div className="bg-bnk-navy text-bnk-gold p-12 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-4">Outcome Summary</h3>
                <p className="text-xl leading-relaxed">
                  This {project.industry.toLowerCase()} project demonstrates our ability to deliver 
                  measurable performance improvements and business value through engineering excellence. 
                  The {project.heroResult.toLowerCase()} showcases the impact of our 
                  performance-first development approach.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div ref={addToRefs} className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Ready for Similar Results?
            </h2>
            <p className="text-xl text-bnk-gold/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can deliver measurable improvements for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-bronze text-white px-8 py-4 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200 inline-flex items-center justify-center"
              >
                Book a 30-min Call <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                href="/work"
                className="border border-bnk-gold text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-gold hover:text-bnk-navy transition-all duration-200"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
