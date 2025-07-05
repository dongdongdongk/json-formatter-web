import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import JsonFormatter from '@/components/JsonFormatter'

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <JsonFormatter />
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}