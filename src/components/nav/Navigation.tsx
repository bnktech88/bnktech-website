'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/content/site'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mobile menu interactions and dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false)
        if (servicesDropdownOpen) setServicesDropdownOpen(false)
        if (mobileServicesOpen) setMobileServicesOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node) && servicesDropdownOpen) {
        setServicesDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    if (isMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, servicesDropdownOpen, mobileServicesOpen])

  // Close dropdown on route change
  useEffect(() => {
    setServicesDropdownOpen(false)
    setMobileServicesOpen(false)
    setIsMenuOpen(false)
  }, [pathname])

  // Handle hover with timeout for smooth UX
  const handleServicesMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setServicesDropdownOpen(true)
  }

  const handleServicesMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false)
    }, 100) // Small delay to prevent flicker
  }

  const handleServicesClick = () => {
    setServicesDropdownOpen(!servicesDropdownOpen)
  }

  const handleServicesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setServicesDropdownOpen(!servicesDropdownOpen)
    } else if (e.key === 'ArrowDown' && !servicesDropdownOpen) {
      e.preventDefault()
      setServicesDropdownOpen(true)
      // Focus first dropdown item
      setTimeout(() => {
        const firstItem = servicesRef.current?.querySelector('a')
        firstItem?.focus()
      }, 0)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bnk-navy"
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={siteConfig.company.logo}
            alt="BNK Tech (PTY) LTD logo"
            width={72}
            height={72}
            className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18"
            priority
            sizes="(max-width: 640px) 44px, (max-width: 768px) 48px, (max-width: 1024px) 56px, (max-width: 1280px) 64px, 72px"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navigation.map((item) => {
            const hasSubmenu = 'submenu' in item
            const isActive = pathname === item.href || (hasSubmenu && pathname.startsWith('/services'))
            
            if (hasSubmenu) {
              return (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    onClick={handleServicesClick}
                    onKeyDown={handleServicesKeyDown}
                    className={cn(
                      'flex items-center gap-1 text-sm font-medium transition-colors text-bnk-gold hover:text-bnk-bronze focus:outline-none focus:ring-2 focus:ring-bnk-bronze/30 rounded',
                      isActive ? 'border-b-2 border-bnk-bronze' : ''
                    )}
                    aria-haspopup="menu"
                    aria-expanded={servicesDropdownOpen}
                    aria-controls="services-menu"
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      servicesDropdownOpen ? 'rotate-180' : ''
                    )} />
                  </button>
                  
                  {servicesDropdownOpen && (
                    <div 
                      id="services-menu"
                      className="absolute top-full left-0 mt-2 w-56 bg-bnk-navy shadow-xl rounded-lg border border-bnk-gold/20 py-2 z-50"
                      role="menu"
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-bnk-gold hover:text-bnk-bronze hover:bg-bnk-gold/10 transition-colors focus:outline-none focus:bg-bnk-gold/10 focus:text-bnk-bronze"
                        role="menuitem"
                      >
                        All Services
                      </Link>
                      <div className="h-px bg-bnk-gold/20 mx-2 my-1" />
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            'block px-4 py-2 text-sm transition-colors hover:bg-bnk-gold/10 focus:outline-none focus:bg-bnk-gold/10',
                            pathname === subItem.href
                              ? 'text-bnk-bronze bg-bnk-gold/10'
                              : 'text-bnk-gold hover:text-bnk-bronze focus:text-bnk-bronze'
                          )}
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors text-bnk-gold hover:text-bnk-bronze',
                  pathname === item.href
                    ? 'border-b-2 border-bnk-bronze'
                    : ''
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/contact#book-call" 
            className="bg-bnk-bronze hover:bg-bnk-gold text-bnk-navy px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            Book a 15-min Call
          </Link>
          <Link 
            href="/contact#proposal" 
            className="border border-bnk-bronze text-bnk-bronze hover:bg-bnk-bronze hover:text-bnk-navy px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            Request Proposal
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-bnk-gold hover:text-bnk-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bnk-bronze/30 rounded"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span
              className={cn(
                'block h-0.5 w-6 bg-current transition-all duration-300 origin-center',
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 bg-current transition-all duration-300',
                isMenuOpen ? 'opacity-0' : ''
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 bg-current transition-all duration-300 origin-center',
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden bg-bnk-navy shadow-lg"
        >
          <div className="container py-6 space-y-4">
            {siteConfig.navigation.map((item) => {
              const hasSubmenu = 'submenu' in item
              
              if (hasSubmenu) {
                return (
                  <div key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={cn(
                          'flex-1 py-3 text-base font-medium transition-colors rounded-lg px-3 text-bnk-gold',
                          pathname === item.href || pathname.startsWith('/services')
                            ? 'border-l-4 border-bnk-bronze'
                            : 'hover:text-bnk-bronze'
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-3 text-bnk-gold hover:text-bnk-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bnk-bronze/30 rounded"
                        aria-expanded={mobileServicesOpen}
                        aria-label={mobileServicesOpen ? 'Close services menu' : 'Open services menu'}
                      >
                        <ChevronDown className={cn(
                          'w-4 h-4 transition-transform',
                          mobileServicesOpen ? 'rotate-180' : ''
                        )} />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block py-2 text-sm transition-colors rounded-lg px-3',
                              pathname === subItem.href
                                ? 'text-bnk-bronze bg-bnk-gold/10 border-l-2 border-bnk-bronze'
                                : 'text-bnk-gold/80 hover:text-bnk-bronze hover:bg-bnk-gold/5'
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block py-3 text-base font-medium transition-colors rounded-lg px-3 text-bnk-gold',
                    pathname === item.href
                      ? 'border-l-4 border-bnk-bronze'
                      : 'hover:text-bnk-bronze'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 space-y-3">
              <Link
                href="/contact#book-call"
                className="bg-bnk-bronze hover:bg-bnk-gold text-bnk-navy px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full flex justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a 15-min Call
              </Link>
              <Link
                href="/contact#proposal"
                className="border border-bnk-bronze text-bnk-bronze hover:bg-bnk-bronze hover:text-bnk-navy px-6 py-3 rounded-lg font-medium transition-all duration-200 w-full flex justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Request Proposal
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
