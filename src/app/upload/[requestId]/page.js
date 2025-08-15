'use client'

import ProviderUpload from '@/components/ProviderUpload'
import { useState, useEffect } from 'react'

export default function UploadPage({ params }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full opacity-20 blur-3xl" />
      </div>
      
      <div className="relative container mx-auto py-8 px-4">
        {/* Professional Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="font-logo text-4xl md:text-5xl font-bold text-black">Fountain</h1>
              <div className="hidden md:block h-8 w-px bg-gray-300" />
              <div className="hidden md:block">
                <p className="text-sm text-gray-500">Healthcare Provider Portal</p>
                <p className="text-xs text-gray-400">{currentTime.toLocaleString()}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Secure Connection</span>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto">
          {/* Request Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium">
                Document Request
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-xl text-sm font-medium">
                Request ID: {params.requestId}
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">Medical Records Request from Fountain Health</h2>
            <p className="text-gray-600">Please upload the requested documents for your patient</p>
          </div>

          {/* Combined Request & Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Request Details Section */}
            <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Patient Information
                  </h3>
                  <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <p className="font-semibold text-gray-900 text-lg">John Michael Smith</p>
                    <p className="text-gray-600 mt-1">Date of Birth: March 15, 1985</p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900 font-medium mb-1">Patient Note:</p>
                      <p className="text-sm text-blue-800 italic">"Please include all recent lab work and imaging from my cardiology visits"</p>
                    </div>
                  </div>
                </div>

                {/* Documents Requested */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documents Requested
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900">Complete Medical Records</p>
                      <p className="text-sm text-gray-600 mt-0.5">January 1, 2023 - December 31, 2023</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900">Lab Results & Imaging</p>
                      <p className="text-sm text-gray-600 mt-0.5">All test results from the past 12 months</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900">Prescription History</p>
                      <p className="text-sm text-gray-600 mt-0.5">Current medications and dosages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authorization Notice */}
              <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">Patient Authorization on File</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Fountain Health has been authorized by <strong>John Michael Smith</strong> to collect these medical records 
                      as part of their comprehensive health record management.
                    </p>
                    <div className="flex items-center space-x-4">
                      <a 
                        href="/api/documents/patient-authorization.pdf" 
                        target="_blank"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download Patient Authorization
                      </a>
                      <span className="text-xs text-gray-500">Signed: January 5, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">Upload Documents Below</span>
              </div>
            </div>

            {/* Upload Section */}
            <div className="p-8">
              <ProviderUpload 
                providerRequestId={params.requestId}
                patientName="John Michael Smith"
              />
            </div>
          </div>

          {/* Security Footer */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>Secure Transfer</span>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div className="mb-4 md:mb-0">
              <p>© 2025 Fountain Health. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-gray-700 transition-colors">Provider Agreement</a>
              <a href="#" className="hover:text-gray-700 transition-colors">HIPAA Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support: 1-800-FOUNTAIN</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}