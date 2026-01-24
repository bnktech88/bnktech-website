import { generateSEO } from '@/lib/seo'
import { ArrowRight, Check, Clock, Users, Headphones, Star, Calendar, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Development Retainers & Technical Support | BNK Tech',
  description: 'Dedicated technical partnership with priority support, ongoing development, and strategic technology guidance. Retainer packages with clear SLAs for growing businesses.',
  keywords: 'development retainer, technical support, ongoing development, priority support, technical partnership, SLA, South Africa',
  url: '/services/retainers'
})

const retainerTiers = [
  {
    name: 'Starter',
    price: 'R8,500',
    period: '/month',
    hours: '10 hours',
    description: 'Perfect for small businesses with occasional development needs',
    responseTime: '48 hours',
    features: [
      '10 development hours per month',
      'Email & call support',
      'Basic priority queue',
      'Monthly usage reports',
      'Rollover up to 5 hours',
      'Standard business hours support',
      'Technical consultation included'
    ],
    ideal: 'Small businesses, startups, maintenance-focused needs'
  },
  {
    name: 'Growth',
    price: 'R18,500',
    period: '/month',
    hours: '25 hours',
    description: 'Ideal for growing businesses with regular development requirements',
    responseTime: '24 hours',
    features: [
      '25 development hours per month',
      'Priority email & call support',
      'Enhanced priority queue',
      'Bi-weekly status meetings',
      'Rollover up to 10 hours',
      'Extended business hours support',
      'Strategic planning sessions',
      'Performance monitoring included',
      'Minor emergency support'
    ],
    popular: true,
    ideal: 'Scale-ups, regular feature development, growing websites'
  },
  {
    name: 'Priority',
    price: 'R35,000',
    period: '/month',
    hours: '50 hours',
    description: 'Comprehensive support for mission-critical applications',
    responseTime: '4 hours',
    features: [
      '50 development hours per month',
      'Dedicated priority support',
      'Top priority queue',
      'Weekly strategy sessions',
      'Rollover up to 20 hours',
      'Extended hours & emergency support',
      'Dedicated project coordination',
      'Advanced monitoring & reporting',
      'Architecture consultation',
      'Priority incident response',
      'Custom integrations included'
    ],
    ideal: 'Enterprise clients, high-traffic sites, complex applications'
  }
]

const included = [
  {
    category: 'Development',
    items: [
      'Feature development & enhancements',
      'Bug fixes & troubleshooting', 
      'Performance optimization',
      'Security updates & patches',
      'Third-party integrations',
      'Code reviews & optimization'
    ]
  },
  {
    category: 'Support',
    items: [
      'Technical consultation calls',
      'Architecture planning',
      'Strategic technology guidance',
      'Best practices implementation',
      'Documentation updates',
      'Training & knowledge transfer'
    ]
  },
  {
    category: 'Monitoring',
    items: [
      'Performance tracking',
      'Security monitoring',
      'Uptime monitoring',
      'Error tracking & alerting',
      'Usage analytics',
      'Monthly health reports'
    ]
  }
]

const notIncluded = [
  'Major redesigns or rebuilds',
  'Large-scale migrations',
  'Content creation & copywriting',
  'Design work (UI/UX design)',
  'Third-party service costs',
  'Hardware or server costs',
  'Training for non-technical users'
]

const workflow = [
  {
    step: '01',
    title: 'Request Submission',
    description: 'Submit requests via our client portal or direct communication channels.',
    icon: Target
  },
  {
    step: '02',
    title: 'Priority Assessment',
    description: 'We assess and prioritize based on urgency, impact, and your retainer tier.',
    icon: Star
  },
  {
    step: '03',
    title: 'Development & Updates',
    description: 'Work begins within SLA timeframes with regular progress updates.',
    icon: Users
  },
  {
    step: '04',
    title: 'Review & Reporting',
    description: 'Completed work review and monthly usage reporting with insights.',
    icon: Calendar
  }
]

const slaTable = [
  {
    category: 'Critical Issues',
    starter: '24 hours',
    growth: '12 hours', 
    priority: '4 hours',
    examples: 'Site down, security breaches, payment failures'
  },
  {
    category: 'High Priority',
    starter: '48 hours',
    growth: '24 hours',
    priority: '12 hours', 
    examples: 'Performance issues, broken functionality, urgent fixes'
  },
  {
    category: 'Standard Requests',
    starter: '72 hours',
    growth: '48 hours',
    priority: '24 hours',
    examples: 'New features, enhancements, optimization tasks'
  },
  {
    category: 'Low Priority',
    starter: '1 week',
    growth: '72 hours',
    priority: '48 hours',
    examples: 'Nice-to-have features, documentation, minor tweaks'
  }
]

const faqs = [
  {
    question: 'How do retainer hours work?',
    answer: 'Your monthly hours are available for any development or support work. Unused hours roll over up to the specified limit. Hours are tracked transparently with detailed monthly reports.'
  },
  {
    question: 'What happens if I need more hours than my retainer includes?',
    answer: 'Additional hours can be purchased at a discounted rate. We\'ll always get approval before exceeding your monthly allocation and can recommend upgrading if you consistently need more hours.'
  },
  {
    question: 'Can I pause or cancel my retainer?',
    answer: 'Retainers can be paused with 30 days notice. Any rollover hours are preserved during short pauses. Cancellation requires 60 days notice to ensure smooth transition.'
  },
  {
    question: 'Do you provide emergency support?',
    answer: 'Growth and Priority tiers include emergency support for critical issues. Response times depend on your tier and the severity of the issue.'
  },
  {
    question: 'How do you handle project planning and communication?',
    answer: 'Each retainer includes regular check-ins, project planning, and transparent communication. Higher tiers get dedicated project coordination and strategic planning sessions.'
  }
]

export default function RetainersPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Development Retainers & Technical Partnership
            </h1>
            <p className="text-xl md:text-2xl text-navy mb-8 text-balance">
              Dedicated technical support with clear SLAs, priority access, 
              and strategic guidance for growing businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Discuss Your Needs
              </Link>
              <Link 
                href="/contact#proposal"
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                Get Custom Quote
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
                <Clock className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Priority Access</h3>
              <p className="text-bnk-gold/80">Jump the queue with guaranteed response times</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Dedicated Partnership</h3>
              <p className="text-bnk-gold/80">Consistent team that knows your business</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Strategic Guidance</h3>
              <p className="text-bnk-gold/80">Technology planning and architecture advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Retainer Tiers */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Retainer Tiers & Pricing
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Predictable costs with transparent hour tracking and clear SLA commitments.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {retainerTiers.map((tier, index) => (
              <div 
                key={index}
                className={`relative bg-white rounded-xl p-8 shadow-lg ${tier.popular ? 'ring-4 ring-bnk-navy' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-bnk-navy text-bnk-gold px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-navy">{tier.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold text-bnk-bronze">{tier.price}</span>
                    <span className="text-gray-600 ml-1">{tier.period}</span>
                  </div>
                  <div className="bg-bnk-navy text-bnk-gold px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {tier.hours} included
                  </div>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tier.responseTime} response
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-navy mb-2">Ideal For:</h4>
                  <p className="text-gray-600 text-sm">{tier.ideal}</p>
                </div>
                
                <Link
                  href="/contact#proposal"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 text-center block ${
                    tier.popular
                      ? 'bg-bnk-navy text-bnk-gold hover:bg-bnk-navy/90'
                      : 'bg-bnk-bronze text-white hover:bg-bnk-bronze/90'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              What's Included
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Comprehensive coverage for all your technical development and support needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {included.map((section, index) => (
              <div key={index} className="bg-bnk-gold/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-6 text-bnk-gold">{section.category}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <Check className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-bnk-gold/80 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="bg-bnk-gold/5 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-bnk-gold">Not Included (Available Separately):</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {notIncluded.map((item, index) => (
                <div key={index} className="flex items-center text-bnk-gold/70 text-sm">
                  <div className="w-2 h-2 bg-bnk-bronze rounded-full mr-3 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SLA Table */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Service Level Agreements (SLA)
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Clear response time commitments based on priority level and retainer tier.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-bnk-navy text-bnk-gold">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Issue Type</th>
                  <th className="px-6 py-4 text-center font-semibold">Starter</th>
                  <th className="px-6 py-4 text-center font-semibold">Growth</th>
                  <th className="px-6 py-4 text-center font-semibold">Priority</th>
                  <th className="px-6 py-4 text-left font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {slaTable.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-navy">{row.category}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.starter}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.growth}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.priority}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              How Retainers Work
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Streamlined workflow designed for efficiency and transparency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-bnk-navy" />
                </div>
                <div className="bg-bnk-navy text-bnk-gold px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-bnk-gold">{step.title}</h3>
                <p className="text-bnk-gold/80">{step.description}</p>
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
              Retainer FAQ
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
            Ready for Dedicated Technical Partnership?
          </h2>
          <p className="text-xl text-navy mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and find the right retainer tier for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact#book-call"
              className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200 inline-flex items-center justify-center"
            >
              Discuss Your Needs <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/contact#proposal"
              className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
