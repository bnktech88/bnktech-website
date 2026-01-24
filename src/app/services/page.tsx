import { generateSEO } from '@/lib/seo'
import { services } from '@/content/services'
import { articles } from '@/content/articles'
import ServiceDetail from '@/components/sections/ServiceDetail'
import FAQ from '@/components/sections/FAQ'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

export const metadata = generateSEO({
  title: 'Web Development & IT Services - BNK Tech South Africa',
  description: 'Professional web development, mobile apps, digital infrastructure, and IT services in South Africa. From startup MVPs to enterprise solutions. Get expert consultation today.',
  keywords: 'web development services, mobile app development, IT services South Africa, digital infrastructure, business systems, e-commerce development, progressive web apps, software consulting',
  url: '/services'
})

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Section 1 = Bronze */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-navy max-w-4xl mx-auto text-balance">
              Comprehensive technology solutions designed to accelerate your business growth 
              and digital transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services - Section 2 = Gold */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <ServiceDetail 
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section - Section 3 = Bronze */}
      <section className="bg-bnk-bronze py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6 text-navy">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-navy mb-8 max-w-2xl mx-auto">
            Let's discuss which services align with your business goals and create a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary px-8 py-4 rounded-lg font-medium transition-all duration-200">
              Get Free Consultation
            </a>
            <a href="tel:+27630687409" className="btn-outline px-8 py-4 rounded-lg font-medium transition-all duration-200">
              Call Now: +27 63 068 7409
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
