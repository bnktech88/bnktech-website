'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    id: 'services-offered',
    question: 'What services does BNK Tech offer?',
    answer: 'BNK Tech specializes in web development, mobile app development, digital infrastructure, IT services, and business systems. We create everything from startup MVPs to enterprise-level solutions using modern technologies like Next.js, React, and cloud platforms.'
  },
  {
    id: 'project-timeline',
    question: 'How long does a typical web development project take?',
    answer: 'Project timelines vary based on complexity. A basic website takes 2-4 weeks, while complex applications can take 8-16 weeks. We provide detailed timelines during our free consultation and keep you updated throughout the development process.'
  },
  {
    id: 'pricing-structure',
    question: 'How does BNK Tech pricing work?',
    answer: 'We offer transparent, project-based pricing tailored to your specific needs. Costs depend on project scope, features, and timeline. We provide detailed quotes after understanding your requirements during our free consultation.'
  },
  {
    id: 'location-service',
    question: 'Do you work with clients outside South Africa?',
    answer: 'Yes! While we\'re based in South Africa, we work with clients globally. We use modern collaboration tools and maintain flexible working hours to accommodate different time zones for international projects.'
  },
  {
    id: 'technology-stack',
    question: 'What technologies do you use?',
    answer: 'We use cutting-edge technologies including Next.js, React, TypeScript, Node.js, PostgreSQL, MongoDB, and cloud platforms like Vercel and AWS. We choose the best tech stack for each project\'s specific requirements.'
  },
  {
    id: 'maintenance-support',
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Absolutely! We offer comprehensive maintenance packages including security updates, performance monitoring, feature updates, and technical support. Our goal is to ensure your digital assets continue performing optimally.'
  },
  {
    id: 'consultation-process',
    question: 'What happens during the free consultation?',
    answer: 'During our free consultation, we discuss your project goals, technical requirements, timeline, and budget. We provide expert recommendations and a detailed proposal outlining scope, deliverables, and pricing.'
  },
  {
    id: 'project-communication',
    question: 'How do you communicate during projects?',
    answer: 'We maintain regular communication through weekly progress updates, shared project dashboards, and direct access to your development team. We use tools like Slack, email, and video calls to ensure transparency.'
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const generateFAQSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
  }

  return (
    <section className="py-24 bg-white">
      {/* JSON-LD Schema for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema())
        }}
      />
      
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-navy">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-grey-600 max-w-3xl mx-auto">
            Get answers to common questions about our web development services, 
            project process, and how we can help transform your business.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item) => {
              const isOpen = openItems.has(item.id)
              
              return (
                <div
                  key={item.id}
                  className="border border-grey-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 text-left bg-grey-50 hover:bg-grey-100 transition-colors duration-200 flex items-center justify-between"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <h3 className="text-lg font-semibold text-navy pr-4">
                      {item.question}
                    </h3>
                    <ChevronDown 
                      className={`h-5 w-5 text-grey-500 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    id={`faq-answer-${item.id}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 py-4 bg-white border-t border-grey-200">
                      <p className="text-grey-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-grey-600 mb-4">
              Still have questions? We'd love to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Get Free Consultation
              </a>
              <a 
                href="tel:+27630687409" 
                className="btn-outline px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Call: +27 63 068 7409
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
