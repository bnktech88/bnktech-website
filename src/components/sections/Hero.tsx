'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logo = logoRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current
    const cta = ctaRef.current

    if (!logo || !heading || !subheading || !cta) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Just show content immediately for reduced motion
      return
    }

    // Lazy load GSAP after initial render to avoid blocking LCP
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        
        // Initial state
        gsap.set([logo, heading, subheading, cta], { opacity: 0, y: 60 })

        // Animation timeline with delay to ensure LCP happens first
        const tl = gsap.timeline({ delay: 0.1 })
        
        tl.to(logo, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        })
        .to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.6')
        .to(subheading, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
        .to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.3')
      } catch (error) {
        console.warn('GSAP animation failed to load:', error)
        // Fallback: just show content without animation
      }
    }

    // Use requestIdleCallback to defer animation until after critical rendering
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAnimations)
      } else {
        setTimeout(loadAnimations, 100)
      }
    }
  }, [])

  return (
    <section
      id="hero" 
      ref={containerRef}
      className="bg-bnk-bronze min-h-screen flex items-center justify-center pt-20"
    >
      <div className="container text-center relative z-10">
        {/* Business Card Inspired Logo - Premium but not overwhelming */}
        <div ref={logoRef} className="mb-12 max-w-full">
          <Image
            src={siteConfig.company.logo}
            alt="BNK Tech (PTY) LTD logo"
            width={400}
            height={400}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-auto opacity-90"
            priority
            sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
          />
        </div>

        <h1 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-8 text-balance leading-tight text-navy"
        >
          High-Performance Websites <br />
          <span className="text-navy">+ Ongoing Engineering Support</span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl lg:text-2xl text-navy mb-12 max-w-3xl mx-auto text-balance leading-relaxed"
        >
          For growing businesses and funded startups. Speed, craft, and productized retainers with clear SLAs. 
          Proof-driven delivery that converts.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/contact#book-call" className="btn-primary px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200">
            Book a 15-min Call
          </Link>
          <Link href="/work" className="btn-outline px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200">
            View Proof
          </Link>
        </div>
      </div>
    </section>
  )
}
