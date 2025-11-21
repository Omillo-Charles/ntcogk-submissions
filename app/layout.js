import './globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export const metadata = {
  title: 'File Submissions - NTCG Kenya',
  description: 'Secure file submission portal for NTCG Kenya. Submit documents, reports, and files safely to our organization.',
  keywords: 'NTCG Kenya, file submission, document upload, secure portal, church submissions',
  authors: [{ name: 'NTCG Kenya' }],
  creator: 'NTCG Kenya',
  publisher: 'NTCG Kenya',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://submissions.ntcogk.org',
    siteName: 'NTCG Kenya Submissions',
    title: 'File Submissions - NTCG Kenya',
    description: 'Secure file submission portal for NTCG Kenya. Submit documents, reports, and files safely to our organization.',
    images: [
      {
        url: '/mainLogo.png',
        width: 1200,
        height: 630,
        alt: 'NTCG Kenya Logo',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'File Submissions - NTCG Kenya',
    description: 'Secure file submission portal for NTCG Kenya. Submit documents, reports, and files safely to our organization.',
    images: ['/mainLogo.png'],
    creator: '@ntcgkenya',
  },
  
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon.ico',
    apple: '/icons/favicon.ico',
  },
  
  other: {
    'theme-color': '#1E4E9A',
    'color-scheme': 'light',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="/fonts/weblysleekuisb.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "NTCG Kenya",
              "url": "https://ntcogk.org",
              "logo": "https://ntcogk.org/mainLogo.png",
              "description": "New Testament Church of God Kenya - A Christian organization serving communities across Kenya",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "Swahili"]
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1E4E9A] text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        <Navbar />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}