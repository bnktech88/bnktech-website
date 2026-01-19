import { createClient } from '@supabase/supabase-js'

// Browser client (safe for client-side)
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing public Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
}

// Server admin client (SECRET - server-only)
export function createServerClient() {
  // CRITICAL: This must NEVER be called on client-side
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: Server client attempted on client-side')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing required server Supabase environment variables')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export interface ContactSubmission {
  id?: string
  created_at?: string
  full_name: string
  email: string
  phone?: string | null
  company?: string | null
  service_needed?: string | null
  project_details: string
  page_url?: string | null
  user_agent?: string | null
  ip?: string | null
  status?: 'new' | 'emailed' | 'failed'
  meta?: Record<string, any> | null
}
