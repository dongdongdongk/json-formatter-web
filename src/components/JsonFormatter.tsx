'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import styles from './JsonFormatter.module.scss'

export default function JsonFormatter() {
  const t = useTranslations('formatter')
  const [jsonInput, setJsonInput] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [typescriptInterface, setTypescriptInterface] = useState('')
  const [error, setError] = useState('')
  const [interfaceName, setInterfaceName] = useState('MyInterface')

  const formatJson = useCallback((input: string) => {
    if (!input.trim()) {
      setFormattedJson('')
      setTypescriptInterface('')
      setError('')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setFormattedJson(formatted)
      setError('')
      
      // TypeScript 인터페이스 생성
      const tsInterface = generateTypeScriptInterface(parsed, interfaceName)
      setTypescriptInterface(tsInterface)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'JSON 파싱 오류가 발생했습니다.')
      setFormattedJson('')
      setTypescriptInterface('')
    }
  }, [interfaceName])

  const generateTypeScriptInterface = (obj: any, name: string): string => {
    const getType = (value: any): string => {
      if (value === null) return 'null'
      if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]'
        const itemType = getType(value[0])
        return `${itemType}[]`
      }
      if (typeof value === 'object') {
        const properties = Object.entries(value)
          .map(([key, val]) => `  ${key}: ${getType(val)}`)
          .join('\n')
        return `{\n${properties}\n}`
      }
      return typeof value
    }

    return `interface ${name} ${getType(obj)}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setJsonInput(value)
    formatJson(value)
  }

  const handleInterfaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value || 'MyInterface'
    setInterfaceName(name)
    if (jsonInput.trim()) {
      formatJson(jsonInput)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // TODO: 복사 성공 알림 추가
    } catch (err) {
      console.error('복사 실패:', err)
    }
  }

  return (
    <section className={styles.formatter}>
      <div className="container">
        <h2 className={styles.title}>{t('title')}</h2>
        
        <div className={styles.tools}>
          <div className={styles.inputSection}>
            <h3>{t('input.title')}</h3>
            <textarea
              value={jsonInput}
              onChange={handleInputChange}
              placeholder={t('input.placeholder')}
              className={styles.textarea}
            />
            {error && <div className={styles.error}>{error}</div>}
          </div>

          <div className={styles.outputSection}>
            <div className={styles.outputBlock}>
              <div className={styles.outputHeader}>
                <h3>{t('output.json')}</h3>
                <button 
                  onClick={() => copyToClipboard(formattedJson)}
                  className={styles.copyButton}
                  disabled={!formattedJson}
                >
                  {t('output.copy')}
                </button>
              </div>
              <pre className={styles.codeBlock}>
                {formattedJson || t('output.jsonPlaceholder')}
              </pre>
            </div>

            <div className={styles.outputBlock}>
              <div className={styles.outputHeader}>
                <h3>{t('output.interface')}</h3>
                <input
                  type="text"
                  value={interfaceName}
                  onChange={handleInterfaceNameChange}
                  className={styles.interfaceNameInput}
                  placeholder={t('output.interfaceName')}
                />
                <button 
                  onClick={() => copyToClipboard(typescriptInterface)}
                  className={styles.copyButton}
                  disabled={!typescriptInterface}
                >
                  {t('output.copy')}
                </button>
              </div>
              <pre className={styles.codeBlock}>
                {typescriptInterface || t('output.interfacePlaceholder')}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}