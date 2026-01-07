'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(overlay, { scaleX: 0 })
      return
    }

    // Animation timeline
    const tl = gsap.timeline()

    // Page enter animation
    tl.set(overlay, { scaleX: 0, transformOrigin: 'left' })
      .to(overlay, { 
        scaleX: 1, 
        duration: 0.6, 
        ease: 'power2.inOut' 
      })
      .to(overlay, { 
        scaleX: 0, 
        transformOrigin: 'right', 
        duration: 0.6, 
        ease: 'power2.inOut' 
      })
      .from(content, { 
        opacity: 0, 
        y: 20, 
        duration: 0.4, 
        ease: 'power2.out' 
      }, '-=0.3')

  }, [pathname])

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        style={{ transform: 'scaleX(0)' }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  )
}
