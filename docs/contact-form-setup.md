# Contact Form Setup Guide

This document outlines the setup and configuration of the professional contact form pipeline using Supabase Postgres and Resend for email notifications.

## Overview

The contact form system includes:
- **Supabase Postgres** for storing form submissions
- **Resend** for email notifications 
- **Server-side validation** with Zod
- **Spam protection** with honeypot fields and rate limiting
- **Optional Turnstile** CAPTCHA support
- **Comprehensive logging** and error handling

## Database Setup

### 1. Supabase Configuration

1. Create a new Supabase project at https://supabase.com
2. Run the migration file: `supabase/migrations/20240118_create_contact_submissions.sql`
3. The migration creates:
   - `contact_submissions` table with all required fields
   - Proper indexes for performance
   - Row Level Security (RLS) policies
   - Restrictive access (only service role can read/write)

### 2. Table Schema

```sql
contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service_needed text,
  project_details text NOT NULL,
  page_url text,
  user_agent text,
  ip inet,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'emailed', 'failed')),
  meta jsonb
)
```

## Environment Variables

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key_here
CONTACT_FROM_EMAIL=no-reply@bnktech.net
CONTACT_TO_EMAIL=bnktech.net@gmail.com

# Optional Email Configuration
CONTACT_REPLY_TO_EMAIL=bezw...@gmail.com
```

### Optional Variables

```bash
# Turnstile CAPTCHA (Recommended for production)
TURNSTILE_SECRET_KEY=xxxxxxxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxxxxxxxxx

# Admin Interface (Optional)
ADMIN_PASSWORD=secure_admin_password_here
```

### Environment Variable Details

#### Supabase Keys
- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Supabase publishable/anonymous key (safe for client-side)
- **SUPABASE_SERVICE_ROLE_KEY**: Service role key (server-only, bypasses RLS)

#### Email Configuration
- **RESEND_API_KEY**: Your Resend API key from https://resend.com
- **CONTACT_FROM_EMAIL**: Must be a verified domain in Resend
- **CONTACT_TO_EMAIL**: Where form submissions are sent
- **CONTACT_REPLY_TO_EMAIL**: Default reply-to address (optional)

#### Security
- **TURNSTILE_SECRET_KEY**: Cloudflare Turnstile secret key (optional)
- **NEXT_PUBLIC_TURNSTILE_SITE_KEY**: Turnstile site key (optional)

## API Endpoints

### POST /api/contact

Handles contact form submissions with comprehensive validation and processing.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "service_needed": "Website Builds",
  "project_details": "Need a new website for our business...",
  "page_url": "https://bnktech.net/contact",
  "website": "" // Honeypot field - must be empty
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message. We will respond within 4 hours.",
  "id": "uuid-of-submission"
}
```

**Response (Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "full_name",
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

## Security Features

### 1. Rate Limiting
- **5 requests per 15 minutes** per IP address
- In-memory storage (suitable for serverless)
- Automatic cleanup of expired entries
- Rate limit headers included in responses

### 2. Spam Protection
- **Honeypot field**: Hidden "website" field that must remain empty
- **Input validation**: Strict validation with Zod schemas
- **IP logging**: Track submission sources
- **User agent capture**: For analytics and spam detection

### 3. Data Sanitization
- All inputs validated with Zod
- HTML tags not stored (handled by validation)
- Email format validation
- String length limits enforced

### 4. Optional Turnstile CAPTCHA
- Cloudflare Turnstile integration
- Only enforced if environment variables are configured
- Graceful fallback if not configured

## Email Templates

The system uses professional HTML email templates with:
- **Responsive design** that works on all email clients
- **Clean formatting** with company branding
- **All form data** included in structured format
- **Metadata tracking** (timestamp, IP, browser, etc.)
- **Plain text fallback** for accessibility

## Deployment

### Vercel Environment Variables

Set all required environment variables in your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from the list above
3. Make sure `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are marked as sensitive

### Build Verification

Before deploying, ensure:
```bash
npm run build  # Should complete without TypeScript errors
npm run lint   # Should pass without warnings
```

## Monitoring and Maintenance

### Database Monitoring
- Monitor Supabase dashboard for submission volume
- Check for failed submissions (status = 'failed')
- Review rate limiting effectiveness

### Email Monitoring  
- Monitor Resend dashboard for email delivery
- Check bounce rates and delivery failures
- Verify email template rendering

### Error Handling
- All errors are logged to console with context
- Failed emails don't prevent form submission success
- Database failures return appropriate error responses
- Rate limiting provides clear feedback

## Admin Interface (Optional)

A minimal admin interface can be added at `/admin/leads` with:
- Simple password protection via `ADMIN_PASSWORD`
- Server-side data fetching using service role
- List view of all submissions
- Detail modal for individual submissions
- Export functionality

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
   - Check Supabase project is active
   - Ensure migration was applied

2. **Email not sending**
   - Verify `RESEND_API_KEY` is valid
   - Check `CONTACT_FROM_EMAIL` is verified in Resend
   - Review Resend logs for delivery issues

3. **Rate limiting too aggressive**
   - Adjust rate limit configuration in `/lib/rate-limiter.ts`
   - Consider implementing Redis for production scaling

4. **TypeScript errors**
   - Run `npm run build` to identify issues
   - Ensure all imports are correctly typed
   - Check Zod schema matches interface definitions

### Logs and Debugging

Enable detailed logging by checking:
- Browser developer console for client-side errors
- Vercel function logs for server-side issues
- Supabase logs for database operations
- Resend logs for email delivery

## Security Best Practices

1. **Never commit secrets** to version control
2. **Use service role key only server-side** - never expose to client
3. **Validate all inputs** before database operations
4. **Monitor for suspicious patterns** in submissions
5. **Regularly rotate API keys** and update environment variables
6. **Enable Turnstile** for additional spam protection in production

## Support

For technical issues:
1. Check this documentation first
2. Review error logs in respective services
3. Test with minimal configuration to isolate issues
4. Verify all environment variables are correctly set
