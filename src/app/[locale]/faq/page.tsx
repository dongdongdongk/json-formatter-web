import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FaqSection from '@/components/FaqSection'
import styles from './page.module.scss'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function FaqPage() {
  const t = useTranslations('faq')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section className={styles.hero}>
          <div className="container">
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <FaqSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}