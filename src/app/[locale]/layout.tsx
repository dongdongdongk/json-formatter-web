import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'
import { locales } from '@/i18n/config'
import '@/styles/globals.scss'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'JSON Formatter & TypeScript Interface Generator',
    ko: 'JSON 포맷터 & TypeScript 인터페이스 생성기',
    ja: 'JSON フォーマッター & TypeScript インターフェース生成器'
  }
  
  const descriptions = {
    en: 'Format JSON and automatically generate TypeScript interfaces with our free online tool.',
    ko: 'JSON을 깔끔하게 포맷하고 TypeScript 인터페이스를 자동으로 생성하는 도구입니다.',
    ja: '無料のオンラインツールでJSONをフォーマットし、TypeScriptインターフェースを自動生成します。'
  }

  const title = titles[locale as keyof typeof titles] || titles.en
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en
  const baseUrl = 'https://jsonformatter.roono.net'

  const alternates: Record<string, string> = {}
  locales.forEach(loc => {
    alternates[loc] = `${baseUrl}/${loc}`
  })

  return {
    title,
    description,
    keywords: ['JSON formatter', 'JSON 포맷터', 'TypeScript interface generator', 'JSON to TypeScript', 'JSON validator', 'JSON beautifier'],
    authors: [{ name: 'JSON Formatter Web' }],
    alternates: {
      canonical: `${baseUrl}/en`,
      languages: alternates
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'JSON Formatter',
      locale: locale === 'ko' ? 'ko_KR' : locale === 'ja' ? 'ja_JP' : 'en_US',
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    other: {
      'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": title,
        "description": description,
        "url": `${baseUrl}/${locale}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })
    }
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div id="root">{children}</div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}