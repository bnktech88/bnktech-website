'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useGalleryMotion } from '../useGalleryMotion'
import ImageSlide from '../media/ImageSlide'
import VideoSlide from '../media/VideoSlide'
import { gsap } from 'gsap'

interface StackCardsGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  currentIndex: number
  isVisible: boolean
  onSlideChange: (index: number) => void
  onMediaClick: (index: number) => void
  className?: string
}

export default function StackCardsGallery({
  media,
  config,
  currentIndex,
  isVisible,
  onSlideChange,
  onMediaClick,
  className = ''
}: StackCardsGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const { animateTransition } = useGalleryMotion({
    transition: config.transition,
    duration: 0.8,
    ease: 'power2.inOut',
    respectReducedMotion: true
  })

  // Initialize card positions
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const isActive = index === currentIndex
        const isBehind = index > currentIndex
        
        gsap.set(card, {
          zIndex: isActive ? 10 : (media.length - index),
          scale: isActive ? 1 : 0.95 - (Math.min(index - currentIndex, 3) * 0.05),
          y: isActive ? 0 : (index - currentIndex) * 8,
          opacity: index <= currentIndex + 2 ? 1 : 0,
          transformOrigin: 'center bottom'
        })
      }
    })
  }, [currentIndex, media.length])

  // Navigation with smooth card transitions
  const goToSlide = (index: number) => {
    if (index >= 0 && index < media.length && index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      
      const isNext = index > currentIndex
      const currentCard = cardRefs.current[currentIndex]
      const nextCard = cardRefs.current[index]
      
      if (currentCard && nextCard) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false)
            onSlideChange(index)
          }
        })

        if (isNext) {
          // Moving forward - current card slides out, next card moves to front
          tl.to(currentCard, {
            x: '-100%',
            rotationY: -15,
            duration: 0.6,
            ease: 'power2.inOut'
          })
          .to(nextCard, {
            scale: 1,
            y: 0,
            zIndex: 10,
            duration: 0.6,
            ease: 'power2.out'
          }, '<0.2')
        } else {
          // Moving backward - previous card slides in from behind
          tl.set(nextCard, {
            x: 0,
            rotationY: 0,
            scale: 1,
            y: 0,
            zIndex: 10
          })
          .to(currentCard, {
            scale: 0.9,
            y: 20,
            zIndex: 5,
            duration: 0.5,
            ease: 'power2.inOut'
          })
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
      className={`relative aspect-square bg-grey-100 rounded-2xl overflow-hidden group perspective-1000 ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service gallery - Stack cards style"
      style={{ perspective: '1000px' }}
    >
      {/* Stacked cards */}
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(el) => { cardRefs.current[index] = el }}
            className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: index === currentIndex 
                ? '0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)' 
                : '0 8px 16px rgba(0,0,0,0.1)'
            }}
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
            
            {/* Card depth indicator */}
            {index !== currentIndex && index <= currentIndex + 2 && (
              <div 
                className="absolute inset-0 bg-black pointer-events-none"
                style={{ 
                  opacity: Math.min((index - currentIndex) * 0.08, 0.2)
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Next card preview hint */}
      {media.length > 1 && currentIndex < media.length - 1 && (
        <div className="absolute bottom-4 right-4 text-white/80 text-xs font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
          Tap to see next
        </div>
      )}

      {/* Navigation controls */}
      {media.length > 1 && !isTransitioning && (
        <>
          {/* Swipe areas */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-0 w-1/4 h-full z-20 opacity-0 focus:opacity-20 focus:bg-black/10"
            aria-label="Previous slide"
          />
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-0 w-1/4 h-full z-20 opacity-0 focus:opacity-20 focus:bg-black/10"
            aria-label="Next slide"
          />

          {/* Visible navigation arrows on hover */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'bg-white shadow-lg scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Stack counter */}
      <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs font-medium backdrop-blur-sm z-30">
        {currentIndex + 1} / {media.length}
      </div>
    </div>
  )
}
