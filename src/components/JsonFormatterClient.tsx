'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const JsonFormatter = dynamic(() => import('./JsonFormatter'), {
  loading: () => (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(248, 249, 250, 0.6) 0%, var(--primary-bg) 100%)',
      borderTop: '1px solid var(--border-light)'
    }}>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '1.1rem'
      }}>
        JSON 포맷터를 로딩 중...
      </div>
    </div>
  ),
  ssr: false
})

export default function JsonFormatterClient() {
  return (
    <Suspense fallback={
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        minHeight: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem'
        }}>
          로딩 중...
        </div>
      </div>
    }>
      <JsonFormatter />
    </Suspense>
  )
}