'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useGalleryMotion } from '../useGalleryMotion'
import ImageSlide from '../media/ImageSlide'
import VideoSlide from '../media/VideoSlide'

interface MinimalFadeGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  currentIndex: number
  isVisible: boolean
  onSlideChange: (index: number) => void
  onMediaClick: (index: number) => void
  className?: string
}

export default function MinimalFadeGallery({
  media,
  config,
  currentIndex,
  isVisible,
  onSlideChange,
  onMediaClick,
  className = ''
}: MinimalFadeGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [prevIndex, setPrevIndex] = useState(currentIndex)
  
  const { animateTransition } = useGalleryMotion({
    transition: config.transition,
    duration: 0.6,
    ease: 'power2.inOut',
    respectReducedMotion: true
  })

  // Handle slide transitions
  useEffect(() => {
    if (prevIndex !== currentIndex) {
      const outgoing = slideRefs.current[prevIndex]
      const incoming = slideRefs.current[currentIndex]
      
      if (outgoing && incoming) {
        animateTransition(outgoing, incoming)
      }
      
      setPrevIndex(currentIndex)
    }
  }, [currentIndex, prevIndex, animateTransition])

  // Navigation handlers
  const goToSlide = (index: number) => {
    if (index >= 0 && index < media.length && index !== currentIndex) {
      onSlideChange(index)
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
      className={`relative aspect-square bg-grey-100 rounded-2xl overflow-hidden group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service gallery"
    >
      {/* Media slides */}
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.type === 'image' ? (
              <ImageSlide
                media={item}
                isActive={index === currentIndex}
                isPriority={item.priority || index === 0}
                onClick={() => onMediaClick(index)}
              />
            ) : (
              <VideoSlide
                media={item}
                isActive={index === currentIndex}
                isVisible={isVisible}
                autoPlay={config.autoPlay && index === currentIndex}
                onClick={() => onMediaClick(index)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white ${
                index === currentIndex
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows (appear on hover) */}
      {media.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 text-grey-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 text-grey-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Media counter */}
      {media.length > 1 && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 rounded-full text-white text-xs font-medium backdrop-blur-sm">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  )
}
