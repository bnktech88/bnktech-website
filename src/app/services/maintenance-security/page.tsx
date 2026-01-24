import { generateSEO } from '@/lib/seo'
import { ArrowRight, Check, Shield, Clock, AlertTriangle, Server, Lock, Monitor } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateSEO({
  title: 'Website Maintenance & Security Services | BNK Tech',
  description: 'Proactive website maintenance, security monitoring, and incident response. Keep your website secure, updated, and performing optimally with professional support.',
  keywords: 'website maintenance, security monitoring, website security, backup services, incident response, website support, South Africa',
  url: '/services/maintenance-security'
})

const securityFeatures = [
  {
    icon: Shield,
    title: 'Security Monitoring',
    description: 'Real-time threat detection and vulnerability scanning',
    features: [
      'Daily security scans',
      'Malware detection',
      'SSL certificate monitoring',
      'Security headers audit',
      'Firewall configuration'
    ]
  },
  {
    icon: Server,
    title: 'System Maintenance',
    description: 'Proactive updates and performance optimization',
    features: [
      'Core system updates',
      'Plugin/dependency updates',
      'Performance monitoring',
      'Database optimization',
      'Cache management'
    ]
  },
  {
    icon: Lock,
    title: 'Backup & Recovery',
    description: 'Automated backups with quick recovery options',
    features: [
      'Daily automated backups',
      'Multiple backup locations',
      'Quick restore procedures',
      'Data integrity checks',
      'Disaster recovery planning'
    ]
  }
]

const packages = [
  {
    name: 'Essential',
    price: 'R2,500',
    period: '/month',
    description: 'Basic maintenance for small websites',
    features: [
      'Weekly security scans',
      'Monthly system updates',
      'Daily backups (30-day retention)',
      'Basic performance monitoring',
      'Email support (48h response)',
      'Monthly status report'
    ],
    responseTime: '48 hours'
  },
  {
    name: 'Professional',
    price: 'R4,500',
    period: '/month',
    description: 'Comprehensive care for business websites',
    features: [
      'Daily security monitoring',
      'Bi-weekly system updates',
      'Daily backups (90-day retention)',
      'Advanced performance monitoring',
      'Priority email/call support (24h response)',
      'Bi-weekly status reports',
      'Minor content updates included',
      'SSL certificate management'
    ],
    responseTime: '24 hours',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'R8,500',
    period: '/month',
    description: 'Mission-critical support for high-traffic sites',
    features: [
      'Real-time security monitoring',
      'Weekly system updates',
      'Hourly backups (365-day retention)',
      'Advanced performance optimization',
      'Dedicated support (4h response)',
      'Weekly detailed reports',
      'Content updates included',
      'Priority incident response',
      'Custom security configuration'
    ],
    responseTime: '4 hours'
  }
]

const incidentResponse = [
  {
    step: '01',
    title: 'Detection & Assessment',
    description: 'Immediate notification and rapid assessment of security incidents or system issues.',
    timeframe: '< 1 hour'
  },
  {
    step: '02',
    title: 'Containment',
    description: 'Quick isolation of affected systems to prevent further damage or data loss.',
    timeframe: '< 2 hours'
  },
  {
    step: '03',
    title: 'Investigation & Fix',
    description: 'Thorough analysis of root cause and implementation of comprehensive solution.',
    timeframe: '2-24 hours'
  },
  {
    step: '04',
    title: 'Recovery & Prevention',
    description: 'System restoration with enhanced security measures to prevent recurrence.',
    timeframe: 'Ongoing'
  }
]

const securityMeasures = [
  'Web Application Firewall (WAF)',
  'DDoS Protection',
  'Malware Scanning',
  'Vulnerability Assessment',
  'Security Headers',
  'SSL/TLS Certificates',
  'Access Control',
  'Activity Monitoring'
]

const faqs = [
  {
    question: 'What happens if my website gets hacked?',
    answer: 'We provide immediate incident response within our SLA timeframes. This includes containment, malware removal, security patching, and restoration from clean backups. We also implement additional security measures to prevent future incidents.'
  },
  {
    question: 'How often do you backup my website?',
    answer: 'Backup frequency varies by package: Essential (daily), Professional (daily), Enterprise (hourly). All backups are stored in multiple secure locations with integrity checking.'
  },
  {
    question: 'Can you maintain websites you didn\'t build?',
    answer: 'Yes, we can maintain websites built by others. We start with a comprehensive audit to understand the current setup and identify any security or performance issues.'
  },
  {
    question: 'What\'s included in system updates?',
    answer: 'We update core systems, frameworks, plugins, dependencies, and security patches. All updates are tested on staging environments first to ensure compatibility.'
  },
  {
    question: 'Do you provide emergency support outside business hours?',
    answer: 'Professional and Enterprise packages include emergency support for critical security incidents. Response times depend on the severity and your package level.'
  }
]

export default function MaintenanceSecurityPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-bnk-bronze py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-navy">
              Website Maintenance & Security
            </h1>
            <p className="text-xl md:text-2xl text-navy mb-8 text-balance">
              Proactive protection and maintenance to keep your website secure, 
              updated, and performing at its best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call"
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Get Security Audit
              </Link>
              <Link 
                href="/contact#proposal"
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Promise */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Proactive Protection</h3>
              <p className="text-bnk-gold/80">Prevent issues before they impact your business</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">Rapid Response</h3>
              <p className="text-bnk-gold/80">Quick incident response with clear SLAs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-bnk-navy" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-bnk-gold">24/7 Monitoring</h3>
              <p className="text-bnk-gold/80">Continuous monitoring with automated alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Comprehensive Security & Maintenance
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Multi-layered approach to website security and performance maintenance.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-bnk-navy rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-bnk-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-navy">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Packages */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Maintenance Packages
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Choose the level of support that matches your website's importance to your business.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`relative bg-bnk-gold/10 rounded-xl p-8 ${pkg.popular ? 'ring-4 ring-bnk-bronze' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-bnk-bronze text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-bnk-gold">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold text-bnk-bronze">{pkg.price}</span>
                    <span className="text-bnk-gold/80 ml-1">{pkg.period}</span>
                  </div>
                  <p className="text-bnk-gold/80 mb-4">{pkg.description}</p>
                  <div className="bg-bnk-bronze/20 text-bnk-bronze px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.responseTime} response
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-bnk-gold/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact#proposal"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 text-center block ${
                    pkg.popular
                      ? 'bg-bnk-bronze text-white hover:bg-bnk-bronze/90'
                      : 'bg-bnk-gold text-bnk-navy hover:bg-bnk-gold/90'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="bg-bnk-gold py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-navy">
              Security Incident Response
            </h2>
            <p className="text-xl text-navy max-w-2xl mx-auto">
              Rapid response protocol to minimize damage and restore your website quickly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {incidentResponse.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bnk-navy rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-bnk-gold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-navy">{step.title}</h3>
                <p className="text-navy/80 mb-3">{step.description}</p>
                <div className="bg-bnk-bronze text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {step.timeframe}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Technologies */}
      <section className="bg-bnk-navy py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-6 text-bnk-gold">
              Security Technologies & Standards
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-2xl mx-auto">
              Enterprise-grade security tools and industry best practices.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {securityMeasures.map((measure, index) => (
              <div 
                key={index}
                className="bg-bnk-gold/10 px-6 py-3 rounded-full border border-bnk-gold/20 hover:border-bnk-gold/40 transition-all duration-200"
              >
                <span className="font-medium text-bnk-gold">{measure}</span>
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
              Maintenance & Security FAQ
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
            Secure Your Website Today
          </h2>
          <p className="text-xl text-navy mb-8 max-w-2xl mx-auto">
            Don't wait for a security incident. Get proactive protection and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact#book-call"
              className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200 inline-flex items-center justify-center"
            >
              Get Security Audit <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link 
              href="/contact#proposal"
              className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
            >
              Choose Package
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
