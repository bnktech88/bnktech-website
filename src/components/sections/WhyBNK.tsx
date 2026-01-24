import { Zap, Code, Shield, GitBranch, Clock, BarChart3 } from 'lucide-react'

const proofPoints = [
  {
    icon: Zap,
    title: 'Core Web Vitals Focus',
    description: 'Sub-2 second load times with performance budgets and continuous monitoring',
    metric: '90+ Lighthouse scores'
  },
  {
    icon: Code,
    title: 'TypeScript + Next.js Engineering',
    description: 'Type-safe, scalable code with modern React patterns and server-side optimization',
    metric: 'Zero runtime errors'
  },
  {
    icon: Shield,
    title: 'Secure-by-Default Architecture',
    description: 'Built-in security headers, form validation, and proactive monitoring systems',
    metric: '99.9% uptime guarantee'
  },
  {
    icon: GitBranch,
    title: 'CI/CD Deployment Discipline',
    description: 'Automated testing, staging environments, and zero-downtime deployments',
    metric: 'Same-day fixes'
  },
  {
    icon: Clock,
    title: 'Clear SLAs for Retainers',
    description: 'Transparent response times, priority queues, and guaranteed monthly hours',
    metric: '4-48hr response times'
  },
  {
    icon: BarChart3,
    title: 'Transparent Process & Reporting',
    description: 'Monthly reports, performance dashboards, and clear project communication',
    metric: 'Full visibility'
  }
]

export default function WhyBNK() {
  return (
    <section className="bg-bnk-navy py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-bnk-gold">
            Why BNK Wins
          </h2>
          <p className="text-xl md:text-2xl text-bnk-gold/80 max-w-3xl mx-auto text-balance">
            Engineering rigor meets business outcomes. Here's how we deliver results 
            that other agencies can't match.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proofPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-bnk-gold/10 rounded-xl p-8 border border-bnk-gold/20 hover:border-bnk-gold/40 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-bnk-bronze rounded-lg flex items-center justify-center mb-6">
                <point.icon className="w-6 h-6 text-bnk-navy" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-bnk-gold">
                {point.title}
              </h3>
              
              <p className="text-bnk-gold/80 mb-4 leading-relaxed">
                {point.description}
              </p>
              
              <div className="bg-bnk-bronze/20 text-bnk-bronze px-3 py-2 rounded-lg text-sm font-medium">
                {point.metric}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-bnk-gold/5 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-bnk-gold">
              The BNK Difference
            </h3>
            <p className="text-bnk-gold/80 text-lg leading-relaxed">
              While other agencies focus on design or marketing, we engineer websites 
              like software products. Every line of code is measurable, maintainable, 
              and built for scale. That's why our clients see real business results, 
              not just pretty websites.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
