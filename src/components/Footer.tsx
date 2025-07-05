'use client'

import { useTranslations } from 'next-intl'
import styles from './Footer.module.scss'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <p>{t('copyright')}</p>
          <p>{t('description')}</p>
        </div>
      </div>
    </footer>
  )
}