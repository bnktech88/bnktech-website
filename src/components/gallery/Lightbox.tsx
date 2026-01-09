'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { MediaItem, LightboxStyle } from '@/content/services'
import ImageSlide from './media/ImageSlide'
import VideoSlide from './media/VideoSlide'
import { gsap } from 'gsap'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxProps {
  media: MediaItem[]
  currentIndex: number
  isOpen: boolean
  lightboxStyle: LightboxStyle
  onClose: () => void
  onSlideChange: (index: number) => void
}

export default function Lightbox({
  media,
  currentIndex,
  isOpen,
  lightboxStyle,
  onClose,
  onSlideChange
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const focusTrapRef = useRef<HTMLDivElement>(null)
  
  // Mount check for portal
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Navigation
  const nextSlide = useCallback(() => {
    if (isAnimating) return
    const newIndex = currentIndex === media.length - 1 ? 0 : currentIndex + 1
    onSlideChange(newIndex)
  }, [currentIndex, media.length, isAnimating, onSlideChange])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    const newIndex = currentIndex === 0 ? media.length - 1 : currentIndex - 1
    onSlideChange(newIndex)
  }, [currentIndex, media.length, isAnimating, onSlideChange])

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        case 'Tab':
          // Simple focus trap
          const focusableElements = focusTrapRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (focusableElements && focusableElements.length > 0) {
            const first = focusableElements[0] as HTMLElement
            const last = focusableElements[focusableElements.length - 1] as HTMLElement
            
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault()
              last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isAnimating, onClose, nextSlide, prevSlide])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Animation effects
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (isOpen) {
      // Open animation
      setIsAnimating(true)
      const tl = gsap.timeline({
        onComplete: () => setIsAnimating(false)
      })

      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      
      if (lightboxStyle === 'darkGlass') {
        gsap.set(overlayRef.current, { backdropFilter: 'blur(0px)' })
        tl.to(overlayRef.current, {
          opacity: 1,
          backdropFilter: 'blur(20px)',
          duration: 0.4,
          ease: 'power2.out'
        })
      } else {
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      tl.fromTo(contentRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.2'
      )
    }
  }, [isOpen, lightboxStyle])

  const handleClose = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        onClose()
      }
    })

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.9,
      y: -20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(overlayRef.current, {
      opacity: 0,
      backdropFilter: lightboxStyle === 'darkGlass' ? 'blur(0px)' : undefined,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.1')
  }, [isAnimating, lightboxStyle, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isAnimating) {
      handleClose()
    }
  }

  if (!mounted || !isOpen) return null

  const getBackgroundClass = () => {
    switch (lightboxStyle) {
      case 'darkGlass':
        return 'bg-black/40 backdrop-blur-xl'
      case 'pureBlack':
        return 'bg-black'
      case 'studioWhite':
        return 'bg-white'
      default:
        return 'bg-black/90'
    }
  }

  const getControlsClass = () => {
    const isLight = lightboxStyle === 'studioWhite'
    return isLight ? 'text-grey-800' : 'text-white'
  }

  return createPortal(
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${getBackgroundClass()}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <div
        ref={focusTrapRef}
        className="relative w-full h-full max-w-7xl max-h-full"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 flex items-center justify-center transition-all duration-200 ${getControlsClass()}`}
          aria-label="Close lightbox"
          disabled={isAnimating}
        >
          <X size={24} />
        </button>

        {/* Navigation arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getControlsClass()}`}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getControlsClass()}`}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Content */}
        <div
          ref={contentRef}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative max-w-full max-h-full">
            {media[currentIndex]?.type === 'image' ? (
              <div className="relative max-w-[90vw] max-h-[90vh]">
                <Image
                  src={media[currentIndex].src}
                  alt={media[currentIndex].alt || 'Gallery image'}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ 
                    maxWidth: '90vw', 
                    maxHeight: '90vh',
                    width: 'auto',
                    height: 'auto'
                  }}
                  priority
                  quality={95}
                />
              </div>
            ) : media[currentIndex]?.type === 'video' ? (
              <div className="relative max-w-[90vw] max-h-[90vh]">
                <video
                  controls
                  autoPlay
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ 
                    maxWidth: '90vw', 
                    maxHeight: '90vh'
                  }}
                  poster={media[currentIndex].poster}
                >
                  <source src={media[currentIndex].src} type="video/mp4" />
                  <source src={media[currentIndex].src.replace('.mp4', '.webm')} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
          </div>
        </div>

        {/* Caption */}
        {media[currentIndex]?.caption && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-2xl text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-4">
              <p className={`font-medium ${lightboxStyle === 'studioWhite' ? 'text-grey-800' : 'text-white'}`}>
                {media[currentIndex].caption}
              </p>
              {media[currentIndex].alt && media[currentIndex].alt !== media[currentIndex].caption && (
                <p className={`text-sm mt-1 ${lightboxStyle === 'studioWhite' ? 'text-grey-600' : 'text-white/80'}`}>
                  {media[currentIndex].alt}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Counter */}
        {media.length > 1 && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
              <span className={`text-sm font-medium ${getControlsClass()}`}>
                {currentIndex + 1} of {media.length}
              </span>
            </div>
          </div>
        )}

        {/* Dot indicators */}
        {media.length > 1 && media.length <= 10 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => onSlideChange(index)}
                disabled={isAnimating}
                className={`w-2 h-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
                  index === currentIndex
                    ? lightboxStyle === 'studioWhite' ? 'bg-grey-800 scale-125' : 'bg-white scale-125'
                    : lightboxStyle === 'studioWhite' ? 'bg-grey-400 hover:bg-grey-600' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
