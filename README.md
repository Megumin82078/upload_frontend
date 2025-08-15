# Fountain Provider Upload Frontend

A minimalist, luxury-styled document upload interface for medical providers to securely upload patient documents.

## Features

- Drag-and-drop file upload interface
- Multiple file selection support
- File type validation (PDF, JPG, PNG, DOC, DOCX)
- File size validation (max 10MB per file)
- Real-time upload progress indicators
- Success/error state management
- Responsive design for mobile and desktop
- Fountain's monochrome luxury design system

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- react-dropzone for file uploads
- Axios for API communication

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables:
```bash
cp .env.example .env.local
```

3. Update the `BACKEND_API_URL` in `.env.local` to point to your backend API.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the application.

## API Integration

The application integrates with two backend endpoints:

1. **GET `/provider/upload-link/{provider_request_id}`**
   - Retrieves the upload token for a specific provider request

2. **POST `/provider/upload/{token}`**
   - Uploads multiple files using the obtained token
   - Accepts multipart/form-data with files array

## Usage Flow

1. Providers receive a unique link: `/upload/{provider-request-id}`
2. The page fetches an upload token using the provider request ID
3. Providers can drag-and-drop or select files to upload
4. Files are validated for type and size
5. Upon clicking "Upload Documents", files are sent to the backend
6. Success confirmation is displayed after successful upload

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── provider/
│   │       ├── upload-link/[providerId]/route.ts
│   │       └── upload/[token]/route.ts
│   ├── upload/[requestId]/page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ProviderUpload.tsx
│   └── Icons.tsx
└── lib/
    └── utils.ts
```

## Styling

The application follows Fountain's luxury monochrome design system:
- Pure black and white palette with sophisticated gray scales
- Jost font family for UI elements
- Playfair Display for the logo
- Elegant shadows and smooth transitions
- Minimalist layout with purposeful whitespace# upload_frontend
# upload_frontend
# upload_frontend
