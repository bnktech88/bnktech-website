'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useGalleryMotion } from '../useGalleryMotion'
import ImageSlide from '../media/ImageSlide'
import VideoSlide from '../media/VideoSlide'
import { gsap } from 'gsap'

interface SplitRevealGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  currentIndex: number
  isVisible: boolean
  onSlideChange: (index: number) => void
  onMediaClick: (index: number) => void
  className?: string
}

export default function SplitRevealGallery({
  media,
  config,
  currentIndex,
  isVisible,
  onSlideChange,
  onMediaClick,
  className = ''
}: SplitRevealGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Split reveal transition
  const goToSlide = (index: number) => {
    if (index >= 0 && index < media.length && index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      
      const outgoing = slideRefs.current[currentIndex]
      const incoming = slideRefs.current[index]
      const leftPanel = leftPanelRef.current
      const rightPanel = rightPanelRef.current
      
      if (outgoing && incoming && leftPanel && rightPanel) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false)
            onSlideChange(index)
          }
        })

        // Split reveal animation
        tl.set([leftPanel, rightPanel], { 
            zIndex: 20,
            backgroundColor: '#000'
          })
          .set(leftPanel, { x: '-100%' })
          .set(rightPanel, { x: '100%' })
          .to([leftPanel, rightPanel], {
            x: '0%',
            duration: 0.6,
            ease: 'power2.inOut'
          })
          .set(incoming, { opacity: 1, zIndex: 10 }, '-=0.1')
          .set(outgoing, { opacity: 0 }, '-=0.1')
          .to([leftPanel, rightPanel], {
            x: (index, target) => target === leftPanel ? '-100%' : '100%',
            duration: 0.6,
            ease: 'power2.inOut'
          }, '+=0.2')
          .set([leftPanel, rightPanel], { zIndex: -1 })
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
      className={`relative aspect-square bg-grey-100 rounded-2xl overflow-hidden group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service gallery - Split reveal style"
    >
      {/* Split panels for transition */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full bg-black z-[-1]"
        style={{ transform: 'translateX(-100%)' }}
      />
      <div 
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full bg-black z-[-1]"
        style={{ transform: 'translateX(100%)' }}
      />

      {/* Media slides */}
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
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

      {/* Title/caption overlay */}
      {media[currentIndex]?.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <h3 className="text-white font-display font-semibold text-lg mb-2">
            {media[currentIndex].caption}
          </h3>
          {media[currentIndex].alt && (
            <p className="text-white/80 text-sm">
              {media[currentIndex].alt}
            </p>
          )}
        </div>
      )}

      {/* Navigation controls */}
      {media.length > 1 && !isTransitioning && (
        <>
          {/* Split navigation areas */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-0 w-1/2 h-full opacity-0 hover:opacity-10 hover:bg-gradient-to-r hover:from-black/20 hover:to-transparent transition-opacity duration-300 z-10"
            aria-label="Previous slide"
          />
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-0 w-1/2 h-full opacity-0 hover:opacity-10 hover:bg-gradient-to-l hover:from-black/20 hover:to-transparent transition-opacity duration-300 z-10"
            aria-label="Next slide"
          />

          {/* Directional hints */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
            <div className="w-8 h-8 border-l-2 border-t-2 border-white transform -rotate-45" />
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none">
            <div className="w-8 h-8 border-r-2 border-t-2 border-white transform rotate-45" />
          </div>
        </>
      )}

      {/* Elegant dot indicators */}
      {media.length > 1 && (
        <div className="absolute top-6 right-6 flex flex-col space-y-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-1 h-8 rounded-full transition-all duration-300 focus:outline-none disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-6 left-6 text-white font-light">
        <span className="text-2xl">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-white/60 text-sm">/{String(media.length).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
