'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
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

    // Animate on scroll
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
    <section ref={sectionRef} className="py-24" style={{ backgroundColor: '#D6B071' }}>
      <div className="container">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-navy">
            Ready to Work Together?
          </h2>
          
          <p className="text-xl text-navy mb-12 leading-relaxed">
            Our team of experienced developers, designers, and technology strategists is ready to help 
            transform your business. Let's discuss how we can bring your vision to life.
          </p>

          <div className="bg-cream p-8 rounded-lg border border-navy mb-12">
            <h3 className="text-2xl font-display font-semibold mb-6 text-navy">Why Choose BNK Tech?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-navy rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-navy">Expert Team</h4>
                  <p className="text-navy">Skilled professionals with years of experience in cutting-edge technologies</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-navy rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-navy">Proven Track Record</h4>
                  <p className="text-navy">50+ successful projects delivered with 100% client satisfaction</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-navy rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-navy">Full-Service Solutions</h4>
                  <p className="text-navy">From strategy to implementation to ongoing support</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-navy rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-navy">Local & Global</h4>
                  <p className="text-navy">South African roots with international best practices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-primary text-lg px-12 py-6 rounded-lg font-medium transition-all duration-200">
              Start Your Project
            </Link>
            <Link href="/work" className="btn-outline text-lg px-12 py-6 rounded-lg font-medium transition-all duration-200">
              View Our Work
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-navy">
            <p className="text-navy mb-4">Get in touch today</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
              <a href="tel:+27630687409" className="text-navy hover:opacity-80 transition-colors">
                📞 +27 63 068 7409
              </a>
              <a href="mailto:bnktech.net@gmail.com" className="text-navy hover:opacity-80 transition-colors">
                ✉️ bnktech.net@gmail.com
              </a>
              <span className="text-navy">Response within 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
