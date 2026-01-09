'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig } from '@/content/site'
import { createWhatsAppUrl, formatPhoneNumber } from '@/lib/utils'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function ContactInfo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(container, { opacity: 1, x: 0 })
      return
    }

    // Initial state
    gsap.set(container, { opacity: 0, x: 60 })

    // Animate on scroll
    createScrollTrigger(container, () => {
      gsap.to(container, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  return (
    <div ref={containerRef}>
      <h2 className="text-3xl font-display font-bold mb-6 text-navy">
        Get In Touch
      </h2>
      <p className="text-navy mb-8 leading-relaxed">
        Prefer to contact us directly? We're available through multiple channels 
        and guarantee a response within 4 hours during business days.
      </p>

      <div className="space-y-6 mb-8">
        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-navy">Phone & WhatsApp</h3>
            <a 
              href={`tel:${siteConfig.company.phone}`}
              className="text-navy hover:opacity-80 transition-colors block mb-1 font-medium"
            >
              {formatPhoneNumber(siteConfig.company.phone)}
            </a>
            <a 
              href={createWhatsAppUrl(
                siteConfig.company.whatsapp,
                `Hi BNK Tech, I'm interested in discussing a project. Can we schedule a consultation?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy hover:opacity-80 transition-colors"
            >
              Send WhatsApp Message →
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-navy">Email</h3>
            <a 
              href={`mailto:${siteConfig.company.email}`}
              className="text-navy hover:opacity-80 transition-colors block font-medium"
            >
              {siteConfig.company.email}
            </a>
            <p className="text-sm text-navy mt-1">
              For detailed project discussions
            </p>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-navy">Response Time</h3>
            <p className="text-navy font-medium">Within 4 hours</p>
            <p className="text-sm text-navy mt-1">
              Business hours: 8AM - 6PM SAST
            </p>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-cream p-6 rounded-lg border border-navy">
        <h3 className="font-semibold mb-4 text-navy">What Happens Next?</h3>
        <div className="space-y-3 text-sm text-navy">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-navy text-gold rounded-full flex items-center justify-center text-xs mr-3 font-bold">1</span>
            <span className="text-navy">We review your project details</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-navy text-gold rounded-full flex items-center justify-center text-xs mr-3 font-bold">2</span>
            <span className="text-navy">Schedule a free 30-minute consultation</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-navy text-gold rounded-full flex items-center justify-center text-xs mr-3 font-bold">3</span>
            <span className="text-navy">Receive a detailed proposal with timeline</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-navy text-gold rounded-full flex items-center justify-center text-xs mr-3 font-bold">4</span>
            <span className="text-navy">Begin development with weekly updates</span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-navy">
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="font-semibold text-navy">100%</div>
            <div className="text-navy">Satisfaction Rate</div>
          </div>
          <div>
            <div className="font-semibold text-navy">50+</div>
            <div className="text-navy">Projects Delivered</div>
          </div>
          <div>
            <div className="font-semibold text-navy">24/7</div>
            <div className="text-navy">Support Available</div>
          </div>
          <div>
            <div className="font-semibold text-navy">Free</div>
            <div className="text-navy">Initial Consultation</div>
          </div>
        </div>
      </div>
    </div>
  )
}
