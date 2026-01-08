'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featureFlags } from '@/lib/feature-flags'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollContainerProps {
  children: React.ReactNode
}

export default function ScrollContainer({ children }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only apply 3D scroll effects in preview mode
    if (!featureFlags.scroll3D) return

    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Check if mobile device
    const isMobile = window.innerWidth < 768
    if (isMobile) return // Disable 3D effects on mobile for performance

    // Set up 3D scroll animation
    gsap.set(container, {
      transformStyle: 'preserve-3d',
      perspective: 1200,
    })

    // Create scroll-triggered rotation
    const scrollTween = gsap.to(container, {
      rotateX: -8,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          // Reduce intensity as user scrolls
          const progress = self.progress
          const intensity = (1 - progress * 0.5) * -8
          gsap.set(container, { rotateX: intensity * progress })
        },
      },
    })

    // Cleanup
    return () => {
      scrollTween.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  // Apply 3D styles only in preview mode
  const containerStyles = featureFlags.scroll3D
    ? {
        transformStyle: 'preserve-3d' as const,
        perspective: '1200px',
      }
    : {}

  return (
    <div
      ref={containerRef}
      className="relative"
      style={containerStyles}
    >
      {children}
    </div>
  )
}
