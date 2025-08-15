import './globals.css'

export const metadata = {
  title: 'Fountain - Provider Document Upload',
  description: 'Upload medical documents securely',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-white text-black">{children}</body>
    </html>
  )
}