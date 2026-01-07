'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    title: 'Innovation',
    description: 'We stay at the forefront of technology, constantly exploring new solutions to drive your business forward.'
  },
  {
    title: 'Precision',
    description: 'Every line of code, every design decision, and every strategic choice is crafted with meticulous attention to detail.'
  },
  {
    title: 'Excellence',
    description: 'We set the highest standards for ourselves and deliver solutions that exceed expectations every time.'
  }
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const valueCards = valuesRef.current

    if (!section || !content || valueCards.length === 0) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set([content, ...valueCards], { opacity: 1, y: 0 })
      return
    }

    // Initial state
    gsap.set(content, { opacity: 0, y: 60 })
    gsap.set(valueCards, { opacity: 0, y: 40 })

    // Animate content on scroll
    createScrollTrigger(content, () => {
      gsap.to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

    // Animate value cards
    valueCards.forEach((card, index) => {
      createScrollTrigger(card, () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power2.out'
        })
      })
    })

  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !valuesRef.current.includes(el)) {
      valuesRef.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} className="py-24 bg-grey-100">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Building the Future of Technology
            </h2>
            
            <div className="space-y-6 text-lg text-grey-700 leading-relaxed">
              <p>
                BNK Tech is more than a technology company—we're architects of digital transformation. 
                Founded on the belief that exceptional technology should drive exceptional results, 
                we partner with businesses to turn ambitious visions into reality.
              </p>
              
              <p>
                Our mission is to become South Africa's leading technology powerhouse, delivering 
                world-class solutions that empower businesses to thrive in the digital age. 
                Every project we undertake is an opportunity to push boundaries and set new standards.
              </p>
              
              <p>
                From high-performance websites to enterprise infrastructure, we don't just build 
                technology—we craft experiences that inspire, platforms that scale, and systems that endure.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/about" className="btn btn-primary magnetic">
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                ref={addToRefs}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-2xl font-display font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-grey-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 pt-16 border-t border-grey-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-black mb-2">50+</div>
              <div className="text-grey-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-black mb-2">99.9%</div>
              <div className="text-grey-600">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-black mb-2">24/7</div>
              <div className="text-grey-600">Expert Support</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-black mb-2">100%</div>
              <div className="text-grey-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
