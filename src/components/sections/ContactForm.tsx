'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(form, { opacity: 1, x: 0 })
      return
    }

    // Initial state
    gsap.set(form, { opacity: 0, x: -60 })

    // Animate on scroll
    createScrollTrigger(form, () => {
      gsap.to(form, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={formRef}>
      <div className="bg-grey-50 p-8 rounded-lg">
        <h2 className="text-3xl font-display font-bold mb-6">
          Get Your Free Consultation
        </h2>
        <p className="text-grey-700 mb-8">
          Tell us about your project and we'll get back to you within 4 hours with 
          a custom solution and transparent pricing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-grey-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-grey-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-grey-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="+27 12 345 6789"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-grey-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Your Company Ltd"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-grey-700 mb-2">
              Service Needed *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
            >
              <option value="">Select a service</option>
              <option value="website-builds">Website Builds</option>
              <option value="app-development">App Development & Maintenance</option>
              <option value="digital-infrastructure">Digital Infrastructure</option>
              <option value="it-services">IT Services</option>
              <option value="security-maintenance">Security & Maintenance</option>
              <option value="retainer-scaling">Retainer & Scaling Support</option>
              <option value="consultation">General Consultation</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-grey-700 mb-2">
              Project Details *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-vertical"
              placeholder="Tell us about your project, timeline, budget range, and any specific requirements..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary py-4 text-lg magnetic disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
              <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm">We'll get back to you within 4 hours.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
              <p className="font-medium">Failed to send message.</p>
              <p className="text-sm">Please try again or contact us directly.</p>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-grey-200 text-sm text-grey-600">
          <p>By submitting this form, you agree to our privacy policy and consent to being contacted regarding your project.</p>
        </div>
      </div>
    </div>
  )
}
