# CORS Issue Solution: Netlify Proxy Configuration

## Problem
When deploying a frontend to Netlify that needs to communicate with a backend API hosted elsewhere (e.g., Render, Heroku), you may encounter CORS errors:

```
Access to XMLHttpRequest at 'https://your-backend.com/api' from origin 'https://your-frontend.netlify.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution: Use Netlify's Proxy/Redirect Feature

### Step 1: Create/Update `netlify.toml`
Create a `netlify.toml` file in your project root with the following configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"  # or "build" for Create React App

# API Proxy - routes /api/* requests to your backend
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.com/:splat"
  status = 200
  force = true

# SPA Support - must come after API proxy
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Update Your API Configuration
Modify your frontend API configuration to always use the `/api` prefix:

```javascript
// src/config/api.js or similar
export const getApiBaseUrl = () => {
  // Always use /api prefix - handled by Vite proxy in dev, Netlify proxy in production
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();
```

### Step 3: Ensure Vite Proxy for Development (if using Vite)
Your `vite.config.js` should have a proxy configuration for local development:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://your-backend-url.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### Step 4: Build and Deploy
1. Run `npm run build` to create production build
2. Commit and push all changes including `netlify.toml`
3. Deploy to Netlify

## How It Works
- **Development**: Requests to `/api/*` are proxied by Vite to your backend
- **Production**: Requests to `/api/*` are proxied by Netlify to your backend
- **Result**: All API requests appear to come from the same origin, bypassing CORS restrictions

## Important Notes
1. The order of redirects in `netlify.toml` matters - API proxy must come before the SPA catch-all
2. Use `force = true` to ensure the proxy rule takes precedence
3. The `:splat` placeholder passes the rest of the URL path to your backend
4. This solution works even if your backend doesn't have CORS configured

## Example API Calls
- Frontend request: `GET /api/healthz`
- Proxied to: `GET https://your-backend-url.com/healthz`

- Frontend request: `POST /api/auth/signup`
- Proxied to: `POST https://your-backend-url.com/auth/signup`

## Alternative Solutions
If you can't use the proxy approach:
1. Configure CORS on your backend to allow your Netlify domain
2. Use environment variables for different API URLs (dev vs production)
3. Use a dedicated API gateway service

The proxy solution is often the simplest and most reliable approach for CORS issues.