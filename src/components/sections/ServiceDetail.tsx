'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Service } from '@/content/services'
import { createScrollTrigger } from '@/lib/motion'
import ServiceGallery from '@/components/gallery/ServiceGallery'

gsap.registerPlugin(ScrollTrigger)

interface ServiceDetailProps {
  service: Service
  index: number
}

export default function ServiceDetail({ service, index }: ServiceDetailProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, x: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, x: index % 2 === 0 ? -60 : 60 })

    // Animate on scroll
    createScrollTrigger(content, () => {
      gsap.to(content, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [index])

  const isEven = index % 2 === 0

  return (
    <div 
      id={service.id}
      ref={sectionRef} 
      className={`flex flex-col lg:flex-row items-center gap-12 ${
        isEven ? '' : 'lg:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div ref={contentRef} className="flex-1">
        <h2 className="text-4xl font-display font-bold mb-6 text-primary-900">
          {service.title}
        </h2>
        
        <p className="text-lg text-primary-600 mb-8 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-xl font-display font-semibold mb-4 text-primary-800">What's Included:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <div className="w-2 h-2 bg-accent-600 rounded-full mt-3 mr-3 flex-shrink-0" />
                <span className="text-primary-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-8">
          <h3 className="text-xl font-display font-semibold mb-4 text-primary-800">Our Process:</h3>
          <div className="flex flex-wrap gap-3">
            {service.process.map((step, idx) => (
              <div 
                key={idx}
                className="bg-accent-50 px-4 py-2 rounded-lg text-sm font-medium text-accent-800 border border-accent-200"
              >
                {idx + 1}. {step}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-neutral-100 p-6 rounded-lg mb-8 border border-neutral-200">
          {service.status === 'coming-soon' ? (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full mb-4 border border-accent-300">
                <span className="text-sm font-medium text-accent-800">Coming Soon</span>
              </div>
              <p className="text-primary-600 mb-4">{service.pricing.model}</p>
              <Link 
                href="/contact"
                className="btn btn-outline magnetic"
              >
                Notify Me
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-500 mb-1">Starting from</p>
                <p className="text-3xl font-display font-bold text-accent-700">{service.pricing.starting}</p>
                <p className="text-sm text-primary-500">{service.pricing.model}</p>
                {service.pricing.maintenance && (
                  <div className="mt-3 pt-3 border-t border-neutral-300">
                    <p className="text-lg font-display font-semibold text-primary-800">Monthly Maintenance from {service.pricing.maintenance}</p>
                    <p className="text-sm text-primary-500">{service.pricing.maintenanceModel}</p>
                  </div>
                )}
              </div>
              <Link 
                href="/contact"
                className="btn btn-primary magnetic"
              >
                Get Quote
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Visual Element */}
      <div className="flex-1 max-w-md">
        {service.gallery && service.gallery.length > 0 && service.galleryConfig ? (
          <ServiceGallery 
            media={service.gallery}
            config={service.galleryConfig}
            className="w-full"
          />
        ) : (
          <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center p-8 border border-neutral-300">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-900 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-accent-400 font-display font-bold text-2xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold text-primary-800 mb-2">
                {service.title}
              </h3>
              <p className="text-primary-600 text-sm">
                {service.pricing.model}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
