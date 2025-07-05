'use client'

import { useTranslations } from 'next-intl'
import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>
            {t('title')}
          </h1>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>{t('features.validation.title')}</h3>
              <p>{t('features.validation.description')}</p>
            </div>
            <div className={styles.feature}>
              <h3>{t('features.generation.title')}</h3>
              <p>{t('features.generation.description')}</p>
            </div>
            <div className={styles.feature}>
              <h3>{t('features.copy.title')}</h3>
              <p>{t('features.copy.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}