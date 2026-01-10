'use client'

import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BnkCardProps {
  children: ReactNode
  variant?: 'cream' | 'navy' | 'elevated' | 'floating'
  headerAccent?: boolean
  hover?: boolean
  padding?: 'tight' | 'normal' | 'loose'
  className?: string
  onClick?: () => void
}

const BnkCard = forwardRef<HTMLDivElement, BnkCardProps>(({
  children,
  variant = 'cream',
  headerAccent = false,
  hover = true,
  padding = 'normal',
  className,
  onClick,
  ...props
}, ref) => {
  
  // Base card styling
  const baseClasses = 'rounded-xl transition-all duration-300 transform-gpu'
  
  // Variant classes
  const variantClasses = {
    cream: cn(
      'bg-surface-cream border border-bronze',
      'shadow-sm shadow-bnk-bronze/10',
      hover && 'hover:border-bnk-gold hover:shadow-md hover:shadow-bnk-gold/20 hover:-translate-y-1'
    ),
    navy: cn(
      'bg-base-navy border border-bnk-navy-light',
      'shadow-lg shadow-bnk-navy/20',
      hover && 'hover:border-bnk-gold hover:shadow-xl hover:shadow-bnk-gold/30 hover:-translate-y-1'
    ),
    elevated: cn(
      'bg-surface border border-bronze',
      'shadow-lg shadow-bnk-bronze/15',
      hover && 'hover:border-bnk-gold hover:shadow-xl hover:shadow-bnk-gold/25 hover:-translate-y-2'
    ),
    floating: cn(
      'bg-surface-cream border border-bnk-bronze-light',
      'shadow-xl shadow-bnk-bronze/20 ring-1 ring-bnk-bronze-light/20',
      hover && 'hover:border-bnk-gold hover:shadow-2xl hover:shadow-bnk-gold/30 hover:-translate-y-3 hover:ring-bnk-gold/30'
    )
  }
  
  // Padding classes
  const paddingClasses = {
    tight: 'p-4',
    normal: 'p-6',
    loose: 'p-8'
  }

  // Text color based on variant
  const textClasses = {
    cream: 'text-bnk-ink',
    navy: 'text-bnk-cream',
    elevated: 'text-bnk-ink',
    floating: 'text-bnk-ink'
  }

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        textClasses[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Header accent line */}
      {headerAccent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bnk-gold to-transparent rounded-t-xl" />
      )}
      
      {/* Card content */}
      <div className="relative">
        {children}
      </div>
      
      {/* Subtle depth gradient for luxury feel */}
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-bnk-bronze/5 pointer-events-none -z-10"
        style={{ transform: 'translateY(2px)' }}
      />
    </div>
  )
})

BnkCard.displayName = 'BnkCard'

export default BnkCard
