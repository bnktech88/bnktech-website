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
      <section className="py-24 bg-grey-100">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-grey-700 max-w-4xl mx-auto text-balance">
              Comprehensive technology solutions designed to accelerate your business growth 
              and digital transformation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
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
      <section className="py-24 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-grey-300 mb-8 max-w-2xl mx-auto">
            Let's discuss which services align with your business goals and create a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary bg-white text-black hover:bg-grey-100">
              Get Free Consultation
            </a>
            <a href="tel:+27630687409" className="btn btn-outline border-white text-white hover:bg-white hover:text-black">
              Call Now: +27 63 068 7409
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
