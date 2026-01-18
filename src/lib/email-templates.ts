import { ContactSubmission } from './supabase'

export function generateEmailSubject(serviceNeeded?: string | null): string {
  const service = serviceNeeded || 'General'
  return `New BNK Tech Website Lead — ${service}`
}

export function generateEmailHtml(submission: ContactSubmission): string {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleString()
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #1a365d;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        .field:last-of-type {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #2d3748;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            color: #4a5568;
            word-wrap: break-word;
        }
        .message-field {
            background: #f7fafc;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #3182ce;
        }
        .metadata {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
            font-size: 12px;
            color: #6c757d;
        }
        .urgent {
            background: #fed7d7;
            border-left-color: #e53e3e;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Website Lead</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">BNK Tech Contact Form Submission</p>
        </div>

        <div class="field">
            <span class="label">👤 Full Name</span>
            <div class="value">${submission.full_name}</div>
        </div>

        <div class="field">
            <span class="label">📧 Email Address</span>
            <div class="value">
                <a href="mailto:${submission.email}" style="color: #3182ce; text-decoration: none;">
                    ${submission.email}
                </a>
            </div>
        </div>

        ${submission.phone ? `
        <div class="field">
            <span class="label">📱 Phone Number</span>
            <div class="value">
                <a href="tel:${submission.phone}" style="color: #3182ce; text-decoration: none;">
                    ${submission.phone}
                </a>
            </div>
        </div>
        ` : ''}

        ${submission.company ? `
        <div class="field">
            <span class="label">🏢 Company</span>
            <div class="value">${submission.company}</div>
        </div>
        ` : ''}

        ${submission.service_needed ? `
        <div class="field">
            <span class="label">🔧 Service Needed</span>
            <div class="value"><strong>${submission.service_needed}</strong></div>
        </div>
        ` : ''}

        <div class="field">
            <span class="label">📝 Project Details</span>
            <div class="message-field">
                ${submission.project_details.replace(/\n/g, '<br>')}
            </div>
        </div>

        <div class="metadata">
            <strong>Submission Details:</strong><br>
            <strong>Date:</strong> ${formatDate(submission.created_at)}<br>
            ${submission.page_url ? `<strong>Page:</strong> ${submission.page_url}<br>` : ''}
            ${submission.ip ? `<strong>IP:</strong> ${submission.ip}<br>` : ''}
            ${submission.user_agent ? `<strong>Browser:</strong> ${submission.user_agent.substring(0, 100)}${submission.user_agent.length > 100 ? '...' : ''}<br>` : ''}
            <strong>Status:</strong> ${submission.status || 'new'}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #6c757d;">
            <p><strong>⏰ Response Time Goal: Within 4 hours</strong></p>
            <p>This email was automatically generated from the BNK Tech website contact form.</p>
        </div>
    </div>
</body>
</html>`
}

export function generateEmailText(submission: ContactSubmission): string {
  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleString()
    return new Date(dateString).toLocaleString()
  }

  return `
NEW BNK TECH WEBSITE LEAD
========================

Full Name: ${submission.full_name}
Email: ${submission.email}
${submission.phone ? `Phone: ${submission.phone}` : ''}
${submission.company ? `Company: ${submission.company}` : ''}
${submission.service_needed ? `Service Needed: ${submission.service_needed}` : ''}

PROJECT DETAILS:
${submission.project_details}

SUBMISSION DETAILS:
Date: ${formatDate(submission.created_at)}
${submission.page_url ? `Page: ${submission.page_url}` : ''}
${submission.ip ? `IP: ${submission.ip}` : ''}
${submission.user_agent ? `Browser: ${submission.user_agent}` : ''}
Status: ${submission.status || 'new'}

---
Response Time Goal: Within 4 hours
This email was automatically generated from the BNK Tech website contact form.
`
}
