import { generateSEO } from '@/lib/seo'
import ContactForm from '@/components/sections/ContactForm'
import ContactInfo from '@/components/sections/ContactInfo'

export const metadata = generateSEO({
  title: 'Contact Us',
  description: 'Get in touch with BNK Tech for premium technology solutions. Call +27 63 068 7409 or email bnktech.net@gmail.com. Free consultation available.',
  url: '/contact'
})

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-neutral-100">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-primary-900">
              Let's Build Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 max-w-4xl mx-auto text-balance">
              Ready to transform your business with cutting-edge technology? 
              Get in touch and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </div>
  )
}
