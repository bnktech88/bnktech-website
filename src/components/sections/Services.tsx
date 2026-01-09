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
    <section ref={sectionRef} className="py-24 bg-bnk-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-brand">
            Our Services
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your business growth 
            and digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              ref={addToRefs}
              className="bg-surface p-8 rounded-lg border hover:shadow-lg hover:shadow-brand/10 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-display font-semibold mb-4 text-brand group-hover:text-accent-hover transition-colors">
                {service.title}
              </h3>
              <p className="text-muted mb-6">
                {service.description}
              </p>
              <div className="space-y-2 mb-8">
                {service.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-subtle">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                {service.status === 'coming-soon' ? (
                  <div className="flex items-center">
                    <div className="inline-flex items-center px-3 py-1 bg-surface-2 border rounded-full">
                      <span className="text-xs font-medium text-muted">Coming Soon</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-subtle">Starting from</p>
                    <p className="text-xl font-display font-bold text-accent">{service.pricing.starting}</p>
                    <p className="text-xs text-subtle">{service.pricing.model}</p>
                    {service.pricing.maintenance && (
                      <div className="mt-1">
                        <p className="text-sm font-semibold text-muted">Monthly Maintenance from {service.pricing.maintenance}</p>
                        <p className="text-xs text-subtle">{service.pricing.maintenanceModel}</p>
                      </div>
                    )}
                  </div>
                )}
                <Link 
                  href={`/services#${service.id}`}
                  className="text-sm font-medium text-brand hover:text-accent-hover transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn btn-primary magnetic">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
