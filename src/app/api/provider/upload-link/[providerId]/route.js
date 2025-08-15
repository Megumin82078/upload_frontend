import { NextResponse } from 'next/server'
import { getBackendUrl, isDevMockMode, API_ENDPOINTS } from '@/lib/api-config'

export async function GET(request, { params }) {
  try {
    const { providerId } = params
    
    // For testing without backend, return a mock token
    if (isDevMockMode()) {
      const token = `test-upload-token-${providerId}-${Date.now()}`
      return NextResponse.json({
        token: token,
        upload_url: `/api/provider/upload/${token}`
      })
    }
    
    // Forward the request to the backend API
    const backendUrl = getBackendUrl()
    const endpoint = API_ENDPOINTS.getUploadLink(providerId)
    const response = await fetch(`${backendUrl}${endpoint}`, {
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