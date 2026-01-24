import { generateSEO, generateBreadcrumbSchema } from '@/lib/seo'
import { siteConfig } from '@/content/site'
import BookingSection from '@/components/sections/BookingSection'
import ContactForm from '@/components/sections/ContactForm'
import ContactInfo from '@/components/sections/ContactInfo'

export const metadata = generateSEO({
  title: 'Contact BNK Tech - Book a 15-min Call or Request Proposal',
  description: 'Ready to scale your business? Book a 15-minute consultation call or request a custom proposal. High-performance websites + engineering support for growing businesses.',
  keywords: 'book consultation call, web development quote, high performance websites, engineering support, technical consultation, South Africa developers',
  url: '/contact'
})

export default function ContactPage() {
  // Generate LocalBusiness schema for contact page
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    name: siteConfig.company.name,
    description: 'Professional web development and digital infrastructure services in South Africa. High-performance websites, ongoing maintenance, and technical consultation.',
    url: `https://${siteConfig.company.domain}`,
    telephone: siteConfig.company.phone,
    email: siteConfig.company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
      addressRegion: 'Gauteng'
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.company.phone,
      email: siteConfig.company.email,
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    priceRange: 'R5000-R50000',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer'
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-20">
      {/* Hero Section - Section 1 = Bronze */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Ready to Scale Your Business?
            </h1>
            <p className="text-xl md:text-2xl text-navy max-w-4xl mx-auto text-balance">
              Book a 15-minute consultation or request a custom proposal. 
              High-performance websites + ongoing engineering support.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <BookingSection />

      {/* Contact Form & Info - Section 2 = Gold */}
      <section id="proposal" className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-navy">
              Request Custom Proposal
            </h2>
            <p className="text-xl text-navy max-w-3xl mx-auto text-balance">
              Tell us about your project requirements and we'll provide a detailed 
              proposal with transparent pricing and clear timelines.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
