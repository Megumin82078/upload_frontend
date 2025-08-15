'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the upload page
    router.push('/upload/test-request-id')
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-logo text-4xl font-bold text-black mb-4">Fountain</h1>
        <p className="text-gray-600">Redirecting to upload page...</p>
      </div>
    </main>
  )
}