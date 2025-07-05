import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

const JsonFormatter = dynamic(() => import('@/components/JsonFormatter'), {
  loading: () => (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div>JSON 포맷터를 로딩 중...</div>
    </div>
  ),
  ssr: false
})

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <Suspense fallback={<div>로딩 중...</div>}>
          <JsonFormatter />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}