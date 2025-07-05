import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './page.module.scss'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function AboutPage() {
  const t = useTranslations('about')
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
            <div className={styles.section}>
              <h2>{t('intro.title')}</h2>
              <p>{t('intro.description')}</p>
            </div>

            <div className={styles.section}>
              <h2>{t('features.title')}</h2>
              <div className={styles.features}>
                <div className={styles.feature}>
                  <h3>{t('features.formatting.title')}</h3>
                  <ul>
                    <li>{t('features.formatting.items.0')}</li>
                    <li>{t('features.formatting.items.1')}</li>
                    <li>{t('features.formatting.items.2')}</li>
                  </ul>
                </div>
                <div className={styles.feature}>
                  <h3>{t('features.typescript.title')}</h3>
                  <ul>
                    <li>{t('features.typescript.items.0')}</li>
                    <li>{t('features.typescript.items.1')}</li>
                    <li>{t('features.typescript.items.2')}</li>
                    <li>{t('features.typescript.items.3')}</li>
                  </ul>
                </div>
                <div className={styles.feature}>
                  <h3>{t('features.convenience.title')}</h3>
                  <ul>
                    <li>{t('features.convenience.items.0')}</li>
                    <li>{t('features.convenience.items.1')}</li>
                    <li>{t('features.convenience.items.2')}</li>
                    <li>{t('features.convenience.items.3')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>{t('background.title')}</h2>
              <p>{t('background.paragraph1')}</p>
              <p>{t('background.paragraph2')}</p>
            </div>

            <div className={styles.section}>
              <h2>{t('differentiators.title')}</h2>
              <div className={styles.highlights}>
                <div className={styles.highlight}>
                  <h3>{t('differentiators.userFriendly.title')}</h3>
                  <p>{t('differentiators.userFriendly.description')}</p>
                </div>
                <div className={styles.highlight}>
                  <h3>{t('differentiators.realtime.title')}</h3>
                  <p>{t('differentiators.realtime.description')}</p>
                </div>
                <div className={styles.highlight}>
                  <h3>{t('differentiators.free.title')}</h3>
                  <p>{t('differentiators.free.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}