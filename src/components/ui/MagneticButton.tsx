'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  disabled?: boolean
}

export default function MagneticButton({ 
  children, 
  className, 
  strength = 0.3,
  disabled = false
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const text = textRef.current
    
    if (!button || !text || disabled) return

    // Check for reduced motion or mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window
    
    if (prefersReducedMotion || isMobile) return

    const xTo = gsap.quickTo(button, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
    const yTo = gsap.quickTo(button, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

    const textXTo = gsap.quickTo(text, "x", {duration: 0.8, ease: "power3.out"})
    const textYTo = gsap.quickTo(text, "y", {duration: 0.8, ease: "power3.out"})

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = button.getBoundingClientRect()
      
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      const maxDistance = Math.max(width, height) / 2
      const distance = Math.sqrt(x * x + y * y)
      
      if (distance < maxDistance) {
        const force = Math.max(0, 1 - distance / maxDistance)
        
        xTo(x * strength * force)
        yTo(y * strength * force)
        
        textXTo(x * strength * force * 0.5)
        textYTo(y * strength * force * 0.5)
      }
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
      textXTo(0)
      textYTo(0)
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, disabled])

  if (disabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div 
      ref={buttonRef}
      className={cn("magnetic-container", className)}
    >
      <div ref={textRef} className="magnetic-content">
        {children}
      </div>
    </div>
  )
}
