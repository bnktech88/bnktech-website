'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import ProjectPreview from './ProjectPreview'

interface PreviewData {
  title: string
  category: string
  image?: string
}

interface HoverPreviewContextType {
  showPreview: (data: PreviewData, position: { x: number; y: number }) => void
  hidePreview: () => void
  updatePosition: (position: { x: number; y: number }) => void
}

const HoverPreviewContext = createContext<HoverPreviewContextType | null>(null)

export function useHoverPreview() {
  const context = useContext(HoverPreviewContext)
  if (!context) {
    throw new Error('useHoverPreview must be used within HoverPreviewProvider')
  }
  return context
}

interface HoverPreviewProviderProps {
  children: React.ReactNode
}

export default function HoverPreviewProvider({ children }: HoverPreviewProviderProps) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const showPreview = useCallback((data: PreviewData, position: { x: number; y: number }) => {
    setPreviewData(data)
    setMousePosition(position)
    setIsVisible(true)
  }, [])

  const hidePreview = useCallback(() => {
    setIsVisible(false)
  }, [])

  const updatePosition = useCallback((position: { x: number; y: number }) => {
    setMousePosition(position)
  }, [])

  const contextValue: HoverPreviewContextType = {
    showPreview,
    hidePreview,
    updatePosition
  }

  return (
    <HoverPreviewContext.Provider value={contextValue}>
      {children}
      {previewData && (
        <ProjectPreview
          title={previewData.title}
          category={previewData.category}
          image={previewData.image}
          isVisible={isVisible}
          mousePosition={mousePosition}
        />
      )}
    </HoverPreviewContext.Provider>
  )
}
