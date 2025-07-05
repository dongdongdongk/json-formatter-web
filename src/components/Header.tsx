'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSelector from './LanguageSelector'
import { type Locale } from '@/i18n/config'
import styles from './Header.module.scss'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale() as Locale

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/icon.png" 
              alt="JSON Formatter Icon" 
              width={32} 
              height={32}
              className={styles.logoIcon}
            />
            {t('logo')}
          </Link>
          
          <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
            <Link href="/" className={styles.link}>
              {t('home')}
            </Link>
            <Link href="/about" className={styles.link}>
              {t('about')}
            </Link>
            <Link href="/guide" className={styles.link}>
              {t('guide')}
            </Link>
            <Link href="/faq" className={styles.link}>
              {t('faq')}
            </Link>
            <div className={styles.controls}>
              <LanguageSelector currentLocale={locale} />
            </div>
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기/닫기"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}