'use client'

import Image from 'next/image'
import { MediaItem } from '@/content/services'

interface ImageSlideProps {
  media: MediaItem
  isActive: boolean
  isPriority?: boolean
  className?: string
  onClick?: () => void
}

export default function ImageSlide({ 
  media, 
  isActive, 
  isPriority = false, 
  className = '',
  onClick 
}: ImageSlideProps) {
  if (media.type !== 'image') return null

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
      <Image
        src={media.src}
        alt={media.alt || 'Gallery image'}
        fill
        className="object-cover transition-opacity duration-500 ease-in-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={isPriority}
        quality={90}
      />
      
      {/* Caption overlay */}
      {media.caption && isActive && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm font-medium">{media.caption}</p>
        </div>
      )}
      
      {/* Cursor hint for lightbox */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10 flex items-center justify-center cursor-pointer">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
