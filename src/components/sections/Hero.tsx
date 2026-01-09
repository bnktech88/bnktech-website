'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { animateText } from '@/lib/motion'
import { siteConfig } from '@/content/site'
import BnkSection from '@/components/layout/BnkSection'
import BnkButton from '@/components/ui/BnkButton'

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
    <BnkSection
      id="hero"
      ref={containerRef}
      variant="navy"
      diagonal="right"
      depth="raised"
      topAccent={true}
      padding="none"
      className="min-h-screen flex items-center justify-center pt-20"
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
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-8 text-balance leading-tight text-bnk-cream"
        >
          Premium <br />
          <span className="bg-gradient-to-r from-bnk-gold via-bnk-gold-light to-bnk-bronze bg-clip-text text-transparent">Technology</span> <br />
          Solutions
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl lg:text-2xl text-bnk-silver-light mb-12 max-w-3xl mx-auto text-balance leading-relaxed"
        >
          We deliver high-performance websites, digital infrastructure, 
          and comprehensive IT services for businesses ready to scale.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <BnkButton 
            variant="primary" 
            size="xl" 
            magnetic={true}
          >
            <Link href="/work">View Our Work</Link>
          </BnkButton>
          <BnkButton 
            variant="outline" 
            size="xl" 
            magnetic={true}
          >
            <Link href="/contact">Start Your Project</Link>
          </BnkButton>
        </div>

        {/* Scroll Indicator - Business card inspired */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-bnk-gold">
          <div className="animate-bounce">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="mx-auto"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-sm mt-2 text-bnk-silver-light">Scroll to explore</p>
        </div>
      </div>
    </BnkSection>
  )
}
