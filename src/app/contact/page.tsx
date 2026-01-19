import { generateSEO } from '@/lib/seo'
import ContactForm from '@/components/sections/ContactForm'
import ContactInfo from '@/components/sections/ContactInfo'

export const metadata = generateSEO({
  title: 'Contact BNK Tech - Free Consultation for Web Development Projects',
  description: 'Ready to start your project? Contact BNK Tech for expert web development, mobile apps, and IT services in South Africa. Call +27 63 068 7409 or get free consultation online.',
  keywords: 'contact BNK Tech, web development consultation, software development quote, mobile app consultation, IT services inquiry, South Africa developers contact, free consultation',
  url: '/contact'
})

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section - Section 1 = Bronze */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Let's Build Something Amazing
            </h1>
            <p className="text-xl md:text-2xl text-navy max-w-4xl mx-auto text-balance">
              Ready to transform your business with cutting-edge technology? 
              Get in touch and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info - Section 2 = Gold */}
      <section className="bg-bnk-gold py-24">
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
