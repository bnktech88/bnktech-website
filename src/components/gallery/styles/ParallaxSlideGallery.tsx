'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useGalleryMotion } from '../useGalleryMotion'
import { useScrollGallery } from '../useScrollGallery'
import ImageSlide from '../media/ImageSlide'
import VideoSlide from '../media/VideoSlide'
import { gsap } from 'gsap'

interface ParallaxSlideGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  currentIndex: number
  isVisible: boolean
  onSlideChange: (index: number) => void
  onMediaClick: (index: number) => void
  className?: string
}

export default function ParallaxSlideGallery({
  media,
  config,
  currentIndex,
  isVisible,
  onSlideChange,
  onMediaClick,
  className = ''
}: ParallaxSlideGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  const isPreviewMode = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true'
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  
  const { animateTransition } = useGalleryMotion({
    transition: config.transition,
    duration: 0.8,
    ease: 'power2.inOut',
    respectReducedMotion: true
  })

  const scrollGallery = useScrollGallery({
    scrollConfig: config.scrollTrigger,
    totalSlides: media.length,
    onSlideChange: (index) => {
      if (!isTransitioning) {
        onSlideChange(index)
      }
    },
    isPreviewMode,
    isMobile
  })

  // Initialize parallax background
  useEffect(() => {
    if (backgroundRef.current && isPreviewMode && !isMobile) {
      scrollGallery.createParallaxEffect(backgroundRef.current, -0.3)
    }
  }, [isPreviewMode, isMobile, scrollGallery])

  // Parallax slide transitions
  const goToSlide = (index: number) => {
    if (index >= 0 && index < media.length && index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      
      const direction = index > currentIndex ? 1 : -1
      const outgoing = slideRefs.current[currentIndex]
      const incoming = slideRefs.current[index]
      const background = backgroundRef.current
      
      if (outgoing && incoming) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false)
            onSlideChange(index)
          }
        })

        // Parallax slide animation
        tl.set(incoming, { 
            x: `${direction * 100}%`,
            opacity: 1 
          })
          .to(outgoing, {
            x: `${-direction * 100}%`,
            duration: 0.8,
            ease: 'power2.inOut'
          })
          .to(incoming, {
            x: '0%',
            duration: 0.8,
            ease: 'power2.inOut'
          }, '<')

        // Background parallax effect
        if (background && isPreviewMode) {
          tl.to(background, {
            x: `${-direction * 20}%`,
            duration: 0.8,
            ease: 'power2.inOut'
          }, '<')
        }
      } else {
        setIsTransitioning(false)
        onSlideChange(index)
      }
    }
  }

  const nextSlide = () => {
    goToSlide(currentIndex === media.length - 1 ? 0 : currentIndex + 1)
  }

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? media.length - 1 : currentIndex - 1)
  }

  // Touch/swipe handling
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isTransitioning) return
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    }
  }

  if (!media || media.length === 0) {
    return (
      <div className={`aspect-square bg-gradient-to-br from-grey-100 to-grey-200 rounded-2xl flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-grey-300 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-grey-600 text-sm font-medium">Gallery</span>
          </div>
          <p className="text-grey-600 text-sm">Media coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative aspect-square bg-grey-900 rounded-2xl overflow-hidden group ${className}`}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Service gallery - Parallax slide style"
    >
      {/* Parallax background layer */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]"
        style={{
          backgroundImage: media[currentIndex] ? `url(${media[currentIndex].src})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px) brightness(0.3)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Media slides container */}
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className={`absolute inset-0 ${
              index === currentIndex ? 'z-10' : 'z-0'
            }`}
            onClick={() => !isTransitioning && onMediaClick(index)}
          >
            {item.type === 'image' ? (
              <ImageSlide
                media={item}
                isActive={index === currentIndex}
                isPriority={item.priority || index === 0}
                className="w-full h-full"
              />
            ) : (
              <VideoSlide
                media={item}
                isActive={index === currentIndex}
                isVisible={isVisible && index === currentIndex}
                autoPlay={config.autoPlay && index === currentIndex}
                className="w-full h-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Floating navigation */}
      {media.length > 1 && !isTransitioning && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/20 backdrop-blur-md rounded-full px-4 py-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-1">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all duration-200"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Slide info overlay */}
      <div className="absolute top-4 left-4 text-white">
        <div className="text-sm font-medium opacity-80">
          {currentIndex + 1} of {media.length}
        </div>
        {media[currentIndex]?.caption && (
          <div className="text-lg font-semibold mt-1">
            {media[currentIndex].caption}
          </div>
        )}
      </div>

      {/* Parallax indicator (preview mode only) */}
      {isPreviewMode && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-white text-xs font-medium">
          PARALLAX
        </div>
      )}
    </div>
  )
}
