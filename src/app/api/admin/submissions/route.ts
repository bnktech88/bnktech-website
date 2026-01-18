import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Check authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Invalid authorization header' },
        { status: 401 }
      )
    }

    const password = authHeader.replace('Bearer ', '').trim()

    // Validate admin password
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Admin interface not configured' },
        { status: 503 }
      )
    }

    if (!password || password !== adminPassword) {
      console.warn('Admin submissions access attempt failed from IP:', 
        request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || 
        'unknown'
      )
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create secure server client
    const supabase = createServerClient()

    // Fetch submissions from database
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Database query error:', error.message)
      return NextResponse.json(
        { success: false, error: 'Database query failed' },
        { status: 500 }
      )
    }

    console.log('Admin submissions accessed successfully from IP:', 
      request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown'
    )

    return NextResponse.json({
      success: true,
      data: data || []
    })

  } catch (error) {
    console.error('Admin submissions error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
