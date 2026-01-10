'use client'

import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BnkSectionProps {
  children: ReactNode
  variant?: 'cream' | 'navy' | 'gold' | 'white'
  diagonal?: 'none' | 'left' | 'right' | 'both'
  depth?: 'flat' | 'raised' | 'floating'
  topAccent?: boolean
  bottomAccent?: boolean
  padding?: 'tight' | 'normal' | 'loose' | 'none'
  className?: string
  id?: string
}

const BnkSection = forwardRef<HTMLElement, BnkSectionProps>(({
  children,
  variant = 'cream',
  diagonal = 'none',
  depth = 'flat',
  topAccent = false,
  bottomAccent = false,
  padding = 'normal',
  className,
  id,
  ...props
}, ref) => {
  
  // Base background classes
  const backgroundClasses = {
    cream: 'bg-base-cream',
    navy: 'bg-base-navy',
    gold: 'bg-accent text-bnk-navy',
    white: 'bg-bnk-white'
  }

  // Text color classes based on variant
  const textClasses = {
    cream: 'text-bnk-ink',
    navy: 'text-bnk-cream',
    gold: 'text-bnk-navy',
    white: 'text-bnk-ink'
  }

  // Padding classes
  const paddingClasses = {
    none: '',
    tight: 'py-12 md:py-16',
    normal: 'py-16 md:py-24',
    loose: 'py-24 md:py-32'
  }

  // Depth/shadow classes
  const depthClasses = {
    flat: '',
    raised: 'relative',
    floating: 'relative shadow-xl shadow-bnk-bronze/10'
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative overflow-hidden',
        backgroundClasses[variant],
        textClasses[variant],
        paddingClasses[padding],
        depthClasses[depth],
        className
      )}
      {...props}
    >
      {/* Diagonal Overlay Layers */}
      {diagonal !== 'none' && (
        <>
          {/* Left Diagonal */}
          {(diagonal === 'left' || diagonal === 'both') && (
            <div className="absolute inset-0 -z-10">
              <div 
                className={cn(
                  'absolute top-0 left-0 w-full h-full origin-top-left',
                  'bg-gradient-to-br from-bnk-gold/20 via-bnk-bronze/10 to-transparent',
                  'transform-gpu'
                )}
                style={{
                  clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0% 100%)'
                }}
              />
            </div>
          )}

          {/* Right Diagonal */}
          {(diagonal === 'right' || diagonal === 'both') && (
            <div className="absolute inset-0 -z-10">
              <div 
                className={cn(
                  'absolute top-0 right-0 w-full h-full origin-top-right',
                  'bg-gradient-to-bl from-bnk-gold/20 via-bnk-bronze/10 to-transparent',
                  'transform-gpu'
                )}
                style={{
                  clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 55% 100%)'
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Depth Layer for Raised/Floating */}
      {depth !== 'flat' && (
        <div 
          className="absolute inset-0 -z-20 bg-gradient-to-b from-bnk-bronze/5 to-transparent"
          style={{ transform: 'translateY(4px)' }}
        />
      )}

      {/* Top Accent Line */}
      {topAccent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bnk-gold to-transparent" />
      )}

      {/* Bottom Accent Line */}
      {bottomAccent && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bnk-gold to-transparent" />
      )}

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Mobile Responsive Diagonal Reduction */}
      <style jsx>{`
        @media (max-width: 768px) {
          .absolute[style*="clipPath"] {
            clip-path: polygon(0 0, 40% 0, 30% 100%, 0% 100%) !important;
          }
          .absolute[style*="clipPath"]:last-of-type {
            clip-path: polygon(60% 0, 100% 0, 100% 100%, 70% 100%) !important;
          }
        }
      `}</style>
    </section>
  )
})

BnkSection.displayName = 'BnkSection'

export default BnkSection
