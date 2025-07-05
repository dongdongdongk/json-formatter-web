import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jsonformatter.roono.net'
  const pages = ['', '/about', '/guide', '/faq']
  
  const routes: MetadataRoute.Sitemap = []
  
  // 각 로케일과 페이지 조합으로 URL 생성
  locales.forEach(locale => {
    pages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page === '/about' || page === '/guide' ? 0.8 : 0.6,
      })
    })
  })
  
  return routes
}