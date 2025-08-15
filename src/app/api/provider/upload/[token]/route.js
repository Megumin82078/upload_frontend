import { NextResponse } from 'next/server'
import { getBackendUrl, isDevMockMode, API_ENDPOINTS } from '@/lib/api-config'

export async function POST(request, { params }) {
  try {
    const { token } = params
    const formData = await request.formData()
    
    // For testing without backend, simulate successful upload
    if (isDevMockMode()) {
      const files = formData.getAll('files')
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return NextResponse.json({
        success: true,
        message: `Successfully uploaded ${files.length} files`,
        uploadId: `upload-${Date.now()}`,
        files: files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }))
      })
    }
    
    // Forward the request to the backend API
    // The backend expects OAuth2PasswordBearer authentication
    const backendUrl = getBackendUrl()
    const endpoint = API_ENDPOINTS.uploadFiles(token)
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      body: formData,
      headers: {
        // Add the token as Bearer authentication
        'Authorization': `Bearer ${token}`,
      }
      // Don't set Content-Type header - let fetch set it with boundary for multipart/form-data
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: 'Upload failed', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}