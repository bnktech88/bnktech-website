import { generateSEO } from '@/lib/seo'
import { ArrowRight, Check, BarChart3, Search, Zap, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Performance & SEO Optimization Services | BNK Tech',
  description: 'Technical SEO audits, Core Web Vitals optimization, and performance engineering. Improve search rankings and user experience with proven strategies.',
  keywords: 'SEO optimization, Core Web Vitals, performance optimization, technical SEO, page speed, search engine optimization, Google Analytics, South Africa',
  url: '/services/performance-seo'
})

const services = [
  {
    title: 'Technical SEO Audit',
    description: 'Comprehensive analysis of your website\'s technical foundation',
    features: [
      'Core Web Vitals assessment',
      'Site structure analysis', 
      'Mobile-friendliness review',
      'Schema markup audit',
      'Internal linking analysis',
      'Crawlability assessment'
    ],
    price: 'From R8,500'
  },
  {
    title: 'Performance Optimization',
    description: 'Speed improvements that boost rankings and conversions',
    features: [
      'Image optimization & compression',
      'Code splitting & lazy loading',
      'CDN implementation',
      'Caching strategies',
      'Database optimization',
      'Third-party script audit'
    ],
    price: 'From R12,000'
  },
  {
    title: 'SEO Implementation',
    description: 'On-page optimization and content strategy execution',
    features: [
      'Keyword research & mapping',
      'Content optimization',
      'Meta tags & descriptions',
      'URL structure optimization',
      'Local SEO setup',
      'Search Console configuration'
    ],
    price: 'From R15,000'
  }
]

const metrics = [
  {
    metric: 'Page Load Speed',
    before: '4.2s average',
    after: '1.1s average',
    improvement: '74% faster'
  },
  {
    metric: 'Core Web Vitals',
    before: '23% passing',
    after: '91% passing',
    improvement: '68% improvement'
  },
  {
    metric: 'Organic Traffic',
    before: 'Baseline',
    after: '+156% increase',
    improvement: '6-month average'
  },
  {
    metric: 'Search Rankings',
    before: 'Page 3-5',
    after: 'Page 1',
    improvement: 'Top 10 results'
  }
]

const process = [
  {
    step: '01',
    title: 'Comprehensive Audit',
    description: 'Technical analysis using industry-leading tools and manual review of site architecture.',
    deliverables: ['Detailed audit report', 'Priority action list', 'Competitive analysis']
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: 'Custom optimization roadmap based on your business goals and technical constraints.',
    deliverables: ['SEO strategy document', 'Implementation timeline', 'Success metrics definition']
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Technical optimizations, content improvements, and performance enhancements.',
    deliverables: ['Code optimizations', 'Content updates', 'Technical implementations']
  },
  {
    step: '04',
    title: 'Monitoring & Reporting',
    description: 'Ongoing performance tracking with monthly reports and recommendations.',
    deliverables: ['Performance dashboards', 'Monthly reports', 'Optimization recommendations']
  }
]

const tools = [
  'Google Analytics 4', 'Search Console', 'PageSpeed Insights', 'GTmetrix',
  'Lighthouse', 'Screaming Frog', 'Semrush', 'Ahrefs'
]

const faqs = [
  {
    question: 'How long does it take to see SEO results?',
    answer: 'Performance improvements are immediate, while SEO ranking improvements typically take 3-6 months. We provide monthly reports to track progress across all metrics.'
  },
  {
    question: 'Do you guarantee first page rankings?',
    answer: 'We focus on sustainable, white-hat strategies that improve overall search visibility. While we can\'t guarantee specific rankings, we do guarantee technical improvements and performance gains.'
  },
  {
    question: 'Will performance optimization affect my website functionality?',
    answer: 'No, our optimizations are carefully tested to maintain all functionality while improving speed. We use staging environments and gradual rollouts for all changes.'
  },
  {
    question: 'What\'s included in ongoing SEO monitoring?',
    answer: 'Monthly performance reports, Core Web Vitals tracking, ranking monitoring, and quarterly strategy reviews with actionable recommendations.'
  },
  {
    question: 'Can you work with my existing website?',
    answer: 'Yes, we optimize websites built on any platform. Our approach is technology-agnostic and focuses on fundamental web performance principles.'
  }
]

export default function PerformanceSEOPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Performance & SEO Optimization
            </h1>
            <p className="text-xl md:text-2xl text-navy mb-8 text-balance">
              Technical SEO and performance engineering that drives search rankings, 
              user experience, and business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Get Free Audit
              </Link>
              <Link 
                href="/contact#proposal"
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Technical SEO Focus</h3>
              <p className="text-bnk-gold/80">Engineering-first approach to search optimization</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Core Web Vitals</h3>
              <p className="text-bnk-gold/80">Optimize for Google's ranking factors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Measurable Results</h3>
              <p className="text-bnk-gold/80">Data-driven improvements with clear ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Metrics */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Proven Performance Improvements
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Real results from recent client projects. All metrics verified and sustainable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <h3 className="text-lg font-semibold mb-4 text-navy">{item.metric}</h3>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-500">Before: {item.before}</div>
                  <div className="text-sm text-bnk-bronze font-semibold">After: {item.after}</div>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.improvement}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-navy/70 text-sm">
              Results from anonymized client projects. Individual results may vary based on starting point and industry.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              SEO & Performance Services
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Comprehensive optimization services designed for measurable business impact.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-bnk-gold/10 rounded-xl p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 text-bnk-gold">{service.title}</h3>
                  <p className="text-bnk-gold/80 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-bnk-bronze">{service.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-bnk-gold/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact#proposal"
                  className="w-full bg-bnk-bronze text-white py-3 px-6 rounded-lg font-medium hover:bg-bnk-bronze/90 transition-all duration-200 text-center block"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Our SEO & Performance Process
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Systematic approach to optimization with clear deliverables at each stage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-bnk-navy text-bnk-gold rounded-full flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-navy">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-navy">Key Deliverables:</h4>
                  <ul className="space-y-1">
                    {step.deliverables.map((deliverable, delIndex) => (
                      <li key={delIndex} className="text-gray-600 text-sm flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Analytics */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Professional SEO Tools & Analytics
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              We use industry-leading tools for accurate analysis and reporting.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <div 
                key={index}
                className="bg-bnk-gold/10 px-6 py-3 rounded-full border border-bnk-gold/20 hover:border-bnk-gold/40 transition-all duration-200"
              >
                <span className="font-medium text-bnk-gold">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              SEO & Performance FAQ
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-navy">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold mb-6 text-navy">
            Ready to Boost Your Search Performance?
          </h2>
          <p className="text-xl text-navy mb-8 max-w-2xl mx-auto">
            Get a free technical SEO audit and discover optimization opportunities for your website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact#book-call"
              className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200 inline-flex items-center justify-center"
            >
              Get Free Audit <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/contact#proposal"
              className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
