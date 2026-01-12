import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BookingProvider } from '@/components/booking/BookingProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hola Fishing | Puerto Rico Fishing Charters - Unforgettable Experience',
  description: 'Discover the best sport fishing experience in Puerto Rico with Hola Fishing. Custom fishing tours with expert captain, professional equipment, and local waters. Book your adventure today!',
  keywords: 'hola fishing, puerto rico fishing, fishing charters, sport fishing, deep sea fishing, fishing tours, fishing charters pr, puerto rico fishing trips',
  authors: [{ name: 'Hola Fishing Puerto Rico' }],
  creator: 'Hola Fishing',
  publisher: 'Hola Fishing',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Hola Fishing | Puerto Rico Fishing Charters',
    description: 'The best sport fishing experience in Puerto Rico. Local waters, expert knowledge, unforgettable adventures.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Hola Fishing',
    images: [
      {
        url: '/landing/bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Hola Fishing - Puerto Rico Fishing Charters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hola Fishing | Puerto Rico Fishing Charters',
    description: 'Unforgettable sport fishing experience with expert captain and professional equipment.',
    images: ['/landing/bg.jpg'],
  },
  alternates: {
    canonical: 'https://holafishing.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  )
}