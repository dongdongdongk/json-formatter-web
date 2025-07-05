import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Formatter & TypeScript Interface Generator',
  description: 'Format JSON and generate TypeScript interfaces automatically.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}