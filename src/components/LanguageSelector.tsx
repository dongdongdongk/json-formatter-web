'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config'
import styles from './LanguageSelector.module.scss'

interface LanguageSelectorProps {
  currentLocale: Locale
}

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (locale: Locale) => {
    setIsOpen(false)
    
    // 현재 언어와 동일한 경우 아무것도 하지 않음
    if (locale === currentLocale) {
      return
    }
    
    // 현재 경로에서 언어 코드 제거
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    
    // 새로운 언어로 경로 생성 (모든 언어가 경로에 포함됨)
    const newPath = `/${locale}${pathWithoutLocale}`
    
    console.log('Language change:', {
      from: currentLocale,
      to: locale,
      currentPath: pathname,
      pathWithoutLocale: pathWithoutLocale,
      newPath: newPath
    })
    
    // 페이지 이동
    window.location.href = newPath
  }

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
        aria-label="언어 선택"
      >
        <span className={styles.flag}>{localeFlags[currentLocale]}</span>
        <span className={styles.name}>{localeNames[currentLocale]}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleLanguageChange(locale)}
              className={`${styles.option} ${locale === currentLocale ? styles.active : ''}`}
            >
              <span className={styles.flag}>{localeFlags[locale]}</span>
              <span className={styles.name}>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}