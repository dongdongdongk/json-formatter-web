import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import JsonFormatterClient from '@/components/JsonFormatterClient'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <JsonFormatterClient />
      </main>
      <Footer />
    </div>
  )
}