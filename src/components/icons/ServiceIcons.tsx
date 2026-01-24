import React from 'react'

interface IconProps {
  className?: string
}

// Website Builds & Maintenance
export const WebsiteIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor */}
    <rect x="8" y="12" width="48" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="12" y="16" width="40" height="24" rx="1" fill="currentColor" opacity="0.1"/>
    
    {/* Code elements */}
    <rect x="16" y="20" width="12" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="16" y="24" width="8" height="2" fill="currentColor" opacity="0.6"/>
    <rect x="16" y="28" width="16" height="2" fill="currentColor" opacity="0.6"/>
    
    {/* Performance indicator */}
    <circle cx="44" cy="24" r="3" fill="#10B981" opacity="0.8"/>
    
    {/* Base stand */}
    <rect x="28" y="44" width="8" height="4" fill="currentColor" opacity="0.6"/>
    <rect x="24" y="48" width="16" height="2" fill="currentColor" opacity="0.6"/>
    
    {/* Maintenance tools */}
    <path d="M52 8 L56 4 L60 8 L56 12 Z" fill="currentColor" opacity="0.4"/>
    <rect x="54" y="6" width="8" height="1" fill="currentColor" opacity="0.4"/>
  </svg>
)

// Digital Marketing
export const MarketingIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Megaphone */}
    <path d="M12 24 L20 20 L32 20 L32 36 L20 36 L12 32 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    
    {/* Sound waves */}
    <path d="M36 16 C40 20 40 32 36 36" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M42 12 C48 18 48 34 42 40" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M48 8 C56 16 56 36 48 44" stroke="currentColor" strokeWidth="2" fill="none"/>
    
    {/* Analytics chart */}
    <rect x="8" y="44" width="48" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    <rect x="12" y="52" width="3" height="6" fill="#10B981"/>
    <rect x="18" y="50" width="3" height="8" fill="#3B82F6"/>
    <rect x="24" y="48" width="3" height="10" fill="#EF4444"/>
    <rect x="30" y="46" width="3" height="12" fill="#10B981"/>
    <rect x="36" y="49" width="3" height="9" fill="#3B82F6"/>
    
    {/* Coming Soon badge */}
    <circle cx="48" cy="16" r="8" fill="#F59E0B" opacity="0.9"/>
    <text x="48" y="20" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Soon</text>
  </svg>
)

// App Development & Maintenance
export const AppDevIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mobile phone */}
    <rect x="20" y="4" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    <rect x="24" y="8" width="16" height="28" rx="1" fill="currentColor" opacity="0.1"/>
    <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.6"/>
    
    {/* Code brackets on screen */}
    <path d="M26 16 L24 20 L26 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M38 16 L40 20 L38 24" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <rect x="28" y="19" width="8" height="2" fill="currentColor" opacity="0.4"/>
    
    {/* Tablet */}
    <rect x="8" y="20" width="20" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="12" y="24" width="12" height="16" fill="currentColor" opacity="0.1"/>
    
    {/* Desktop monitor */}
    <rect x="36" y="24" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="40" y="28" width="16" height="8" fill="currentColor" opacity="0.1"/>
    <rect x="46" y="40" width="4" height="2" fill="currentColor" opacity="0.6"/>
    
    {/* Connection lines */}
    <path d="M28 28 L36 28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    <path d="M44 24 L44 20 L44 16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
)

// Performance & SEO
export const PerformanceIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Speedometer */}
    <circle cx="32" cy="36" r="20" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    <circle cx="32" cy="36" r="16" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    
    {/* Speed indicators */}
    <path d="M20 28 L24 32" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 36 L20 36" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 44 L24 40" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 52 L32 48" stroke="currentColor" strokeWidth="2"/>
    <path d="M44 44 L40 40" stroke="currentColor" strokeWidth="2"/>
    <path d="M48 36 L44 36" stroke="currentColor" strokeWidth="2"/>
    <path d="M44 28 L40 32" stroke="currentColor" strokeWidth="2"/>
    
    {/* Needle pointing to high performance */}
    <path d="M32 36 L42 26" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="36" r="2" fill="#10B981"/>
    
    {/* SEO rocket */}
    <path d="M36 8 L40 16 L44 12 L40 20 L36 16 Z" fill="#3B82F6"/>
    <rect x="38" y="16" width="2" height="8" fill="#3B82F6" opacity="0.6"/>
    
    {/* Performance metrics */}
    <text x="32" y="44" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.6">100</text>
  </svg>
)

// Maintenance & Security
export const SecurityIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shield */}
    <path d="M32 8 L48 16 L48 32 C48 44 32 52 32 52 C32 52 16 44 16 32 L16 16 L32 8 Z" 
          stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    
    {/* Lock inside shield */}
    <rect x="28" y="26" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1"/>
    <path d="M30 26 L30 24 C30 22.9 30.9 22 32 22 C33.1 22 34 22.9 34 24 L34 26" 
          stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="32" cy="30" r="1" fill="currentColor"/>
    
    {/* Security indicators */}
    <circle cx="24" cy="20" r="2" fill="#10B981"/>
    <circle cx="40" cy="20" r="2" fill="#10B981"/>
    <circle cx="20" cy="32" r="2" fill="#10B981"/>
    <circle cx="44" cy="32" r="2" fill="#10B981"/>
    
    {/* Maintenance tools */}
    <rect x="8" y="40" width="48" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="12" y="44" width="8" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="12" y="48" width="12" height="2" fill="currentColor" opacity="0.4"/>
    <rect x="12" y="52" width="6" height="2" fill="currentColor" opacity="0.4"/>
    
    {/* Tools icon */}
    <path d="M44 44 L48 40 M48 44 L44 40" stroke="currentColor" strokeWidth="2"/>
    <circle cx="46" cy="50" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

// Retainers & Support
export const RetainerIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handshake/Partnership */}
    <path d="M8 32 L16 24 L24 32 L32 24 L40 32 L48 24 L56 32" 
          stroke="currentColor" strokeWidth="2" fill="none"/>
    
    {/* Support pillars */}
    <rect x="12" y="36" width="4" height="16" fill="currentColor" opacity="0.6"/>
    <rect x="20" y="32" width="4" height="20" fill="currentColor" opacity="0.6"/>
    <rect x="28" y="36" width="4" height="16" fill="currentColor" opacity="0.6"/>
    <rect x="36" y="28" width="4" height="24" fill="currentColor" opacity="0.6"/>
    <rect x="44" y="36" width="4" height="16" fill="currentColor" opacity="0.6"/>
    
    {/* Base platform */}
    <rect x="8" y="52" width="48" height="4" rx="2" fill="currentColor" opacity="0.3"/>
    
    {/* Growth arrows */}
    <path d="M18 20 L18 12 M14 16 L18 12 L22 16" stroke="#10B981" strokeWidth="2" fill="none"/>
    <path d="M38 20 L38 8 M34 12 L38 8 L42 12" stroke="#10B981" strokeWidth="2" fill="none"/>
    
    {/* SLA badge */}
    <circle cx="50" cy="14" r="6" fill="#3B82F6"/>
    <text x="50" y="18" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">SLA</text>
  </svg>
)

// Digital Infrastructure
export const InfrastructureIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cloud */}
    <path d="M20 24 C16 24 16 32 20 32 L44 32 C48 32 48 24 44 24 C44 20 40 16 36 16 C32 16 28 18 28 22 C24 20 20 24 20 24 Z" 
          stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    
    {/* Server racks */}
    <rect x="12" y="36" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    <rect x="28" y="40" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    <rect x="44" y="38" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    
    {/* Server indicators */}
    <circle cx="16" cy="42" r="1" fill="#10B981"/>
    <circle cx="20" cy="42" r="1" fill="#10B981"/>
    <circle cx="32" cy="46" r="1" fill="#10B981"/>
    <circle cx="36" cy="46" r="1" fill="#10B981"/>
    <circle cx="48" cy="44" r="1" fill="#10B981"/>
    <circle cx="52" cy="44" r="1" fill="#10B981"/>
    
    {/* Network connections */}
    <path d="M24 46 L28 46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    <path d="M40 48 L44 48" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    <path d="M32 32 L32 40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    <path d="M48 32 L48 38" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
    
    {/* Coming Soon badge */}
    <circle cx="48" cy="12" r="8" fill="#F59E0B" opacity="0.9"/>
    <text x="48" y="16" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Soon</text>
  </svg>
)

// IT Services
export const ITServicesIcon: React.FC<IconProps> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Headset for support */}
    <path d="M20 20 C20 12 26 8 32 8 C38 8 44 12 44 20 L44 28 L40 28 L40 24 L24 24 L24 28 L20 28 L20 20 Z" 
          stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    <rect x="16" y="24" width="6" height="8" rx="3" fill="currentColor" opacity="0.6"/>
    <rect x="42" y="24" width="6" height="8" rx="3" fill="currentColor" opacity="0.6"/>
    
    {/* Microphone */}
    <rect x="30" y="32" width="4" height="8" rx="2" fill="currentColor" opacity="0.6"/>
    <path d="M28 36 L36 36" stroke="currentColor" strokeWidth="1"/>
    
    {/* Support tickets/tasks */}
    <rect x="8" y="44" width="48" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.05"/>
    
    {/* Task items */}
    <circle cx="14" cy="50" r="2" fill="#10B981"/>
    <rect x="18" y="49" width="16" height="2" fill="currentColor" opacity="0.4"/>
    
    <circle cx="14" cy="56" r="2" fill="#3B82F6"/>
    <rect x="18" y="55" width="12" height="2" fill="currentColor" opacity="0.4"/>
    
    {/* 24/7 badge */}
    <circle cx="50" cy="12" r="8" fill="#10B981"/>
    <text x="50" y="16" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">24/7</text>
    
    {/* Coming Soon badge */}
    <circle cx="50" cy="50" r="6" fill="#F59E0B" opacity="0.9"/>
    <text x="50" y="54" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">Soon</text>
  </svg>
)
