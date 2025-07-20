import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jsonformatter.roono.net'
  const pages = ['', '/about', '/guide', '/faq']
  
  const routes: MetadataRoute.Sitemap = []
  
  // 페이지별 lastModified 설정 (실제 수정 날짜 반영)
  const pageLastModified = {
    '': new Date('2025-01-15'), // 메인 페이지
    '/about': new Date('2025-01-10'), // About 페이지
    '/guide': new Date('2025-01-12'), // Guide 페이지
    '/faq': new Date('2025-01-08'), // FAQ 페이지
  }
  
  // 각 로케일과 페이지 조합으로 URL 생성
  locales.forEach(locale => {
    pages.forEach(page => {
      // 언어별 대체 URL 생성
      const alternates = locales
        .filter(l => l !== locale)
        .map(altLocale => ({
          url: `${baseUrl}/${altLocale}${page}`,
          hreflang: altLocale
        }))
      
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: pageLastModified[page as keyof typeof pageLastModified] || new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page === '/about' || page === '/guide' ? 0.8 : 0.6,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map(l => [l, `${baseUrl}/${l}${page}`])
            ),
            'x-default': `${baseUrl}/en${page}`
          }
        }
      })
    })
  })
  
  return routes
}