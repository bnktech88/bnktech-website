'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useScrollGallery } from './useScrollGallery'
import Lightbox from './Lightbox'

// Gallery style imports
import MinimalFadeGallery from './styles/MinimalFadeGallery'
import StackCardsGallery from './styles/StackCardsGallery'
import CinematicZoomGallery from './styles/CinematicZoomGallery'
import SplitRevealGallery from './styles/SplitRevealGallery'
import ParallaxSlideGallery from './styles/ParallaxSlideGallery'

interface ServiceGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  className?: string
  fallbackComponent?: React.ReactNode
}

export default function ServiceGallery({
  media,
  config,
  className = '',
  fallbackComponent
}: ServiceGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  // Check if preview mode is enabled
  const isPreviewMode = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true'
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  // Visibility observer for performance optimization
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!config.autoPlay || !isVisible || media.length <= 1 || prefersReducedMotion) {
      return
    }

    // Disable autoplay on mobile for heavy gallery styles
    if (isMobile && ['stackCards', 'cinematicZoom', 'parallaxSlide'].includes(config.style)) {
      return
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
    }, config.intervalMs)

    setAutoPlayInterval(interval)

    return () => {
      clearInterval(interval)
      setAutoPlayInterval(null)
    }
  }, [config.autoPlay, config.intervalMs, config.style, isVisible, media.length, prefersReducedMotion, isMobile])

  // Cleanup auto-play on unmount
  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
      }
    }
  }, [autoPlayInterval])

  // Navigation handlers
  const handleSlideChange = useCallback((index: number) => {
    if (index >= 0 && index < media.length) {
      setCurrentIndex(index)
      
      // Reset auto-play timer - use ref to avoid dependency issues
      setAutoPlayInterval(current => {
        if (current) {
          clearInterval(current)
        }
        
        if (config.autoPlay && isVisible && !prefersReducedMotion) {
          const newInterval = setInterval(() => {
            setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
          }, config.intervalMs)
          return newInterval
        }
        
        return null
      })
    }
  }, [media.length, config.autoPlay, config.intervalMs, isVisible, prefersReducedMotion])

  // Lightbox handlers
  const handleMediaClick = useCallback((index: number) => {
    if (config.lightboxEnabled) {
      setLightboxIndex(index)
      setIsLightboxOpen(true)
    }
  }, [config.lightboxEnabled])

  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  const handleLightboxSlideChange = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  // Render fallback if no media or configuration
  if (!media || media.length === 0) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>
    }
    
    return (
      <div className={`aspect-square bg-gradient-to-br from-surface to-surface-2 rounded-2xl flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-border rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-muted text-sm font-medium">Gallery</span>
          </div>
          <p className="text-muted text-sm">Media coming soon</p>
        </div>
      </div>
    )
  }

  // Select appropriate gallery component based on style
  const renderGallery = () => {
    const galleryProps = {
      media,
      config,
      currentIndex,
      isVisible,
      onSlideChange: handleSlideChange,
      onMediaClick: handleMediaClick,
      className
    }

    // Fallback to minimal fade for non-preview mode or reduced motion
    if (!isPreviewMode || prefersReducedMotion) {
      return <MinimalFadeGallery {...galleryProps} />
    }

    // Mobile optimizations - use simpler styles
    if (isMobile) {
      switch (config.style) {
        case 'stackCards':
        case 'cinematicZoom':
        case 'parallaxSlide':
        case 'splitReveal':
          return <MinimalFadeGallery {...galleryProps} />
        default:
          return <MinimalFadeGallery {...galleryProps} />
      }
    }

    // Full desktop experience with all styles
    switch (config.style) {
      case 'stackCards':
        return <StackCardsGallery {...galleryProps} />
      case 'cinematicZoom':
        return <CinematicZoomGallery {...galleryProps} />
      case 'splitReveal':
        return <SplitRevealGallery {...galleryProps} />
      case 'parallaxSlide':
        return <ParallaxSlideGallery {...galleryProps} />
      case 'minimalFade':
      default:
        return <MinimalFadeGallery {...galleryProps} />
    }
  }

  return (
    <>
      <div ref={containerRef} className="relative">
        {renderGallery()}
        
        {/* Preview mode indicator */}
        {isPreviewMode && config.style !== 'minimalFade' && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-brand/80 text-bnk-cream text-xs font-medium rounded backdrop-blur-sm">
            {config.style.toUpperCase()}
          </div>
        )}
        
        {/* Performance indicator for mobile */}
        {isMobile && ['stackCards', 'cinematicZoom', 'parallaxSlide'].includes(config.style) && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-accent/80 text-bnk-navy text-xs font-medium rounded backdrop-blur-sm">
            OPTIMIZED
          </div>
        )}
      </div>

      {/* Lightbox */}
      {config.lightboxEnabled && (
        <Lightbox
          media={media}
          currentIndex={lightboxIndex}
          isOpen={isLightboxOpen}
          lightboxStyle={config.lightboxStyle}
          onClose={handleLightboxClose}
          onSlideChange={handleLightboxSlideChange}
        />
      )}
    </>
  )
}
