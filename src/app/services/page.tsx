import { generateSEO } from '@/lib/seo'
import { services } from '@/content/services'
import ServiceDetail from '@/components/sections/ServiceDetail'

export const metadata = generateSEO({
  title: 'Our Services',
  description: 'Comprehensive technology services including website builds, digital infrastructure, IT services, security, and scaling support for growing businesses.',
  url: '/services'
})

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Section 1 = Bronze */}
      <section className="section-bronze py-24">
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
      <section className="section-gold py-24">
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

      {/* CTA Section - Section 3 = Bronze */}
      <section className="section-bronze py-24">
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
