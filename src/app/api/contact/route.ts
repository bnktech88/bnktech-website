import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Rate limiting store (in production, use Redis or a database)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '') // Basic HTML tag removal
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  const record = rateLimitStore.get(ip)
  
  if (!record || now - record.timestamp > windowMs) {
    rateLimitStore.set(ip, { count: 1, timestamp: now })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

async function sendEmail(formData: ContactFormData & { timestamp: string; ip: string }): Promise<boolean> {
  try {
    // Only send emails in preview mode or if SMTP is configured
    if (!process.env.CONTACT_TO || !process.env.SMTP_HOST) {
      console.log('Email not configured, logging submission instead:', formData)
      return true
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const emailContent = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Service: ${formData.service}
Timestamp: ${formData.timestamp}
IP Address: ${formData.ip}

Message:
${formData.message}
    `

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      subject: `New Contact Form Submission - ${formData.service}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    })

    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, company, service, message }: ContactFormData = body

    // Validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message too short' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      company: company ? sanitizeInput(company) : '',
      service: sanitizeInput(service),
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
      ip: ip
    }

    // Log the contact form submission
    console.log('Contact Form Submission:', JSON.stringify(sanitizedData, null, 2))

    // Send email notification
    const emailSent = await sendEmail(sanitizedData)
    
    if (!emailSent) {
      console.error('Failed to send email notification')
      // Continue with success response since the form data is valid
      // In production, you might want to queue the email for retry
    }

    // In production, you would also:
    // 1. Save to database
    // 2. Add to CRM system
    // 3. Send auto-reply to customer

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will respond within 4 hours.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
