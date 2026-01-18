// Environment variable validation and runtime guards
// This module ensures all required environment variables are present
// and provides type-safe access to them

interface RequiredServerEnvVars {
  SUPABASE_SERVICE_ROLE_KEY: string
  NEXT_PUBLIC_SUPABASE_URL: string
}

interface OptionalServerEnvVars {
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string
  RESEND_API_KEY?: string
  CONTACT_FROM_EMAIL?: string
  CONTACT_TO_EMAIL?: string
  CONTACT_REPLY_TO_EMAIL?: string
  ADMIN_PASSWORD?: string
  TURNSTILE_SECRET_KEY?: string
  NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string
}

interface EnvValidationResult {
  isValid: boolean
  missingVars: string[]
  warnings: string[]
}

export function validateRequiredEnvVars(): EnvValidationResult {
  const missingVars: string[] = []
  const warnings: string[] = []

  // Check required server-side variables
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missingVars.push('SUPABASE_SERVICE_ROLE_KEY')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  }

  // Check optional but recommended variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    warnings.push('NEXT_PUBLIC_SUPABASE_ANON_KEY not set - client-side Supabase features disabled')
  }

  if (!process.env.RESEND_API_KEY) {
    warnings.push('RESEND_API_KEY not set - email notifications disabled')
  }

  if (!process.env.CONTACT_FROM_EMAIL) {
    warnings.push('CONTACT_FROM_EMAIL not set - using default sender address')
  }

  if (!process.env.CONTACT_TO_EMAIL) {
    warnings.push('CONTACT_TO_EMAIL not set - using default recipient')
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    warnings
  }
}

export function getValidatedEnvVars(): RequiredServerEnvVars & OptionalServerEnvVars {
  const validation = validateRequiredEnvVars()
  
  if (!validation.isValid) {
    throw new Error(`Missing required environment variables: ${validation.missingVars.join(', ')}`)
  }

  // Log warnings in development
  if (process.env.NODE_ENV === 'development' && validation.warnings.length > 0) {
    console.warn('Environment variable warnings:')
    validation.warnings.forEach(warning => console.warn(`- ${warning}`))
  }

  return {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_REPLY_TO_EMAIL: process.env.CONTACT_REPLY_TO_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  }
}

// Runtime validation for server-side operations
export function assertServerEnvVars(operation: string): void {
  if (typeof window !== 'undefined') {
    throw new Error(`${operation} attempted on client-side - this is a security violation`)
  }

  const validation = validateRequiredEnvVars()
  if (!validation.isValid) {
    throw new Error(`Cannot perform ${operation}: missing required environment variables: ${validation.missingVars.join(', ')}`)
  }
}

// Safe environment variable getter with fallbacks
export function getEnvVar(key: keyof (RequiredServerEnvVars & OptionalServerEnvVars), fallback?: string): string | undefined {
  const value = process.env[key]
  if (value) return value
  if (fallback !== undefined) return fallback
  return undefined
}

// Validate that client-side code only uses NEXT_PUBLIC_ variables
export function validateClientEnvAccess(envKey: string): boolean {
  if (typeof window !== 'undefined' && !envKey.startsWith('NEXT_PUBLIC_')) {
    console.error(`Security violation: Attempt to access server environment variable '${envKey}' on client-side`)
    return false
  }
  return true
}
