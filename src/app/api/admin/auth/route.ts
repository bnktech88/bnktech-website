import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Validate input
    if (!password || typeof password !== 'string' || password.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Check if admin password is configured
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin interface not configured' },
        { status: 503 }
      )
    }

    // Simple password check with timing attack protection
    const providedPassword = password.trim()
    const isValid = providedPassword === adminPassword

    // Add delay regardless of result to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (isValid) {
      return NextResponse.json({ success: true })
    }

    // Log failed attempt for security monitoring
    console.warn('Admin login attempt failed from IP:', 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown'
    )

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
