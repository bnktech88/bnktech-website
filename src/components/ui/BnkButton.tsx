'use client'

import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BnkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  magnetic?: boolean
  className?: string
}

const BnkButton = forwardRef<HTMLButtonElement, BnkButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  magnetic = false,
  className,
  disabled,
  ...props
}, ref) => {
  
  // Base button classes
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-bnk-gold focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none transform-gpu',
    magnetic && 'hover:scale-105 active:scale-95'
  )
  
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-xl',
    xl: 'px-12 py-6 text-lg rounded-xl'
  }
  
  // Variant classes
  const variantClasses = {
    primary: cn(
      // Primary CTA - Gold background, navy text
      'bg-bnk-gold text-bnk-navy shadow-lg shadow-bnk-gold/25',
      'hover:bg-bnk-bronze hover:shadow-xl hover:shadow-bnk-bronze/30',
      'active:bg-bnk-bronze-light ring-offset-bnk-cream-light'
    ),
    secondary: cn(
      // Secondary - Navy background, cream text, gold border
      'bg-bnk-navy text-bnk-cream border-2 border-bnk-gold shadow-lg shadow-bnk-navy/30',
      'hover:bg-bnk-navy-light hover:border-bnk-gold-light hover:shadow-xl hover:shadow-bnk-navy/40',
      'active:bg-bnk-navy-dark ring-offset-bnk-cream-light'
    ),
    outline: cn(
      // Ghost/Outline - Transparent, gold border
      'bg-transparent border-2 border-bnk-gold text-bnk-navy shadow-sm',
      'hover:bg-bnk-gold hover:text-bnk-navy hover:shadow-lg hover:shadow-bnk-gold/20',
      'active:bg-bnk-bronze ring-offset-bnk-cream-light',
      // Text color changes based on background context
      '[.bg-base-navy_&]:text-bnk-cream [.bg-base-navy_&]:hover:text-bnk-navy'
    ),
    ghost: cn(
      // Minimal - Text only with hover effects
      'bg-transparent text-bnk-gold shadow-none',
      'hover:bg-bnk-gold/10 hover:text-bnk-bronze',
      'active:bg-bnk-gold/20 ring-offset-bnk-cream-light',
      // Text color adapts to background
      '[.bg-base-navy_&]:text-bnk-gold-light [.bg-base-navy_&]:hover:bg-bnk-gold-light/10'
    )
  }

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {children}
    </button>
  )
})

BnkButton.displayName = 'BnkButton'

export default BnkButton
