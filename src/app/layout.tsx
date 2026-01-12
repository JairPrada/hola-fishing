import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { BookingProvider } from '@/components/booking/BookingProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hola Fishing Charters Puerto Rico - Local Waters, Local Knowledge, Unforgettable!',
  description: 'Experience the best deep sea fishing in Puerto Rico with Captain and our expert crew. Local waters, local knowledge, unforgettable fishing adventures.',
  keywords: 'fishing charters Puerto Rico, deep sea fishing, fishing trips, Puerto Rico fishing, charter boat',
  authors: [{ name: 'Hola Fishing Charters PR' }],
  openGraph: {
    title: 'Hola Fishing Charters Puerto Rico',
    description: 'Local Waters, Local Knowledge, Unforgettable!',
    type: 'website',
  }
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