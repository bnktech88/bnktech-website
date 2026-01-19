# Contact Form End-to-End Testing Guide

## Status Values Used End-to-End
- **Initial Insert**: `new` (matches Supabase constraint)
- **After Email Success**: `emailed` 
- **After Email Failure**: `failed`
- **Constraint**: `CHECK (status IN ('new', 'emailed', 'failed'))`

## Testing Checklist

### Pre-Test Setup
1. **Environment Variables Configured**
   - [ ] All required vars set in `.env.local` (dev) or Vercel (production)
   - [ ] Supabase database accessible with correct schema
   - [ ] Resend domain verified and API key active
   - [ ] Email addresses configured correctly

### Local Testing (Development)

#### Test 1: Basic Form Submission
1. Navigate to `/contact` page
2. Fill out form with valid data:
   - Full Name: "Test User"
   - Email: "test@example.com" 
   - Service: Select any option
   - Project Details: "This is a test submission with valid data"
3. Submit form
4. **Expected Results:**
   - Form shows "success" message
   - Check Supabase: New row in `contact_submissions` table
   - Check email: Notification received at `CONTACT_TO_EMAIL`
   - Console logs: Structured JSON logs with no secrets

#### Test 2: Validation Errors
1. Try submitting with:
   - Empty required fields
   - Invalid email format
   - Too short project details (< 10 chars)
2. **Expected Results:**
   - Form shows validation errors
   - No database entry created
   - No email sent

#### Test 3: Honeypot Protection
1. Open browser dev tools
2. Find hidden `website` field and set value: "bot-test"
3. Submit form with otherwise valid data
4. **Expected Results:**
   - Form shows "success" message (silent fail)
   - No database entry created
   - No email sent
   - Console log: `honeypot_triggered` event

#### Test 4: Rate Limiting
1. Submit form 6 times rapidly from same IP
2. **Expected Results:**
   - First 5 submissions work normally
   - 6th submission returns 429 error
   - Wait 15 minutes and try again (should work)

### Production Testing (Post-Deploy)

#### Test 5: End-to-End Production Flow
1. Submit form on https://www.bnktech.net/contact
2. **Verify in Vercel Logs:** Look for these structured log events:
   - `{"type":"contact","event":"database_save_success","submissionId":"uuid"}`
   - `{"type":"contact","event":"email_sent_success","emailId":"resend-id"}`
3. **Verify in Supabase:** Check `contact_submissions` table
   - Row created with `status: 'new'` initially
   - Status updated to `status: 'emailed'` after email success
   - All form fields populated correctly
4. **Verify Email Delivery:** Check inbox at `CONTACT_TO_EMAIL`
   - Professional email template with all submission details
   - Reply-to set to submitter's email address

#### Test 6: Production Error Scenarios
1. **Database Connection Issues:**
   - Look for: `{"type":"error","event":"database_operation_failed"}`
   - Response: `{"error":"Failed to save submission","code":"DB_INSERT_FAILED"}`
2. **Email Service Issues:**
   - Look for: `{"type":"error","event":"email_send_failed"}`
   - Database row exists with `status: 'failed'`
3. **Environment Variables Missing:**
   - Look for: `{"type":"error","event":"environment_validation_failed"}`
   - Response: `{"error":"Service temporarily unavailable","code":"ENV_CONFIG_ERROR"}`

### Manual Testing Commands

#### Production Verification Steps
```bash
# Step 1: Submit form on https://www.bnktech.net/contact
# Step 2: Check Vercel logs for these events:
# - database_save_success
# - email_sent_success
# Step 3: Verify Supabase row exists with status progression: new -> emailed
# Step 4: Check inbox received Resend email

# Check Vercel logs (replace with actual function name)
vercel logs --app=bnktech-website --since=1m

# Or check via Vercel dashboard:
# https://vercel.com/dashboard -> bnktech-website -> Functions -> View Logs
```

### Manual Testing Commands

```bash
# Check database directly (requires Supabase CLI)
supabase sql --db-url="YOUR_DB_URL" --query="SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;"

# Test API endpoint directly
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "API Test",
    "email": "api-test@example.com", 
    "service_needed": "Web Development",
    "project_details": "Testing the API endpoint directly",
    "website": ""
  }'
```

### Log Analysis

Look for these structured log patterns:

```json
// Successful submission
{"type":"contact","event":"database_save_success","submissionId":"uuid","ip":"127.0.0.1","timestamp":"2024-01-18T..."}

// Security event
{"type":"security","event":"honeypot_triggered","ip":"127.0.0.1","userAgent":"...","timestamp":"2024-01-18T..."}

// Error case
{"type":"error","event":"database_save_failed","error":"message","ip":"127.0.0.1","timestamp":"2024-01-18T..."}
```

### Common Issues & Solutions

1. **Database connection failed**
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
   - Check Supabase project is active
   - Ensure RLS policies allow service role access

2. **Email not sending**  
   - Verify `RESEND_API_KEY` is valid
   - Check `CONTACT_FROM_EMAIL` is verified domain in Resend
   - Review Resend dashboard for delivery status

3. **Build/deploy issues**
   - Check all env vars are set in Vercel
   - Verify no secrets in code (only `process.env.*`)
   - Review Vercel function logs

### Success Criteria
- ✅ Form submits successfully 
- ✅ Data saved to Supabase
- ✅ Email notification sent
- ✅ Status tracking works
- ✅ Security features active (honeypot, rate limiting)
- ✅ Error handling graceful
- ✅ No secrets exposed in logs/errors
