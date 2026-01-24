'use client'

import { Calendar, MessageCircle, Mail, Clock } from 'lucide-react'
import { siteConfig } from '@/content/site'

// Client-side event tracking function
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // GA4 tracking (when implemented)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }
  
  // Console log for development
  console.log('Event tracked:', eventName, properties)
}

export default function BookingSection() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#'
  
  const handleBookCallClick = () => {
    trackEvent('book_call_click', {
      source: 'contact_page',
      button_location: 'booking_section'
    })
    
    if (calendlyUrl === '#') {
      alert('Calendly integration coming soon. Please use the contact form or call directly.')
      return
    }
    
    // Open Calendly in a new window
    window.open(calendlyUrl, '_blank', 'width=800,height=700')
  }
  
  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      source: 'contact_page',
      button_location: 'booking_section'
    })
    
    const message = encodeURIComponent(
      "Hi BNK Tech! I'm interested in discussing a high-performance website project. Can we schedule a quick consultation?"
    )
    const whatsappUrl = `https://wa.me/${siteConfig.company.whatsapp}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }
  
  return (
    <section id="book-call" className="bg-bnk-navy py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-bnk-gold">
            Book Your Free 15-Minute Consultation
          </h2>
          <p className="text-xl text-bnk-gold/80 max-w-3xl mx-auto text-balance">
            Let's discuss your project and see if we're a good fit. No sales pitch, 
            just honest technical guidance about your options.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-bnk-gold/10 rounded-xl p-8 text-center border border-bnk-gold/20">
            <div className="w-12 h-12 bg-bnk-bronze rounded-lg flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-6 h-6 text-bnk-navy" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-bnk-gold">
              Schedule a Call
            </h3>
            <p className="text-bnk-gold/80 mb-6">
              Pick a time that works for you. We'll discuss your project requirements 
              and technical approach.
            </p>
            <button
              onClick={handleBookCallClick}
              className="w-full bg-bnk-bronze text-white py-3 px-6 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200"
            >
              Book 15-Min Call
            </button>
          </div>
          
          <div className="bg-bnk-gold/10 rounded-xl p-8 text-center border border-bnk-gold/20">
            <div className="w-12 h-12 bg-bnk-bronze rounded-lg flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-6 h-6 text-bnk-navy" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-bnk-gold">
              WhatsApp Chat
            </h3>
            <p className="text-bnk-gold/80 mb-6">
              Prefer quick messages? Start a WhatsApp conversation 
              for immediate responses to your questions.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
            >
              Start WhatsApp Chat
            </button>
          </div>
          
          <div className="bg-bnk-gold/10 rounded-xl p-8 text-center border border-bnk-gold/20">
            <div className="w-12 h-12 bg-bnk-bronze rounded-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6 text-bnk-navy" />
            </div>
            <h3 className="text-xl font-semibent mb-4 text-bnk-gold">
              Detailed Proposal
            </h3>
            <p className="text-bnk-gold/80 mb-6">
              Need a comprehensive project quote? Use our detailed form 
              below for custom proposals.
            </p>
            <a
              href="#proposal"
              className="w-full bg-bnk-gold text-bnk-navy py-3 px-6 rounded-lg font-medium hover:bg-bnk-gold/90 transition-all duration-200 inline-block"
            >
              Request Proposal
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-bnk-gold/5 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-bnk-bronze mr-2" />
              <span className="text-bnk-gold font-medium">Quick Response Times</span>
            </div>
            <p className="text-bnk-gold/80 text-sm">
              Calls: Within 24 hours | WhatsApp: Within 2 hours | Proposals: Within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
