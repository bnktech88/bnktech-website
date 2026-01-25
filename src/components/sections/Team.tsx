'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { User, Award, Clock, Target } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const teamRoles = [
  {
    role: 'Founder / Lead Engineer',
    description: 'Full-stack development, architecture planning, and technical leadership with 8+ years experience.',
    expertise: ['Next.js', 'TypeScript', 'System Architecture', 'Performance Optimization']
  },
  {
    role: 'Senior Developer',
    description: 'Frontend specialization and UI engineering with focus on user experience and accessibility.',
    expertise: ['React', 'UI/UX Implementation', 'Web Standards', 'Cross-browser Compatibility']
  },
  {
    role: 'DevOps / Security Engineer',
    description: 'Infrastructure, deployment pipelines, and security implementation for production systems.',
    expertise: ['CI/CD', 'Cloud Infrastructure', 'Security Auditing', 'Monitoring & Alerting']
  }
]

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current

    if (!section || !content) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(content, { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, y: 60 })

    // Animate on scroll
    createScrollTrigger(content, () => {
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-bnk-gold">
      <div className="container">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-navy">
              Team & Expertise
            </h2>
            <p className="text-xl text-navy max-w-3xl mx-auto leading-relaxed">
              Experienced engineering team focused on delivering measurable results 
              through technical excellence and proven methodologies.
            </p>
          </div>

          {/* Team Roles */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {teamRoles.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="w-12 h-12 bg-bnk-navy rounded-lg flex items-center justify-center mb-6">
                  <User className="w-6 h-6 text-bnk-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-navy">{member.role}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{member.description}</p>
                <div>
                  <h4 className="font-semibold text-navy mb-3">Key Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="bg-bnk-navy/10 text-bnk-navy px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Stats */}
          <div className="bg-bnk-navy rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-bnk-gold text-center">
              Track Record
            </h3>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-bnk-bronze mb-2">8+</div>
                <div className="text-bnk-gold/80">Years Combined Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-bnk-bronze mb-2">15+</div>
                <div className="text-bnk-gold/80">Completed Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-bnk-bronze mb-2">99.9%</div>
                <div className="text-bnk-gold/80">Uptime Achieved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-bnk-bronze mb-2">100%</div>
                <div className="text-bnk-gold/80">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6 text-navy">Ready to Work Together?</h3>
            <p className="text-navy mb-8 max-w-2xl mx-auto">
              Let's discuss how our engineering expertise can deliver measurable improvements for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact#book-call" 
                className="bg-bnk-navy text-bnk-gold px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy/90 transition-all duration-200"
              >
                Book a 30-min Call
              </Link>
              <Link 
                href="/work" 
                className="border-2 border-bnk-navy text-bnk-navy px-8 py-4 rounded-lg font-medium hover:bg-bnk-navy hover:text-bnk-gold transition-all duration-200"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
