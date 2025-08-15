import { NextResponse } from 'next/server'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:8000'

export async function GET(request, { params }) {
  try {
    const { providerId } = params
    
    // For testing without backend, return a mock token
    if (BACKEND_API_URL === 'http://localhost:8000') {
      const token = `test-upload-token-${providerId}-${Date.now()}`
      return NextResponse.json({
        token: token,
        upload_url: `/api/provider/upload/${token}`
      })
    }
    
    // Forward the request to the backend API
    const response = await fetch(`${BACKEND_API_URL}/provider/upload-link/${providerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to get upload link' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error getting upload link:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}