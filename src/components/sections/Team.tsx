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
    <section ref={sectionRef} className="py-24 bg-bnk-neutral-50">
      <div className="container">
        <div ref={contentRef} className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-brand">
            Ready to Work Together?
          </h2>
          
          <p className="text-xl text-muted mb-12 leading-relaxed">
            Our team of experienced developers, designers, and technology strategists is ready to help 
            transform your business. Let's discuss how we can bring your vision to life.
          </p>

          <div className="bg-surface p-8 rounded-lg border mb-12">
            <h3 className="text-2xl font-display font-semibold mb-6 text-brand">Why Choose BNK Tech?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-brand">Expert Team</h4>
                  <p className="text-muted">Skilled professionals with years of experience in cutting-edge technologies</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-brand">Proven Track Record</h4>
                  <p className="text-muted">50+ successful projects delivered with 100% client satisfaction</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-brand">Full-Service Solutions</h4>
                  <p className="text-muted">From strategy to implementation to ongoing support</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-3 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-brand">Local & Global</h4>
                  <p className="text-muted">South African roots with international best practices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn btn-primary text-lg px-12 py-6 magnetic">
              Start Your Project
            </Link>
            <Link href="/work" className="btn btn-outline text-lg px-12 py-6 magnetic">
              View Our Work
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border">
            <p className="text-muted mb-4">Get in touch today</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
              <a href="tel:+27630687409" className="text-muted hover:text-accent-hover transition-colors">
                📞 +27 63 068 7409
              </a>
              <a href="mailto:bnktech.net@gmail.com" className="text-muted hover:text-accent-hover transition-colors">
                ✉️ bnktech.net@gmail.com
              </a>
              <span className="text-subtle">Response within 4 hours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
