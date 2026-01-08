'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { animateText } from '@/lib/motion'
import { siteConfig } from '@/content/site'
import MagneticButton from '@/components/ui/MagneticButton'

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
      className="min-h-screen flex items-center justify-center bg-grey-100 pt-20"
    >
      <div className="container text-center">
        {/* Large Hero Logo - Bold & Dominant */}
        <div ref={logoRef} className="mb-16 max-w-full">
          <Image
            src={siteConfig.company.logo}
            alt="BNK Tech (PTY) LTD logo"
            width={600}
            height={600}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] 2xl:w-[36rem] 2xl:h-[36rem] mx-auto"
            priority
            sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, (max-width: 1280px) 448px, (max-width: 1536px) 512px, 576px"
          />
        </div>

        <h1 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8 text-balance leading-tight"
        >
          Premium <br />
          <span className="text-gradient">Technology</span> <br />
          Solutions
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-xl md:text-2xl text-grey-700 mb-12 max-w-3xl mx-auto text-balance leading-relaxed"
        >
          We deliver high-performance websites, digital infrastructure, 
          and comprehensive IT services for businesses ready to scale.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton className="btn btn-primary text-lg px-12 py-6">
            <Link href="/work">View Our Work</Link>
          </MagneticButton>
          <MagneticButton className="btn btn-outline text-lg px-12 py-6">
            <Link href="/contact">Start Your Project</Link>
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-grey-600">
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
          <p className="text-sm mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  )
}
