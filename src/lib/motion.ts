import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const defaultEase = 'power2.out'
export const slowEase = 'power3.out'
export const fastEase = 'power1.out'

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: defaultEase }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: defaultEase }
}

export const slideUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: slowEase }
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export function createScrollTrigger(
  trigger: string | HTMLElement,
  animation: gsap.core.Timeline | (() => void),
  options?: ScrollTrigger.StaticVars
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top 80%',
    end: 'bottom 20%',
    ...options,
    animation: typeof animation === 'function' ? undefined : animation,
    onEnter: typeof animation === 'function' ? animation : undefined,
  })
}

export function animateText(
  element: string | HTMLElement,
  options: {
    duration?: number
    delay?: number
    stagger?: number
    ease?: string
  } = {}
) {
  const { duration = 0.8, delay = 0, stagger = 0.1, ease = defaultEase } = options

  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
    }
  )
}

export function animateCounter(
  element: string | HTMLElement,
  endValue: number,
  options: {
    duration?: number
    ease?: string
    onUpdate?: (value: number) => void
  } = {}
) {
  const { duration = 2, ease = defaultEase, onUpdate } = options
  
  return gsap.fromTo(
    { value: 0 },
    { value: endValue },
    {
      duration,
      ease,
      onUpdate: function() {
        const value = Math.round(this.targets()[0].value)
        if (onUpdate) onUpdate(value)
      }
    }
  )
}

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia?.(reducedMotionQuery).matches
  
  if (prefersReducedMotion) {
    gsap.set('*', { 
      animationDuration: '0.01s !important',
      animationDelay: '0.01s !important',
      transitionDuration: '0.01s !important',
      transitionDelay: '0.01s !important'
    })
    
    gsap.globalTimeline.timeScale(1000)
  }
}
