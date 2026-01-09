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
      {/* Hero Section */}
      <section className="py-24 bg-neutral-100">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-primary-900">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 max-w-4xl mx-auto text-balance">
              Comprehensive technology solutions designed to accelerate your business growth 
              and digital transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-neutral-50">
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

      {/* CTA Section */}
      <section className="py-24 bg-primary-950 text-neutral-100">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6 text-accent-400">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Let's discuss which services align with your business goals and create a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-accent-600 hover:bg-accent-700 text-primary-950 px-8 py-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent-600/20">
              Get Free Consultation
            </a>
            <a href="tel:+27630687409" className="border-2 border-accent-600 text-accent-400 hover:bg-accent-600 hover:text-primary-950 px-8 py-4 rounded-lg font-medium transition-all duration-200">
              Call Now: +27 63 068 7409
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
