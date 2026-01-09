'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Innovation',
    description: 'We stay at the forefront of technology, constantly exploring new solutions to drive your business forward.',
    icon: '💡'
  },
  {
    title: 'Precision',
    description: 'Every line of code, every design decision, and every strategic choice is crafted with meticulous attention to detail.',
    icon: '🎯'
  },
  {
    title: 'Excellence',
    description: 'We set the highest standards for ourselves and deliver solutions that exceed expectations every time.',
    icon: '⭐'
  }
]

export default function Values() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || cards.length === 0) return

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
          delay: index * 0.2,
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
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-brand">
            Our Values
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            The principles that guide everything we do and shape how we approach every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              ref={addToRefs}
              className="bg-bnk-neutral-50 p-8 rounded-lg text-center border hover:shadow-lg hover:shadow-brand/10 transition-all duration-300"
            >
              <div className="text-6xl mb-6">{value.icon}</div>
              <h3 className="text-2xl font-display font-bold mb-4 text-brand">
                {value.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 pt-12 border-t border-navy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-display font-bold text-navy mb-2">100%</div>
              <div className="text-navy">Client Satisfaction Rate</div>
              <p className="text-sm text-navy mt-2">Every project delivered to specifications</p>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-navy mb-2">&lt; 4h</div>
              <div className="text-navy">Average Response Time</div>
              <p className="text-sm text-navy mt-2">Quick communication, always</p>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-navy mb-2">0</div>
              <div className="text-navy">Security Breaches</div>
              <p className="text-sm text-navy mt-2">Rock-solid security practices</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
