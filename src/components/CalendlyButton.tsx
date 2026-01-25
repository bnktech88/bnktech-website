'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Calendly modal only when needed (performance optimization)
const CalendlyPopupModal = dynamic(
  () => import('react-calendly').then((m) => m.PopupModal),
  { 
    ssr: false,
    loading: () => null // No loading spinner to avoid CLS
  }
)

interface CalendlyButtonProps {
  url: string
  label: string
  className?: string
}

export default function CalendlyButton({ url, label, className = '' }: CalendlyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasModalError, setHasModalError] = useState(false)

  const handleOpenModal = async () => {
    // If modal has failed before, go straight to fallback
    if (hasModalError) {
      openCalendlyInNewTab()
      return
    }

    try {
      setIsOpen(true)
    } catch (error) {
      console.warn('Calendly modal failed to open, falling back to new tab:', error)
      setHasModalError(true)
      openCalendlyInNewTab()
    }
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleModalError = () => {
    console.warn('Calendly modal error detected, falling back to new tab')
    setHasModalError(true)
    setIsOpen(false)
    openCalendlyInNewTab()
  }

  const openCalendlyInNewTab = () => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer,width=800,height=700')
    } catch (error) {
      console.error('Failed to open Calendly in new tab:', error)
      // Last resort fallback
      window.location.href = url
    }
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={className}
        aria-label={`${label} - Opens Calendly booking modal`}
        type="button"
      >
        {label}
      </button>
      
      {isOpen && !hasModalError && typeof document !== 'undefined' && (
        <CalendlyPopupModal
          url={url}
          onModalClose={handleCloseModal}
          open={isOpen}
          rootElement={document.body}
        />
      )}
    </>
  )
}
