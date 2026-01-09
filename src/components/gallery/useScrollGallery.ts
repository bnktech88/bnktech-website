'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GalleryConfig } from '@/content/services'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface UseScrollGalleryProps {
  scrollConfig: GalleryConfig['scrollTrigger']
  totalSlides: number
  onSlideChange: (index: number) => void
  isPreviewMode: boolean
  isMobile: boolean
}

export function useScrollGallery({
  scrollConfig,
  totalSlides,
  onSlideChange,
  isPreviewMode,
  isMobile
}: UseScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const [isScrollControlled, setIsScrollControlled] = useState(false)
  const currentSlideRef = useRef(0)
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const cleanup = useCallback(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
      scrollTriggerRef.current = null
    }
    setIsScrollControlled(false)
  }, [])

  const initScrollTrigger = useCallback(() => {
    if (!containerRef.current || !scrollConfig.enabled || !isPreviewMode) {
      return
    }

    // Disable on mobile for heavy effects or if reduced motion is preferred
    if ((isMobile && scrollConfig.mode === 'scrub') || prefersReducedMotion) {
      return
    }

    cleanup()

    const container = containerRef.current

    if (scrollConfig.mode === 'scrub') {
      // Smooth scrubbing mode - progress tied to scroll position
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: scrollConfig.start,
        end: scrollConfig.end,
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress
          const slideIndex = Math.min(
            Math.floor(progress * totalSlides),
            totalSlides - 1
          )
          
          if (slideIndex !== currentSlideRef.current) {
            currentSlideRef.current = slideIndex
            onSlideChange(slideIndex)
          }
          
          setIsScrollControlled(self.isActive)
        },
        onToggle: (self) => {
          setIsScrollControlled(self.isActive)
        }
      })
    } else if (scrollConfig.mode === 'snap') {
      // Snap mode - discrete slide changes at thresholds
      const snapPoints = Array.from({ length: totalSlides }, (_, i) => 
        i / (totalSlides - 1)
      )

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: scrollConfig.start,
        end: scrollConfig.end,
        scrub: false,
        snap: {
          snapTo: snapPoints,
          duration: { min: 0.2, max: 0.6 },
          ease: 'power2.inOut'
        },
        onUpdate: (self) => {
          const progress = self.progress
          const slideIndex = Math.min(
            Math.round(progress * (totalSlides - 1)),
            totalSlides - 1
          )
          
          if (slideIndex !== currentSlideRef.current) {
            currentSlideRef.current = slideIndex
            onSlideChange(slideIndex)
          }
          
          setIsScrollControlled(self.isActive)
        },
        onToggle: (self) => {
          setIsScrollControlled(self.isActive)
        }
      })
    }
  }, [
    scrollConfig,
    totalSlides,
    onSlideChange,
    isPreviewMode,
    isMobile,
    prefersReducedMotion,
    cleanup
  ])

  // Initialize on mount and config changes
  useEffect(() => {
    initScrollTrigger()
    return cleanup
  }, [initScrollTrigger, cleanup])

  // Refresh ScrollTrigger on window resize
  useEffect(() => {
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        ScrollTrigger.refresh()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Create parallax effect for elements
  const createParallaxEffect = useCallback((
    element: HTMLElement,
    speed: number = 0.5
  ) => {
    if (!isPreviewMode || isMobile || prefersReducedMotion) return null

    return ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const y = self.progress * speed * 100
        gsap.set(element, { y: `${y}px` })
      }
    })
  }, [isPreviewMode, isMobile, prefersReducedMotion])

  return {
    containerRef,
    isScrollControlled,
    createParallaxEffect,
    cleanup,
    refresh: () => ScrollTrigger.refresh()
  }
}
