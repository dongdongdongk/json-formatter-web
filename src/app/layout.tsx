import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'JSON Formatter & TypeScript Interface Generator',
  description: 'Format JSON and generate TypeScript interfaces automatically.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  redirect('/en')
}