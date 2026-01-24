import { Shield, Lock, Server, Monitor, Zap, CheckCircle } from 'lucide-react'

const trustBadges = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'HTTPS, security headers, and secure coding practices'
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description: 'Core Web Vitals compliance and sub-2s load times'
  },
  {
    icon: Server,
    title: '99.9% Uptime',
    description: 'Reliable hosting with monitoring and alerting'
  },
  {
    icon: Lock,
    title: 'POPIA Friendly',
    description: 'Data protection and privacy compliance built-in'
  },
  {
    icon: Monitor,
    title: 'Continuous Monitoring',
    description: 'Real-time performance and security monitoring'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Automated testing and code review processes'
  }
]

const techStack = [
  { name: 'Next.js', description: 'React framework for production' },
  { name: 'TypeScript', description: 'Type-safe JavaScript' },
  { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
  { name: 'Vercel', description: 'Serverless deployment platform' },
  { name: 'Supabase', description: 'Open source Firebase alternative' },
  { name: 'Resend', description: 'Developer-first email API' },
  { name: 'Stripe', description: 'Payment processing platform' },
  { name: 'Google Analytics', description: 'Web analytics service' }
]

const industries = [
  'E-commerce & Retail',
  'Financial Services',
  'Healthcare Technology',
  'Professional Services',
  'Manufacturing',
  'Education & Training'
]

export default function TrustBadges() {
  return (
    <section className="py-24 bg-bnk-gold">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-8 text-navy">
              Security & Reliability
            </h2>
            <p className="text-xl text-navy max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade security and reliability standards built into every project.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {trustBadges.map((badge, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-bnk-navy rounded-lg flex items-center justify-center mx-auto mb-4">
                  <badge.icon className="w-6 h-6 text-bnk-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-navy">{badge.title}</h3>
                <p className="text-gray-700 text-sm">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="bg-bnk-navy rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-bnk-gold text-center">
              Proven Technology Stack
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="bg-bnk-gold/10 rounded-lg p-4 border border-bnk-gold/20">
                  <h4 className="font-semibold text-bnk-gold mb-2">{tech.name}</h4>
                  <p className="text-bnk-gold/80 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries Served */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8 text-navy">
              Industries Served
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className="bg-bnk-navy text-bnk-gold px-6 py-3 rounded-full font-medium hover:bg-bnk-navy/90 transition-colors"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
