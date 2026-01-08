'use client'

import { useState, useEffect, useRef } from 'react'
import { MediaItem, GalleryConfig } from '@/content/services'
import { useGalleryMotion } from '../useGalleryMotion'
import ImageSlide from '../media/ImageSlide'
import VideoSlide from '../media/VideoSlide'
import { gsap } from 'gsap'

interface CinematicZoomGalleryProps {
  media: MediaItem[]
  config: GalleryConfig
  currentIndex: number
  isVisible: boolean
  onSlideChange: (index: number) => void
  onMediaClick: (index: number) => void
  className?: string
}

export default function CinematicZoomGallery({
  media,
  config,
  currentIndex,
  isVisible,
  onSlideChange,
  onMediaClick,
  className = ''
}: CinematicZoomGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const { animateTransition } = useGalleryMotion({
    transition: config.transition,
    duration: 1.2,
    ease: 'power2.inOut',
    respectReducedMotion: true
  })

  // Cinematic zoom effect on active slide
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide && !isTransitioning) {
        if (index === currentIndex) {
          // Active slide - subtle zoom in
          gsap.fromTo(slide, 
            { scale: 1.05, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 1.5,
              ease: 'power2.out'
            }
          )
        } else {
          // Inactive slides - hidden
          gsap.set(slide, { opacity: 0, scale: 1.1 })
        }
      }
    })
  }, [currentIndex, isTransitioning])

  // Background cinematic zoom animation
  useEffect(() => {
    if (isVisible && config.autoPlay) {
      const activeSlide = slideRefs.current[currentIndex]
      if (activeSlide) {
        // Slow zoom effect during display
        gsap.to(activeSlide.querySelector('img') || activeSlide, {
          scale: 1.08,
          duration: config.intervalMs / 1000,
          ease: 'power1.inOut'
        })
      }
    }
  }, [currentIndex, isVisible, config.autoPlay, config.intervalMs])

  // Navigation with cinematic transitions
  const goToSlide = (index: number) => {
    if (index >= 0 && index < media.length && index !== currentIndex && !isTransitioning) {
      setIsTransitioning(true)
      
      const outgoing = slideRefs.current[currentIndex]
      const incoming = slideRefs.current[index]
      
      if (outgoing && incoming) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false)
            onSlideChange(index)
          }
        })

        // Cinematic transition with clip reveal and zoom
        tl.set(incoming, { 
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            scale: 1.1,
            opacity: 1 
          })
          .to(incoming, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 1.2,
            ease: 'power2.inOut'
          })
          .to(outgoing, { 
            opacity: 0, 
            scale: 0.95,
            duration: 0.8,
            ease: 'power2.in'
          }, '<0.2')
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
      className={`relative aspect-square bg-black rounded-2xl overflow-hidden group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Service gallery - Cinematic style"
    >
      {/* Film grain overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-20 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Media slides */}
      <div className="relative w-full h-full">
        {media.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            ref={(el) => { slideRefs.current[index] = el }}
            className="absolute inset-0 cursor-pointer"
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

      {/* Cinematic UI elements */}
      {media.length > 1 && !isTransitioning && (
        <>
          {/* Navigation arrows with cinematic style */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 hover:border-white/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm z-20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 hover:border-white/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm z-20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cinematic progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ 
                width: `${((currentIndex + 1) / media.length) * 100}%` 
              }}
            />
          </div>
        </>
      )}

      {/* Minimalist counter */}
      {media.length > 1 && (
        <div className="absolute top-4 left-4 text-white/80 text-sm font-light tracking-wider z-20">
          <span className="text-white">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/50 mx-1">—</span>
          <span className="text-white/60">{String(media.length).padStart(2, '0')}</span>
        </div>
      )}

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-radial from-transparent via-transparent to-black/20" />
      </div>
    </div>
  )
}
