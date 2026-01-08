'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  src: string
  alt: string
}

interface ServiceMediaCarouselProps {
  images: GalleryImage[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showDots?: boolean
  className?: string
}

export default function ServiceMediaCarousel({
  images,
  autoPlay = true,
  interval = 3500,
  showControls = true,
  showDots = true,
  className = ''
}: ServiceMediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  // Check if mobile device
  const isMobile = typeof window !== 'undefined' 
    ? window.innerWidth < 768 
    : false

  // Determine if autoplay should be enabled
  useEffect(() => {
    if (prefersReducedMotion || !autoPlay || images.length <= 1) {
      setIsAutoPlaying(false)
      return
    }

    // Enable autoplay on desktop, disable on mobile by default
    setIsAutoPlaying(!isMobile)
  }, [autoPlay, images.length, prefersReducedMotion, isMobile])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused || images.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, isPaused, images.length, interval])

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    }
  }

  // Return fallback if no images
  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-gradient-to-br from-grey-100 to-grey-200 rounded-2xl flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-grey-300 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-grey-600 text-sm font-medium">Gallery</span>
          </div>
          <p className="text-grey-600 text-sm">Images coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-square bg-grey-100 rounded-2xl overflow-hidden group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service image gallery"
    >
      {/* Main image display */}
      <div className="relative w-full h-full">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={currentIndex === 0}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Navigation arrows */}
      {showControls && images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} className="text-grey-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            aria-label="Next image"
          >
            <ChevronRight size={16} className="text-grey-800" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white ${
                index === currentIndex
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs font-medium backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
