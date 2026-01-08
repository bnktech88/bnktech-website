'use client'

import { useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { TransitionType } from '@/content/services'

export interface GalleryMotionConfig {
  transition: TransitionType
  duration?: number
  ease?: string
  respectReducedMotion?: boolean
}

export function useGalleryMotion(config: GalleryMotionConfig) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const cleanup = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  const animateTransition = useCallback(
    (
      outgoing: HTMLElement | null,
      incoming: HTMLElement | null,
      onComplete?: () => void
    ) => {
      cleanup()

      if (!outgoing || !incoming) {
        onComplete?.()
        return
      }

      // Respect reduced motion preference
      if (prefersReducedMotion && config.respectReducedMotion) {
        gsap.set(outgoing, { opacity: 0 })
        gsap.set(incoming, { opacity: 1 })
        onComplete?.()
        return
      }

      const duration = config.duration || 0.8
      const ease = config.ease || 'power2.inOut'
      
      timelineRef.current = gsap.timeline({
        onComplete: () => {
          cleanup()
          onComplete?.()
        }
      })

      const tl = timelineRef.current

      switch (config.transition) {
        case 'fade':
          tl.set(incoming, { opacity: 0 })
            .to(outgoing, { opacity: 0, duration: duration / 2, ease })
            .to(incoming, { opacity: 1, duration: duration / 2, ease }, '-=0.1')
          break

        case 'slide':
          tl.set(incoming, { x: '100%', opacity: 1 })
            .to(outgoing, { x: '-100%', duration, ease })
            .to(incoming, { x: '0%', duration, ease }, '<')
          break

        case 'wipe':
          tl.set(incoming, { clipPath: 'inset(0 100% 0 0)' })
            .to(incoming, { 
              clipPath: 'inset(0 0% 0 0)', 
              duration, 
              ease 
            })
            .to(outgoing, { opacity: 0, duration: 0.1 }, '<')
          break

        case 'scale':
          tl.set(incoming, { scale: 1.2, opacity: 0 })
            .to(outgoing, { scale: 0.8, opacity: 0, duration: duration / 2, ease })
            .to(incoming, { 
              scale: 1, 
              opacity: 1, 
              duration: duration / 2, 
              ease 
            }, '-=0.1')
          break

        case '3dFlip':
          tl.set([outgoing, incoming], { transformStyle: 'preserve-3d' })
            .set(incoming, { rotationY: 90, opacity: 1 })
            .to(outgoing, { 
              rotationY: -90, 
              duration: duration / 2, 
              ease,
              transformOrigin: 'center center -50px'
            })
            .to(incoming, { 
              rotationY: 0, 
              duration: duration / 2, 
              ease,
              transformOrigin: 'center center -50px'
            }, '-=0.1')
          break

        case 'clipReveal':
          const maskId = `mask-${Date.now()}`
          tl.set(incoming, { 
              opacity: 1,
              clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            })
            .to(incoming, {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration,
              ease: 'power2.inOut'
            })
            .to(outgoing, { opacity: 0, duration: 0.1 }, '<')
          break

        default:
          // Fallback to simple fade
          tl.set(incoming, { opacity: 0 })
            .to(outgoing, { opacity: 0, duration: duration / 2, ease })
            .to(incoming, { opacity: 1, duration: duration / 2, ease }, '-=0.1')
      }
    },
    [config, prefersReducedMotion, cleanup]
  )

  const animateIn = useCallback(
    (element: HTMLElement, onComplete?: () => void) => {
      if (prefersReducedMotion && config.respectReducedMotion) {
        gsap.set(element, { opacity: 1 })
        onComplete?.()
        return
      }

      gsap.fromTo(element, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: config.duration || 0.6,
          ease: config.ease || 'power2.out',
          onComplete
        }
      )
    },
    [config, prefersReducedMotion]
  )

  const animateOut = useCallback(
    (element: HTMLElement, onComplete?: () => void) => {
      if (prefersReducedMotion && config.respectReducedMotion) {
        gsap.set(element, { opacity: 0 })
        onComplete?.()
        return
      }

      gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: config.duration || 0.4,
        ease: config.ease || 'power2.in',
        onComplete
      })
    },
    [config, prefersReducedMotion]
  )

  return {
    animateTransition,
    animateIn,
    animateOut,
    cleanup,
    isReducedMotion: prefersReducedMotion
  }
}
