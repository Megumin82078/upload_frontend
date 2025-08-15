// API configuration for handling backend URLs
// This configuration helps avoid CORS issues by using Next.js API routes as a proxy

export const getBackendUrl = () => {
  // In production on Netlify, use the environment variable
  // In development, use localhost
  return process.env.BACKEND_API_URL || 'http://localhost:8000'
}

// Helper to check if we're in development mode without a real backend
export const isDevMockMode = () => {
  const backendUrl = getBackendUrl()
  return backendUrl === 'http://localhost:8000'
}

// API endpoints configuration
export const API_ENDPOINTS = {
  // Provider endpoints
  getUploadLink: (providerId) => `/provider/upload-link/${providerId}`,
  uploadFiles: (token) => `/provider/upload/${token}`,
}