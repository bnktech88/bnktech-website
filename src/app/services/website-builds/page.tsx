import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { ArrowRight, Check, Clock, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Website Builds & Maintenance - High-Performance Web Development | BNK Tech',
  description: 'Professional website development and maintenance services with sub-2 second load times. From SME websites to enterprise platforms using Next.js, TypeScript, and ongoing maintenance packages.',
  keywords: 'website development, web maintenance, Next.js development, TypeScript, e-commerce, progressive web apps, SEO optimization, website maintenance, South Africa',
  url: '/services/website-builds'
})

const packages = [
  {
    name: 'Starter',
    price: 'R5,000 - R7,000',
    description: 'Perfect for small businesses and startups',
    features: [
      '3-5 page responsive website',
      'Mobile optimization',
      'Basic SEO setup',
      'Contact form integration',
      'SSL certificate',
      'Google Analytics setup'
    ]
  },
  {
    name: 'Pro',
    price: 'R8,000 - R12,000',
    description: 'Comprehensive solution for growing businesses',
    features: [
      'Up to 10 pages',
      'Custom design & branding',
      'Advanced SEO optimization',
      'CMS integration',
      'E-commerce capability',
      'Performance optimization',
      'Social media integration'
    ],
    recommended: true
  },
  {
    name: 'Premium',
    price: 'R15,000+',
    description: 'Scalable solutions for established businesses',
    features: [
      'Unlimited pages',
      'Custom functionality',
      'Advanced e-commerce',
      'Multi-language support',
      'Advanced integrations',
      'Performance & security optimization',
      'Training & documentation'
    ]
  }
]

const maintenancePackage = {
  name: 'Maintenance',
  price: 'From R1,500/month',
  description: 'Keep your website secure, updated, and performing optimally',
  features: [
    'Regular security updates',
    'Content updates & backups',
    'Performance monitoring',
    'Priority technical support',
    'Monthly reports',
    'Emergency fixes'
  ]
}

const process = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'Requirements gathering, competitor analysis, and technical planning session.',
    duration: '1-2 weeks'
  },
  {
    step: '02', 
    title: 'Design & Prototyping',
    description: 'UI/UX design, wireframes, and interactive prototypes for approval.',
    duration: '2-3 weeks'
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Frontend/backend coding, quality assurance, and performance testing.',
    duration: '4-8 weeks'
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'Deployment, SEO setup, analytics configuration, and optimization.',
    duration: '1-2 weeks'
  }
]

const techStack = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 
  'Stripe', 'Resend', 'Google Analytics', 'Search Console'
]

const faqs = [
  {
    question: 'How long does a typical website build take?',
    answer: 'Most projects take 6-12 weeks from start to finish, depending on complexity. We provide detailed timelines during the discovery phase.'
  },
  {
    question: 'Do you provide ongoing maintenance?',
    answer: 'Yes, all packages include initial support. We also offer monthly maintenance retainers starting at R1,500/month for ongoing updates and security.'
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer: 'Absolutely. All our websites are built mobile-first and fully responsive across all devices and screen sizes.'
  },
  {
    question: 'Can you help with content creation?',
    answer: 'We focus on technical development but can recommend trusted copywriters and designers. We help integrate all content seamlessly.'
  },
  {
    question: 'What about SEO and search rankings?',
    answer: 'Technical SEO is built-in with our performance-first approach. We also offer dedicated SEO services for content optimization and link building.'
  }
]

export default function WebsiteBuildsPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Website Builds & Maintenance',
    description: 'Professional website development and maintenance services with sub-2 second load times. From SME websites to enterprise platforms using Next.js, TypeScript, and ongoing maintenance packages.',
    url: '/services/website-builds',
    price: 'From R5,000',
    features: [
      'Responsive website design',
      'Performance optimization',
      'SEO setup',
      'CMS integration',
      'E-commerce capability',
      'SSL certificate',
      'Google Analytics setup',
      'Ongoing maintenance packages'
    ]
  })

  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Website Builds & Maintenance', url: '/services/website-builds' }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Website Builds & Maintenance
            </h1>
            <p className="text-xl md:text-2xl text-navy mb-8 text-balance">
              Professional websites engineered for speed, conversion, and growth. 
              Sub-2 second load times guaranteed, plus ongoing maintenance packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Book Discovery Call
              </Link>
              <Link 
                href="/work"
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Promise */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Sub-2 Second Load Times</h3>
              <p className="text-bnk-gold/80">Optimized for Core Web Vitals and user experience</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Conversion-Focused</h3>
              <p className="text-bnk-gold/80">Designed to turn visitors into customers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Future-Proof</h3>
              <p className="text-bnk-gold/80">Built with modern tech stack for scalability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Choose Your Package
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. All packages include mobile optimization and basic SEO.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-xl p-8 shadow-lg ${pkg.recommended ? 'ring-4 ring-bnk-navy' : ''}`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-bnk-navy text-bnk-gold px-4 py-2 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-navy">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-bnk-bronze mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact#proposal"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 text-center block ${
                    pkg.recommended
                      ? 'bg-bnk-navy text-bnk-gold hover:bg-bnk-navy/90'
                      : 'bg-bnk-bronze text-white hover:bg-bnk-bronze/90'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Maintenance Package */}
          <div className="max-w-md mx-auto">
            <div className="bg-bnk-navy rounded-xl p-8 shadow-lg text-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-bnk-gold">{maintenancePackage.name}</h3>
                <div className="text-3xl font-bold text-bnk-bronze mb-2">{maintenancePackage.price}</div>
                <p className="text-bnk-gold/80">{maintenancePackage.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8 text-left">
                {maintenancePackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-bnk-bronze mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-bnk-gold">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/contact#proposal"
                className="w-full py-3 px-6 bg-bnk-bronze text-white rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200 text-center block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Our Development Process
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              A proven methodology that delivers results on time and within budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-bnk-navy">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-bnk-gold">{step.title}</h3>
                <p className="text-bnk-gold/80 mb-2">{step.description}</p>
                <div className="text-sm text-bnk-bronze font-medium">{step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              We use cutting-edge technologies to ensure your website is fast, secure, and scalable.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="bg-white px-6 py-3 rounded-full shadow-md border-2 border-bnk-navy/10 hover:border-bnk-navy/30 transition-all duration-200"
              >
                <span className="font-medium text-navy">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-bnk-gold/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-bnk-gold">{faq.question}</h3>
                <p className="text-bnk-gold/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6 text-navy">
            Ready to Build Your High-Performance Website?
          </h2>
          <p className="text-xl text-navy mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a website that drives real business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact#book-call"
              className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200 inline-flex items-center justify-center"
            >
              Book a 15-min Call <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/contact#proposal"
              className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
            >
              Request Proposal
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
