# Netlify Deployment Guide

This guide explains how to deploy the Provider Upload Frontend to Netlify.

## Prerequisites

1. A Netlify account
2. Your backend API deployed and accessible (e.g., on Render, Heroku, etc.)
3. The backend API URL

## Deployment Steps

### 1. Connect Repository to Netlify

1. Log into your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub/GitLab/Bitbucket account
4. Select this repository

### 2. Configure Build Settings

Netlify should automatically detect the Next.js settings from `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `.next`

### 3. Set Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

```
BACKEND_API_URL = https://fhfastapi.onrender.com
```

Note: This is the base URL for the Fountain Health FastAPI backend. Do not include `/docs` or other paths.

### 4. Deploy

1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be available at a Netlify URL (e.g., `https://your-site.netlify.app`)

## How It Works

### API Proxy Architecture

The application uses Next.js API routes as a proxy to avoid CORS issues:

1. **Frontend** (`/src/components/ProviderUpload.js`):
   - Makes requests to `/api/provider/*` endpoints
   - These are relative URLs, so they go to the same domain

2. **Next.js API Routes** (`/src/app/api/provider/*`):
   - Receive requests from the frontend
   - Forward them to the actual backend using `BACKEND_API_URL`
   - Return the backend's response to the frontend

3. **Backend** (your deployed API):
   - Receives requests from the Next.js API routes
   - Processes them and returns responses

### File Structure

```
/src/
  /app/
    /api/
      /provider/
        /upload-link/[providerId]/route.js  # Proxy for getting upload tokens
        /upload/[token]/route.js            # Proxy for file uploads
  /components/
    ProviderUpload.js                       # Frontend component
  /lib/
    api-config.js                          # Centralized API configuration
```

## Testing

### Local Development

1. Set `BACKEND_API_URL` in `.env.local`:
   ```
   BACKEND_API_URL=https://your-backend-api.com
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

### Production Testing

After deployment, test the following:

1. Navigate to `/upload/[requestId]` with a valid request ID
2. Try uploading files
3. Check browser console for any CORS errors
4. Verify files are received by your backend

## Troubleshooting

### CORS Errors

If you still see CORS errors:
1. Ensure `BACKEND_API_URL` is set correctly in Netlify
2. Verify your backend is accessible from Netlify's servers
3. Check that the API routes are correctly forwarding requests

### Build Failures

1. Check the build logs in Netlify dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility (set to 18 in `netlify.toml`)

### API Route Issues

1. Check Next.js API route logs in Netlify Functions tab
2. Verify the backend is returning expected responses
3. Test API routes directly: `https://your-site.netlify.app/api/provider/upload-link/123`

## Security Notes

- Never commit `.env.local` or actual API URLs to version control
- Use environment variables for all sensitive configuration
- The upload token system should be properly implemented on the backend
- Consider adding rate limiting and authentication as needed