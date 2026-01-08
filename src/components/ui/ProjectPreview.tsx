'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProjectPreviewProps {
  title: string
  category: string
  image?: string
  isVisible: boolean
  mousePosition: { x: number; y: number }
}

export default function ProjectPreview({ 
  title, 
  category, 
  image, 
  isVisible, 
  mousePosition 
}: ProjectPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !('ontouchstart' in window))
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !isDesktop) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (isVisible) {
      gsap.set(preview, {
        x: mousePosition.x - 150,
        y: mousePosition.y - 100,
        scale: 0.8,
        opacity: 0
      })
      
      gsap.to(preview, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      gsap.to(preview, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [isVisible, isDesktop])

  useEffect(() => {
    const preview = previewRef.current
    if (!preview || !isVisible || !isDesktop) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(preview, {
        x: mousePosition.x - 150,
        y: mousePosition.y - 100
      })
      return
    }

    gsap.to(preview, {
      x: mousePosition.x - 150,
      y: mousePosition.y - 100,
      duration: 0.6,
      ease: 'power2.out'
    })
  }, [mousePosition.x, mousePosition.y, isVisible, isDesktop])

  if (!isDesktop) return null

  return (
    <div
      ref={previewRef}
      className={cn(
        'fixed top-0 left-0 w-80 h-48 pointer-events-none z-50 rounded-lg overflow-hidden shadow-xl',
        'bg-white border border-grey-200',
        !isVisible && 'opacity-0'
      )}
      style={{ 
        transform: 'translate3d(0,0,0)',
        willChange: 'transform, opacity'
      }}
    >
      {/* Image or Placeholder */}
      <div className="relative aspect-video bg-gradient-to-br from-grey-200 to-grey-300 flex items-center justify-center">
        {image ? (
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        ) : (
          <div className="text-grey-600 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-grey-400 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 9h6v6H9z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-sm font-medium">{category}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-grey-600 bg-grey-100 px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-grey-500">View Project</span>
        </div>
        <h3 className="font-display font-semibold text-sm line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  )
}
