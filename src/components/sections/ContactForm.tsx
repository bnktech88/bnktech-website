'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createScrollTrigger } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  full_name: string
  email: string
  phone: string
  company: string
  service_needed: string
  project_details: string
  page_url?: string
  website: string // Honeypot field
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service_needed: '',
    project_details: '',
    page_url: '',
    website: '' // Honeypot field - should remain empty
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    // Set page URL when component mounts
    setFormData(prev => ({
      ...prev,
      page_url: window.location.href
    }))

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
        body: JSON.stringify({
          ...formData,
          // Ensure honeypot is empty for legitimate submissions
          website: ''
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          company: '',
          service_needed: '',
          project_details: '',
          page_url: window.location.href,
          website: ''
        })
      } else {
        console.error('Form submission error:', result)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Network error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={formRef}>
      <div className="bg-neutral-100 p-8 rounded-lg border border-neutral-200">
        <h2 className="text-3xl font-display font-bold mb-6 text-primary-900">
          Get Your Free Consultation
        </h2>
        <p className="text-primary-600 mb-8">
          Tell us about your project and we'll get back to you within 4 hours with 
          a custom solution and transparent pricing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-primary-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors bg-neutral-50"
                placeholder="Bezwe Nkosi"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors bg-neutral-50"
                placeholder="bezwe@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors bg-neutral-50"
                placeholder="+27 63 068 7409"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-primary-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors bg-neutral-50"
                placeholder="Your Company Ltd"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service_needed" className="block text-sm font-medium text-primary-700 mb-2">
              Service Needed *
            </label>
            <select
              id="service_needed"
              name="service_needed"
              value={formData.service_needed}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors bg-neutral-50"
            >
              <option value="">Select a service</option>
              <option value="Website Builds">Website Builds</option>
              <option value="App Development & Maintenance">App Development & Maintenance</option>
              <option value="Digital Infrastructure">Digital Infrastructure</option>
              <option value="IT Services">IT Services</option>
              <option value="Security & Maintenance">Security & Maintenance</option>
              <option value="Retainer & Scaling Support">Retainer & Scaling Support</option>
              <option value="General Consultation">General Consultation</option>
            </select>
          </div>

          <div>
            <label htmlFor="project_details" className="block text-sm font-medium text-primary-700 mb-2">
              Project Details *
            </label>
            <textarea
              id="project_details"
              name="project_details"
              value={formData.project_details}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600 transition-colors resize-vertical bg-neutral-50"
              placeholder="Tell us about your project, timeline, budget range, and any specific requirements..."
            />
          </div>

          {/* Honeypot field - hidden from users, should remain empty */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
            <label htmlFor="website">Website (leave blank)</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
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

        <div className="mt-8 pt-6 border-t border-neutral-300 text-sm text-primary-500">
          <p>By submitting this form, you agree to our privacy policy and consent to being contacted regarding your project.</p>
        </div>
      </div>
    </div>
  )
}
