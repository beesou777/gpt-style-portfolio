import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bishwa Jung Shah - AI Portfolio',
  description: 'Interactive AI-powered portfolio of Bishwa Jung Shah, Web Developer & Web Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
