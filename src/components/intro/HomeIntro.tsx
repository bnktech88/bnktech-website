'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { featureFlags } from '@/lib/feature-flags'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HomeIntroProps {
  onComplete?: () => void
}

export default function HomeIntro({ onComplete }: HomeIntroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [hasPlayed, setHasPlayed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't show intro if not in preview mode
    if (!featureFlags.cinematicIntro) {
      setIsVisible(false)
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(false)
      return
    }

    // Check if intro has already played in this session
    const introPlayed = sessionStorage.getItem('bnk-intro-played')
    if (introPlayed) {
      setIsVisible(false)
      return
    }

    const container = containerRef.current
    const logo = logoRef.current
    if (!container || !logo) return

    // Set initial state
    gsap.set(logo, {
      scale: 0.05,
      opacity: 1,
      rotation: 0,
    })

    gsap.set(container, {
      opacity: 1,
    })

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Auto scroll to next section
        const heroSection = document.querySelector('#hero')
        if (heroSection) {
          heroSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
        
        // Hide intro after animation
        setTimeout(() => {
          setIsVisible(false)
          setHasPlayed(true)
          sessionStorage.setItem('bnk-intro-played', 'true')
          onComplete?.()
        }, 800)
      },
    })

    // Main animation sequence
    tl.to(logo, {
      scale: 1.2,
      duration: 1.5,
      ease: 'power2.out',
    })
    .to(logo, {
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.inOut',
    })
    .to(logo, {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(1.7)',
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  // Don't render if not in preview mode or intro has played
  if (!featureFlags.cinematicIntro || !isVisible || hasPlayed) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{ opacity: 0 }}
    >
      <div
        ref={logoRef}
        className="relative w-32 h-32 md:w-48 md:h-48"
      >
        <Image
          src={siteConfig.company.logo}
          alt={siteConfig.company.name}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}
