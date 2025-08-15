import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // For now, we'll serve the HTML file. In production, you'd convert this to PDF
    const filePath = path.join(process.cwd(), 'public', 'patient-authorization-sample.html')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // Return HTML as downloadable file
    return new Response(fileContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename="patient-authorization-fountain-health.html"',
        'Content-Length': fileContent.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error serving authorization document:', error)
    return NextResponse.json(
      { error: 'Document not found' },
      { status: 404 }
    )
  }
}