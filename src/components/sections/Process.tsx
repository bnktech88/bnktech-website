'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'
import BnkSection from '@/components/layout/BnkSection'
import BnkCard from '@/components/ui/BnkCard'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, technical requirements, and growth objectives to create a comprehensive project roadmap.',
    details: [
      'Stakeholder interviews',
      'Technical audit',
      'Competitive analysis',
      'Strategic planning'
    ]
  },
  {
    step: '02',
    title: 'Design & Architecture',
    description: 'Our team crafts user-centered designs and scalable technical architectures that align with your brand and business needs.',
    details: [
      'UI/UX design',
      'System architecture',
      'Technology selection',
      'Performance planning'
    ]
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'We build your solution using industry best practices, with continuous testing and quality assurance throughout the process.',
    details: [
      'Agile development',
      'Quality assurance',
      'Security testing',
      'Performance optimization'
    ]
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'We ensure a smooth launch and provide ongoing support to help your business grow and adapt to changing needs.',
    details: [
      'Deployment strategy',
      'Launch support',
      'Performance monitoring',
      'Ongoing maintenance'
    ]
  }
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const steps = stepsRef.current

    if (!section || steps.length === 0) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(steps, { opacity: 1, x: 0 })
      return
    }

    // Initial state
    gsap.set(steps, { opacity: 0, x: 60 })

    // Animate steps on scroll
    steps.forEach((step, index) => {
      createScrollTrigger(step, () => {
        gsap.to(step, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power2.out'
        })
      })
    })

  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el)
    }
  }

  return (
    <BnkSection
      ref={sectionRef}
      variant="cream"
      diagonal="both"
      depth="raised"
      topAccent={true}
      bottomAccent={true}
      padding="loose"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-bnk-navy">
            Our Process
          </h2>
          <p className="text-xl text-bnk-silver max-w-3xl mx-auto">
            A proven methodology that ensures every project delivers exceptional results 
            and drives meaningful business growth.
          </p>
        </div>

        <div className="space-y-16">
          {processSteps.map((processStep, index) => (
            <div
              key={processStep.step}
              ref={addToRefs}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <span className="text-5xl font-display font-bold text-bnk-bronze-light mr-4">
                    {processStep.step}
                  </span>
                  <h3 className="text-3xl font-display font-semibold text-bnk-navy">
                    {processStep.title}
                  </h3>
                </div>
                
                <p className="text-lg text-bnk-silver mb-8 leading-relaxed">
                  {processStep.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {processStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-bnk-gold rounded-full mr-3" />
                      <span className="text-bnk-ink-light">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Element - Business Card Inspired */}
              <div className="flex-1 max-w-md">
                <div className="aspect-square bg-gradient-to-br from-bnk-cream-light to-bnk-cream rounded-2xl flex items-center justify-center border border-bnk-bronze-light shadow-lg shadow-bnk-bronze/10">
                  <div className="w-24 h-24 bg-bnk-gold rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg shadow-bnk-bronze/20">
                    <span className="text-bnk-navy font-display font-bold text-2xl transform -rotate-12">
                      {processStep.step}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BnkSection>
  )
}
