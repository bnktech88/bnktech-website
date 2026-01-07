'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'view'>('default')

  useEffect(() => {
    // Check if desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !('ontouchstart' in window))
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    if (!isDesktop) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animation loop
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15

      gsap.set(cursor, {
        x: cursorX - 20,
        y: cursorY - 20,
      })

      gsap.set(cursorDot, {
        x: mouseX - 2,
        y: mouseY - 2,
      })

      requestAnimationFrame(animateCursor)
    }

    // Start animation
    document.addEventListener('mousemove', handleMouseMove)
    animateCursor()

    // Handle hover states
    const handleMouseEnter = (e: Event) => {
      const target = e.target
      
      if (target instanceof Element && target.matches('a, button, [role="button"]')) {
        setCursorState('link')
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      if (target instanceof Element && target.matches('[data-cursor="view"]')) {
        setCursorState('view')
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      setCursorState('default')
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    document.addEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.addEventListener('mouseleave', handleMouseLeave, { capture: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true })
      window.removeEventListener('resize', checkDesktop)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference',
          'border border-white rounded-full flex items-center justify-center',
          cursorState === 'view' && 'bg-white'
        )}
      >
        {cursorState === 'view' && (
          <span className="text-xs font-medium text-black">View</span>
        )}
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  )
}
