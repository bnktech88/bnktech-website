import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createServerClient, type ContactSubmission } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limiter'

// Input validation schema
const contactFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  service_needed: z.string().max(100).optional().nullable(),
  project_details: z.string().min(10, 'Project details must be at least 10 characters').max(5000),
  page_url: z.string().url().max(500).optional().nullable(),
  website: z.string().optional(), // Honeypot field - must be empty
})

interface ContactFormData extends z.infer<typeof contactFormSchema> {}

// Extract client IP address
function getClientIP(request: NextRequest): string {
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return '127.0.0.1'
}

// Generate email subject
function generateEmailSubject(service: string | null | undefined): string {
  const serviceName = service || 'General Inquiry'
  return `New BNK Tech Lead — ${serviceName}`
}

// Generate HTML email template
function generateEmailHtml(submission: ContactSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Name:</strong> ${submission.full_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          ${submission.phone ? `<p><strong>Phone:</strong> <a href="tel:${submission.phone}">${submission.phone}</a></p>` : ''}
          ${submission.company ? `<p><strong>Company:</strong> ${submission.company}</p>` : ''}
          ${submission.service_needed ? `<p><strong>Service Needed:</strong> ${submission.service_needed}</p>` : ''}
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div style="background: #fff; padding: 20px; border-left: 4px solid #3498db;">
          <h3 style="margin-top: 0; color: #2c3e50;">Project Details:</h3>
          <p style="white-space: pre-wrap;">${submission.project_details}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>Submission ID: ${submission.id || 'N/A'}</p>
          ${submission.page_url ? `<p>Submitted from: <a href="${submission.page_url}">${submission.page_url}</a></p>` : ''}
          ${submission.ip ? `<p>IP Address: ${submission.ip}</p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}

// Generate plain text email template
function generateEmailText(submission: ContactSubmission): string {
  return `
New Contact Form Submission

Name: ${submission.full_name}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}` : ''}
${submission.company ? `Company: ${submission.company}` : ''}
${submission.service_needed ? `Service Needed: ${submission.service_needed}` : ''}

Project Details:
${submission.project_details}

---
Submission ID: ${submission.id || 'N/A'}
Submitted: ${new Date().toLocaleString()}
${submission.page_url ? `Page: ${submission.page_url}` : ''}
${submission.ip ? `IP: ${submission.ip}` : ''}
  `
}

// Save submission to database
async function saveToDatabase(submission: ContactSubmission): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const supabase = createServerClient()
    
    console.log(JSON.stringify({
      type: 'contact',
      event: 'database_save_start',
      ip: submission.ip,
      timestamp: new Date().toISOString()
    }))
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        full_name: submission.full_name,
        email: submission.email,
        phone: submission.phone,
        company: submission.company,
        service_needed: submission.service_needed,
        project_details: submission.project_details,
        page_url: submission.page_url,
        user_agent: submission.user_agent,
        ip: submission.ip,
        status: 'received',
        meta: submission.meta
      }])
      .select('id')
      .single()

    if (error) {
      console.log(JSON.stringify({
        type: 'error',
        event: 'database_save_failed',
        error: error.message,
        ip: submission.ip,
        timestamp: new Date().toISOString()
      }))
      return { success: false, error: 'Database operation failed' }
    }

    console.log(JSON.stringify({
      type: 'contact',
      event: 'database_save_success',
      submissionId: data.id,
      ip: submission.ip,
      timestamp: new Date().toISOString()
    }))

    return { success: true, id: data.id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.log(JSON.stringify({
      type: 'error',
      event: 'database_save_exception',
      error: errorMessage,
      ip: submission.ip,
      timestamp: new Date().toISOString()
    }))
    console.error('Database save error:', error)
    return { success: false, error: 'Database operation failed' }
  }
}

// Send email notification via Resend
async function sendEmailNotification(submission: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.log('Resend API key not configured, skipping email')
      return { success: true }
    }

    const resend = new Resend(resendApiKey)
    
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'no-reply@bnktech.net'
    const toEmail = process.env.CONTACT_TO_EMAIL || 'bnktech.net@gmail.com'
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: submission.email,
      subject: generateEmailSubject(submission.service_needed),
      html: generateEmailHtml(submission),
      text: generateEmailText(submission),
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error: 'Email delivery failed' }
    }

    console.log('Email sent successfully:', data?.id)
    return { success: true }
  } catch (error) {
    console.error('Email send exception:', error)
    return { success: false, error: 'Email delivery failed' }
  }
}

// Update submission status in database
async function updateSubmissionStatus(id: string, status: string, emailSuccess: boolean, emailError?: string): Promise<void> {
  try {
    const supabase = createServerClient()
    
    await supabase
      .from('contact_submissions')
      .update({
        status,
        meta: {
          email_sent: emailSuccess,
          email_error: emailError || null,
          updated_at: new Date().toISOString()
        }
      })
      .eq('id', id)
  } catch (error) {
    console.error('Failed to update submission status:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Runtime environment validation - fail fast if critical env vars missing
    const requiredEnvVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL
    }

    for (const [key, value] of Object.entries(requiredEnvVars)) {
      if (!value || value.trim() === '') {
        console.error(`Missing required environment variable: ${key}`)
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 500 }
        )
      }
    }

    // Get client metadata
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || undefined
    const referer = request.headers.get('referer') || undefined

    // Rate limiting (5 requests per 15 minutes)
    const rateLimitResult = checkRateLimit(ip, { windowMs: 15 * 60 * 1000, maxRequests: 5 })
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Honeypot validation (silent fail for bots)
    if (body.website && body.website.trim() !== '') {
      console.log(JSON.stringify({
        type: 'security',
        event: 'honeypot_triggered',
        ip: ip,
        userAgent: userAgent?.substring(0, 100),
        timestamp: new Date().toISOString()
      }))
      // Return success to avoid revealing honeypot existence
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your message. We will respond within 4 hours.' 
      })
    }

    // Input validation with Zod
    const validationResult = contactFormSchema.safeParse(body)
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Create submission object with metadata
    const submission: ContactSubmission = {
      ...validatedData,
      ip,
      user_agent: userAgent,
      page_url: validatedData.page_url || referer,
      status: 'received',
      meta: {
        submitted_at: new Date().toISOString(),
        user_agent: userAgent,
        referer,
        ip
      }
    }

    // Save to Supabase database
    const dbResult = await saveToDatabase(submission)
    if (!dbResult.success) {
      console.error('Database save failed:', dbResult.error)
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      )
    }

    // Update submission with database ID
    submission.id = dbResult.id

    // Send email notification
    const emailResult = await sendEmailNotification(submission)
    
    // Update status in database
    const finalStatus = emailResult.success ? 'emailed' : 'failed'
    await updateSubmissionStatus(
      dbResult.id!, 
      finalStatus, 
      emailResult.success, 
      emailResult.error
    )

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will respond within 4 hours.',
      id: dbResult.id
    })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Method not allowed handlers
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
