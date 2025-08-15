'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn, formatFileSize } from '@/lib/utils'
import { UploadIcon, FileIcon, XIcon, CheckCircleIcon, AlertCircleIcon, InfoIcon, ShieldCheckIcon } from './Icons'

const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export default function ProviderUpload({ providerRequestId, patientName }) {
  const [files, setFiles] = useState([])
  const [uploadToken, setUploadToken] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadComplete, setUploadComplete] = useState(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setUploadError(null)
    
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(({ file, errors }) => {
        const errorMessages = errors.map((e) => {
          if (e.code === 'file-too-large') return `${file.name} is too large (max 10MB)`
          if (e.code === 'file-invalid-type') return `${file.name} is not a supported file type`
          return e.message
        }).join(', ')
        return errorMessages
      }).join('; ')
      
      setUploadError(errors)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true
  })

  const removeFile = (fileId) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId)
      if (file?.preview) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== fileId)
    })
  }

  const getUploadToken = async () => {
    try {
      console.log('Fetching upload token for provider request:', providerRequestId)
      const response = await fetch(`/api/provider/upload-link/${providerRequestId}`)
      console.log('Upload token response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.text()
        console.error('Failed to get upload link:', errorData)
        throw new Error('Failed to get upload link')
      }
      
      const data = await response.json()
      console.log('Upload token data:', data)
      
      // The backend might return the token in different formats
      return data.token || data.upload_token || data.access_token || providerRequestId
    } catch (error) {
      console.error('Error getting upload token:', error)
      throw error
    }
  }

  const uploadFiles = async () => {
    if (files.length === 0) return
    
    setIsUploading(true)
    setUploadError(null)
    
    try {
      // Get upload token if we don't have one
      let token = uploadToken
      if (!token) {
        token = await getUploadToken()
        setUploadToken(token)
      }
      
      // Update all files to uploading status
      setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' })))
      
      // Create FormData and add all files
      const formData = new FormData()
      files.forEach(({ file }) => {
        formData.append('files', file)
      })
      
      // Upload files
      console.log('Uploading files to:', `/api/provider/upload/${token}`)
      console.log('Number of files:', files.length)
      
      const response = await fetch(`/api/provider/upload/${token}`, {
        method: 'POST',
        body: formData
      })
      
      console.log('Upload response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Upload failed:', errorText)
        throw new Error('Upload failed')
      }
      
      // Update all files to success status
      setFiles(prev => prev.map(f => ({ ...f, status: 'success' })))
      setUploadComplete(true)
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Failed to upload files. Please try again.')
      setFiles(prev => prev.map(f => ({ 
        ...f, 
        status: 'error',
        error: 'Upload failed'
      })))
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (file) => {
    if (file.type.includes('pdf')) return '📄'
    if (file.type.includes('image')) return '🖼️'
    if (file.type.includes('doc')) return '📝'
    return '📎'
  }

  return (
    <div>
      {/* Success Message */}
      {uploadComplete && (
        <div className="mb-8 animate-fade-luxe">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Documents Successfully Uploaded!</h3>
                <p className="text-gray-700 mb-4">
                  The patient's medical records have been securely transmitted to Fountain Health on behalf of {patientName || 'your patient'}.
                </p>
                <div className="bg-white bg-opacity-70 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    All files encrypted during transmission
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Patient will be notified of the upload
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    Documents added to patient's health record
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Upload Section */}
      <div className={cn(
        "transition-all duration-500",
        uploadComplete && "opacity-60"
      )}>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden",
            isDragActive ? "border-black bg-gray-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
            isUploading && "pointer-events-none opacity-60"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />
          <input {...getInputProps()} />
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <UploadIcon className="w-12 h-12 text-gray-600" />
            </div>
            <p className="text-2xl font-medium text-gray-900 mb-2">
              {isDragActive ? "Drop patient files here" : "Drag & drop patient files"}
            </p>
            <p className="text-gray-600 mb-6">or click to browse from your computer</p>
            <div className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Select Patient Files
            </div>
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span>PDF, JPG, PNG, DOC, DOCX</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span>Max 10MB per file</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span>Multiple files allowed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start animate-fade-luxe">
            <AlertCircleIcon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Upload Error</p>
              <p className="text-sm text-red-700 mt-1">{uploadError}</p>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-black">Patient Files ({files.length})</h3>
              {!uploadComplete && (
                <p className="text-sm text-gray-500">
                  Review files before uploading to patient's record
                </p>
              )}
            </div>
            <div className="space-y-3">
              {files.map(({ file, id, status, preview }) => (
                <div
                  key={id}
                  className={cn(
                    "bg-gray-50 border rounded-xl p-5 flex items-center justify-between transition-all duration-300",
                    status === 'success' && "bg-green-50 border-green-200",
                    status === 'error' && "bg-red-50 border-red-200",
                    status === 'uploading' && "bg-blue-50 border-blue-200",
                    status === 'pending' && "border-gray-200 hover:border-gray-300 hover:shadow-subtle"
                  )}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 flex items-center justify-center bg-white rounded-lg shadow-sm">
                      {preview ? (
                        <img src={preview} alt={file.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-2xl">{getFileIcon(file)}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {status === 'success' && (
                      <div className="flex items-center text-green-600">
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Uploaded</span>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="flex items-center text-red-600">
                        <AlertCircleIcon className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Failed</span>
                      </div>
                    )}
                    {status === 'uploading' && (
                      <div className="flex items-center text-blue-600">
                        <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mr-2" />
                        <span className="text-sm font-medium">Uploading...</span>
                      </div>
                    )}
                    {status === 'pending' && !isUploading && (
                      <button
                        onClick={() => removeFile(id)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        aria-label="Remove file"
                      >
                        <XIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && !uploadComplete && (
          <div className="mt-8">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div>
                <p className="font-medium text-gray-900">Ready to upload to patient's health record?</p>
                <p className="text-sm text-gray-600 mt-1">
                  These documents will be securely transmitted and stored in the patient's Fountain Health account.
                </p>
              </div>
              <button
                onClick={uploadFiles}
                disabled={isUploading}
                className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all duration-300",
                  "bg-gradient-to-r from-gray-900 to-black text-white",
                  "hover:shadow-luxurious hover:-translate-y-0.5",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                )}
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                    Uploading Patient Files...
                  </span>
                ) : (
                  'Upload to Patient Record'
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}