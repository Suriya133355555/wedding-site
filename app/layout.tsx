import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B.S. Karthikeyan & M. Divya Shree — Wedding Invitation',
  description:
    'Sri Aanai Kutty Muneeswaran Thunai / Sri Murugan Thunai. We cordially invite you to celebrate the wedding of B.S. Karthikeyan & M. Divya Shree on Sunday 1st November 2026 at Jayam Mahal Thirumana Mandapam, Villupuram.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
