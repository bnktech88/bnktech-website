'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/content/services'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
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
          delay: index * 0.1,
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
    <section
      ref={sectionRef}
      className="bg-bnk-gold py-24"
    >
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-navy">
            Our Services
          </h2>
          <p className="text-xl text-navy max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth 
            and digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              ref={addToRefs}
              className="bg-cream p-8 rounded-lg border-2 border-bnk-bronze hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-navy group-hover:text-bnk-bronze transition-colors">
                {service.title}
              </h3>
              <p className="text-navy mb-6">
                {service.description}
              </p>
              <div className="space-y-2 mb-8">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-navy">
                    <div className="w-2 h-2 bg-bnk-bronze rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {service.status === 'coming-soon' ? (
                  <div className="flex items-center">
                    <div className="inline-flex items-center px-3 py-1 bg-bnk-silver border border-bnk-bronze rounded-full">
                      <span className="text-xs font-medium text-navy">Coming Soon</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-navy">Starting from</p>
                    <p className="text-xl font-display font-bold text-bnk-bronze">{service.pricing.starting}</p>
                    <p className="text-xs text-navy">{service.pricing.model}</p>
                    {service.pricing.maintenance && (
                      <div className="mt-1">
                        <p className="text-sm font-semibold text-navy">Monthly Maintenance from {service.pricing.maintenance}</p>
                        <p className="text-xs text-navy">{service.pricing.maintenanceModel}</p>
                      </div>
                    )}
                  </div>
                )}
                <Link 
                  href={`/services#${service.id}`}
                  className="text-sm font-medium text-navy hover:text-bnk-bronze transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary px-8 py-4 rounded-lg font-medium transition-all duration-200">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
