// Simple in-memory rate limiter for serverless environments
// In production with high traffic, consider using Upstash Redis or similar

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

export function checkRateLimit(
  identifier: string, 
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxRequests: 5 }
): { allowed: boolean; resetTime: number; remaining: number } {
  const now = Date.now()
  const resetTime = now + config.windowMs
  
  // Clean up expired entries occasionally
  if (Math.random() < 0.1) {
    cleanupExpiredEntries(now)
  }

  const entry = rateLimitStore.get(identifier)
  
  if (!entry || now >= entry.resetTime) {
    // First request or window expired
    rateLimitStore.set(identifier, { count: 1, resetTime })
    return { 
      allowed: true, 
      resetTime, 
      remaining: config.maxRequests - 1 
    }
  }
  
  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return { 
      allowed: false, 
      resetTime: entry.resetTime, 
      remaining: 0 
    }
  }
  
  // Increment counter
  entry.count++
  return { 
    allowed: true, 
    resetTime: entry.resetTime, 
    remaining: config.maxRequests - entry.count 
  }
}

function cleanupExpiredEntries(now: number): void {
  const entries = Array.from(rateLimitStore.entries())
  for (const [key, entry] of entries) {
    if (now >= entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

export function getRateLimitStatus(identifier: string): { count: number; resetTime: number } | null {
  return rateLimitStore.get(identifier) || null
}
