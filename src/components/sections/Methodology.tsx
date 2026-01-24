'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle, ArrowRight, FileText, Users, Cog, Rocket } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const methodology = [
  {
    phase: '01',
    title: 'Discovery & Strategy',
    description: 'Requirements gathering, technical analysis, and project planning',
    icon: Users,
    deliverables: [
      'Technical requirements document',
      'Project timeline and milestones',
      'Architecture recommendations',
      'Risk assessment and mitigation plan'
    ],
    duration: '1-2 weeks'
  },
  {
    phase: '02',
    title: 'Sprint Planning',
    description: 'Agile development cycles with clear deliverables and regular check-ins',
    icon: FileText,
    deliverables: [
      'Sprint backlog and user stories',
      'Design mockups and wireframes',
      'Development environment setup',
      'Quality assurance procedures'
    ],
    duration: '2-4 week sprints'
  },
  {
    phase: '03',
    title: 'Development & QA',
    description: 'Code development with continuous testing and quality assurance',
    icon: Cog,
    deliverables: [
      'Working software increments',
      'Automated test coverage',
      'Code reviews and documentation',
      'Performance optimization'
    ],
    duration: 'Ongoing cycles'
  },
  {
    phase: '04',
    title: 'Launch & Support',
    description: 'Deployment, monitoring, and ongoing maintenance support',
    icon: Rocket,
    deliverables: [
      'Production deployment',
      'Performance monitoring setup',
      'Support documentation',
      'Maintenance schedule'
    ],
    duration: 'Ongoing'
  }
]

const qualityStandards = [
  {
    title: 'Code Quality',
    items: [
      'TypeScript for type safety',
      'ESLint and Prettier for consistency',
      'Unit and integration testing',
      'Code review process'
    ]
  },
  {
    title: 'Performance',
    items: [
      'Lighthouse scores 90+',
      'Core Web Vitals optimization',
      'Performance budgets',
      'Load testing'
    ]
  },
  {
    title: 'Security',
    items: [
      'Security headers implementation',
      'Vulnerability scanning',
      'Data encryption',
      'Regular security audits'
    ]
  },
  {
    title: 'Monitoring',
    items: [
      'Uptime monitoring',
      'Error tracking',
      'Performance analytics',
      'Automated alerts'
    ]
  }
]

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const cards = cardsRef.current

    if (cards.length === 0) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(cards, { opacity: 0, y: 60 })

    // Animate cards on scroll
    cards.forEach((card, index) => {
      createScrollTrigger(card, () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out'
        })
      })
    })

  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 bg-bnk-navy">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-bnk-gold">
              How We Work
            </h2>
            <p className="text-xl text-bnk-gold/80 max-w-3xl mx-auto leading-relaxed">
              Proven methodology combining agile development with engineering discipline. 
              Every project follows our structured approach for predictable results.
            </p>
          </div>

          {/* Methodology Steps */}
          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {methodology.map((step, index) => (
              <div key={index} ref={addToRefs} className="bg-bnk-gold/10 rounded-xl p-8 border border-bnk-gold/20 relative">
                {/* Connection Line */}
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-bnk-bronze" />
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-bnk-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-bnk-navy" />
                  </div>
                  <div className="bg-bnk-gold text-bnk-navy px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                    {step.phase}
                  </div>
                  <h3 className="text-xl font-semibold text-bnk-gold mb-2">{step.title}</h3>
                  <p className="text-bnk-gold/80 text-sm mb-4">{step.description}</p>
                  <div className="text-bnk-bronze text-sm font-medium">{step.duration}</div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-bnk-gold mb-3 text-sm">Key Deliverables:</h4>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, delIndex) => (
                      <li key={delIndex} className="flex items-start text-xs">
                        <CheckCircle className="w-3 h-3 text-bnk-bronze mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-bnk-gold/80">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quality Standards */}
          <div ref={addToRefs} className="bg-bnk-gold/5 rounded-xl p-8 border border-bnk-gold/20">
            <h3 className="text-2xl font-semibold mb-8 text-bnk-gold text-center">
              Quality Standards & Artifacts
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityStandards.map((standard, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-bnk-gold mb-4">{standard.title}</h4>
                  <ul className="space-y-2">
                    {standard.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-bnk-bronze mr-2 flex-shrink-0" />
                        <span className="text-bnk-gold/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Reporting */}
          <div ref={addToRefs} className="mt-16 text-center">
            <div className="bg-bnk-bronze/10 rounded-xl p-8 border border-bnk-bronze/20">
              <h3 className="text-2xl font-semibold mb-4 text-bnk-gold">
                Transparent Reporting
              </h3>
              <p className="text-bnk-gold/80 mb-6 max-w-2xl mx-auto">
                Regular project updates, performance reports, and clear communication 
                throughout the development process. No surprises, just results.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-bnk-bronze mb-1">Weekly</div>
                  <div className="text-bnk-gold/80 text-sm">Progress Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-bnk-bronze mb-1">Bi-weekly</div>
                  <div className="text-bnk-gold/80 text-sm">Sprint Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-bnk-bronze mb-1">Monthly</div>
                  <div className="text-bnk-gold/80 text-sm">Performance Reports</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
