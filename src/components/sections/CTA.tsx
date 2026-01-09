'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/content/site'
import { createWhatsAppUrl } from '@/lib/utils'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, y: 60 })

    // Animate content on scroll
    createScrollTrigger(content, () => {
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-bnk-bronze py-24"
    >
      <div className="container">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-balance text-navy">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-xl md:text-2xl text-navy mb-12 text-balance leading-relaxed">
            Join the businesses that trust BNK Tech to deliver exceptional technology solutions. 
            Let's discuss how we can accelerate your digital transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/contact" className="btn-primary px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200">
              Start Your Project
            </Link>
            <a
              href={createWhatsAppUrl(
                siteConfig.company.whatsapp,
                `Hi BNK Tech, I'm interested in discussing a project. Can we schedule a consultation?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-display font-semibold mb-2 text-navy">Call or WhatsApp</h3>
              <a 
                href={`tel:${siteConfig.company.phone}`}
                className="text-navy hover:text-bnk-gold transition-colors"
              >
                {siteConfig.company.phone}
              </a>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2 text-navy">Email</h3>
              <a 
                href={`mailto:${siteConfig.company.email}`}
                className="text-navy hover:text-bnk-gold transition-colors"
              >
                {siteConfig.company.email}
              </a>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2 text-navy">Response Time</h3>
              <p className="text-navy">Within 24 hours</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-bnk-gold">
            <div className="flex flex-wrap justify-center items-center gap-8 text-navy">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No Obligation Quote</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
