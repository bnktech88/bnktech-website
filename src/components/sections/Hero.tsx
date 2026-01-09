'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { animateText } from '@/lib/motion'
import { siteConfig } from '@/content/site'

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const logo = logoRef.current
    const heading = headingRef.current
    const subheading = subheadingRef.current
    const cta = ctaRef.current

    if (!container || !logo || !heading || !subheading || !cta) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set([logo, heading, subheading, cta], { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set([logo, heading, subheading, cta], { opacity: 0, y: 60 })

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.3 })
    
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
          Premium <br />
          <span className="text-navy">Technology</span> <br />
          Solutions
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl lg:text-2xl text-navy mb-12 max-w-3xl mx-auto text-balance leading-relaxed"
        >
          We deliver high-performance websites, digital infrastructure, 
          and comprehensive IT services for businesses ready to scale.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/work" className="btn-primary px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200">
            View Our Work
          </Link>
          <Link href="/contact" className="btn-outline px-12 py-6 rounded-lg text-lg font-medium transition-all duration-200">
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  )
}
