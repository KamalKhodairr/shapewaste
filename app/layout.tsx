import type { Metadata } from 'next'
import './globals.css'
import { orgSchema } from '@/lib/seo'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    default: 'shapewaste — Gulf business waste, valued and compliant',
    template: '%s | shapewaste',
  },
  description:
    'The commercial and compliance case for Gulf business waste — regulations, recoverable value, and licensed providers for Saudi Arabia and the UAE.',
  metadataBase: new URL('https://shapewaste.com'),
  openGraph: {
    siteName: 'shapewaste',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'shapewaste' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
