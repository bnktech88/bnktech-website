# Security Policy

## Overview

BNK Tech website follows security best practices for Next.js applications with zero secrets in source control and comprehensive server-side security validation.

## Secret Management

### Environment Variables

All sensitive configuration is managed through environment variables:

#### Required (Server-Side Only)
- `SUPABASE_SERVICE_ROLE_KEY` - Database admin access (NEVER expose to client)
- `NEXT_PUBLIC_SUPABASE_URL` - Database URL (safe for client)

#### Optional Services
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Client database access (read-only)
- `RESEND_API_KEY` - Email service (server-only)
- `CONTACT_FROM_EMAIL` - Verified sender address
- `CONTACT_TO_EMAIL` - Recipient email
- `ADMIN_PASSWORD` - Admin interface access
- `TURNSTILE_SECRET_KEY` - CAPTCHA verification (server-only)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - CAPTCHA site key (client-safe)

### Security Rules

1. **NEVER commit secrets to git**
   - All `.env*` files are gitignored
   - Only placeholder values in documentation
   - No hardcoded keys, tokens, or passwords anywhere in codebase

2. **Server-Side Only Secrets**
   - `SUPABASE_SERVICE_ROLE_KEY` - Database admin access
   - `RESEND_API_KEY` - Email API access  
   - `ADMIN_PASSWORD` - Admin authentication
   - `TURNSTILE_SECRET_KEY` - CAPTCHA verification

3. **Client-Side Safe Variables**
   - Only `NEXT_PUBLIC_*` prefixed variables
   - Database URL and anonymous key only
   - No service API keys or admin credentials

## Database Security (Supabase)

### Row Level Security (RLS)
- **Enabled** on all tables
- **Restrictive policies** block all anonymous access
- **Service role bypass** for server operations only

### Access Control
```sql
-- All client access blocked
CREATE POLICY "No client access" FOR ALL TO public USING (false);

-- Only service role can read/write
GRANT ALL ON contact_submissions TO service_role;
```

### Runtime Validation
- Server-side environment validation before database operations
- Client-side access prevention with runtime checks
- Defensive programming against misconfiguration

## Email Security (Resend)

### Server-Side Only
- Email functionality exclusively server-side
- No client-side email API access
- Secure environment variable validation

### Verified Domains
- `CONTACT_FROM_EMAIL` must be verified in Resend
- Reply-to set to form submitter for proper threading
- No API errors exposed to client

### Configuration Validation
```typescript
// Runtime checks prevent client-side usage
if (typeof window !== 'undefined') {
  console.error('Security violation: Email attempted on client-side')
  return { success: false, error: 'Security violation' }
}
```

## API Security

### Rate Limiting
- **5 requests per 15 minutes** per IP address
- In-memory storage with automatic cleanup
- Graceful degradation under high load

### Spam Protection
- **Honeypot fields** - hidden inputs that must remain empty
- **Input validation** - Strict Zod schemas with length limits
- **Email validation** - Server-side format verification
- **Optional CAPTCHA** - Turnstile integration when configured

### Error Handling
- **Never expose internal errors** to client responses
- **Sanitized error messages** for user feedback
- **Detailed server logging** for debugging and monitoring
- **Security event logging** for admin access attempts

## Admin Interface Security

### Authentication
- **Simple password protection** via `ADMIN_PASSWORD` environment variable
- **Timing attack protection** - Fixed delay regardless of result
- **Failed attempt logging** - IP addresses logged for monitoring
- **Server-side validation** - No client-side password handling

### Access Control
- **Bearer token authorization** for API access
- **Server-side session management** - No client-side tokens
- **Read-only data access** - No modification capabilities through admin interface

## Runtime Validation

### Environment Variable Validation
```typescript
// Comprehensive validation with graceful fallbacks
export function validateRequiredEnvVars(): EnvValidationResult {
  // Check required variables
  // Log warnings for optional missing variables  
  // Fail gracefully with clear error messages
}
```

### Server-Side Assertions
```typescript
// Prevent client-side security violations
export function assertServerEnvVars(operation: string): void {
  if (typeof window !== 'undefined') {
    throw new Error(`${operation} attempted on client-side`)
  }
  // Validate environment before proceeding
}
```

## Deployment Security

### Vercel Configuration
- **Environment variables** set in Vercel dashboard
- **Sensitive values** marked as encrypted
- **Build-time validation** with graceful fallbacks
- **Production-only secrets** never in preview deployments

### CI/CD Security
- **No secrets in build logs** - All values from environment
- **Zero secrets in repository** - Safe for public repositories
- **Automated security validation** - Build fails on missing critical variables

## Monitoring and Incident Response

### Security Logging
- **Failed admin attempts** - IP addresses and timestamps
- **Rate limit violations** - Potential abuse detection
- **Environment validation failures** - Configuration issues
- **Unusual access patterns** - Monitoring for anomalies

### Incident Response
1. **Immediate containment** - Disable affected services
2. **Environment rotation** - Generate new keys/passwords
3. **Access audit** - Review all admin access logs
4. **Security update** - Patch vulnerabilities immediately

## Adding New Secrets

### Process
1. **Add to environment validation** in `/src/lib/env-validation.ts`
2. **Use secure access pattern** via `getEnvVar()` helper
3. **Server-side only enforcement** with runtime checks
4. **Update documentation** in this file and setup guide
5. **Test graceful fallbacks** for missing variables

### Example Implementation
```typescript
// 1. Add to validation
interface OptionalServerEnvVars {
  NEW_SECRET_KEY?: string
}

// 2. Use secure access
const secretKey = getEnvVar('NEW_SECRET_KEY')
if (!secretKey) {
  console.warn('NEW_SECRET_KEY not configured')
  return { success: false, error: 'Service not available' }
}

// 3. Ensure server-side only
if (typeof window !== 'undefined') {
  console.error('Security violation: Secret accessed on client-side')
  return null
}
```

## Security Best Practices

### Development
- **Never commit `.env*` files** - Always use environment variables
- **Test without secrets** - Ensure graceful degradation
- **Code review security** - Focus on environment variable usage
- **Regular dependency updates** - Keep security patches current

### Production
- **Rotate secrets regularly** - Update all API keys quarterly
- **Monitor access logs** - Watch for unusual patterns
- **Backup recovery procedures** - Test incident response plans
- **Security headers** - Implement Content Security Policy

### Deployment Checklist
- [ ] All secrets in environment variables only
- [ ] No hardcoded keys in codebase
- [ ] Build passes without secrets (graceful fallbacks)
- [ ] Admin access properly secured
- [ ] Database RLS policies active
- [ ] Rate limiting configured
- [ ] Error messages sanitized
- [ ] Security logging enabled

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT open a public issue**
2. **Email security concerns to**: bezw...@gmail.com
3. **Include detailed description** of the vulnerability
4. **Provide reproduction steps** if possible
5. **Allow 48 hours** for initial response

We take security seriously and will respond quickly to legitimate security concerns.

## Compliance

This security implementation follows:
- **OWASP Web Application Security Guidelines**
- **Next.js Security Best Practices**
- **Supabase Row Level Security Standards**
- **Vercel Environment Security Recommendations**

Last Updated: January 18, 2026
