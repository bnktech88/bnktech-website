'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { MediaItem } from '@/content/services'
import { Play, Pause } from 'lucide-react'

interface VideoSlideProps {
  media: MediaItem
  isActive: boolean
  isVisible: boolean
  autoPlay?: boolean
  className?: string
  onClick?: () => void
}

export default function VideoSlide({ 
  media, 
  isActive, 
  isVisible, 
  autoPlay = false, 
  className = '',
  onClick 
}: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [canAutoPlay, setCanAutoPlay] = useState(false)

  useEffect(() => {
    if (media.type !== 'video') return

    const video = videoRef.current
    if (!video) return

    // Check if autoplay is supported
    const checkAutoPlay = async () => {
      try {
        video.muted = true
        await video.play()
        setCanAutoPlay(true)
        video.pause()
      } catch {
        setCanAutoPlay(false)
      }
    }

    checkAutoPlay()
  }, [media.type])

  useEffect(() => {
    if (media.type !== 'video') return
    const video = videoRef.current
    if (!video) return

    if (isActive && isVisible && autoPlay && canAutoPlay) {
      video.muted = true
      video.play().then(() => {
        setIsPlaying(true)
        setShowPoster(false)
      }).catch(() => {
        setIsPlaying(false)
        setShowPoster(true)
      })
    } else if (!isActive || !isVisible) {
      video.pause()
      setIsPlaying(false)
      if (!autoPlay) {
        setShowPoster(true)
      }
    }
  }, [isActive, isVisible, autoPlay, canAutoPlay, media.type])

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.muted = false
      video.play().then(() => {
        setIsPlaying(true)
        setShowPoster(false)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (autoPlay) {
      setShowPoster(true)
    }
  }

  if (media.type !== 'video') return null

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        poster={media.poster}
        loop={autoPlay}
        muted={autoPlay}
        playsInline
        onEnded={handleVideoEnd}
        onLoadedMetadata={() => {
          // Video is ready
        }}
        style={{ display: showPoster ? 'none' : 'block' }}
      >
        <source src={media.src} type="video/mp4" />
        <source src={media.src.replace('.mp4', '.webm')} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Poster image fallback */}
      {showPoster && media.poster && (
        <Image
          src={media.poster}
          alt={media.alt || 'Video poster'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={isActive}
          quality={90}
        />
      )}

      {/* Play/Pause button */}
      <button
        onClick={handlePlayPause}
        className="absolute inset-0 flex items-center justify-center group"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        <div className={`
          w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center
          transition-all duration-300 group-hover:bg-black/70 group-hover:scale-110
          ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        `}>
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white ml-0.5" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </div>
      </button>

      {/* Caption overlay */}
      {media.caption && isActive && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm font-medium">{media.caption}</p>
        </div>
      )}

      {/* Video indicator */}
      <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 rounded text-white text-xs font-medium backdrop-blur-sm">
        VIDEO
      </div>

      {/* Cursor hint for lightbox */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10 flex items-center justify-center cursor-pointer pointer-events-none">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
