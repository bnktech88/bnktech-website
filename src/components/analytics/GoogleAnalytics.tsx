'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// Event tracking functions for client-side usage
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters)
    }
  } catch (error) {
    // Silently handle analytics blocking (adblockers, etc.)
    console.debug('Analytics tracking blocked or failed:', eventName)
  }
}

export const trackPageView = (url: string, title?: string) => {
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
        page_title: title,
      })
    }
  } catch (error) {
    // Silently handle analytics blocking (adblockers, etc.)
    console.debug('Page view tracking blocked or failed:', url)
  }
}

// Specific event tracking for the upgrade
export const trackContactSubmit = () => {
  trackEvent('contact_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
  })
}

export const trackBookCallClick = (source: string) => {
  trackEvent('book_call_click', {
    event_category: 'engagement',
    event_label: 'book_call',
    source,
  })
}

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement', 
    event_label: 'whatsapp',
    source,
  })
}
