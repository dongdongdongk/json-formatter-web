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
  const t = await getTranslations({ locale, namespace: 'guide' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default function GuidePage() {
  const t = useTranslations('guide')
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
              <h2>{t('quickStart.title')}</h2>
              <div className={styles.steps}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h3>{t('quickStart.steps.0.title')}</h3>
                    <p>{t('quickStart.steps.0.description')}</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h3>{t('quickStart.steps.1.title')}</h3>
                    <p>{t('quickStart.steps.1.description')}</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h3>{t('quickStart.steps.2.title')}</h3>
                    <p>{t('quickStart.steps.2.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>{t('features.title')}</h2>
              
              <div className={styles.featureDetail}>
                <h3>{t('features.jsonFormatting.title')}</h3>
                <div className={styles.feature}>
                  <h4>{t('features.jsonFormatting.formatting.title')}</h4>
                  <p>{t('features.jsonFormatting.formatting.description')}</p>
                  <div className={styles.example}>
                    <h5>{t('features.jsonFormatting.formatting.inputExample')}:</h5>
                    <pre>{`{"name":"홍길동","age":30,"skills":["JavaScript","TypeScript"]}`}</pre>
                    <h5>{t('features.jsonFormatting.formatting.outputExample')}:</h5>
                    <pre>{`{
  "name": "홍길동",
  "age": 30,
  "skills": [
    "JavaScript",
    "TypeScript"
  ]
}`}</pre>
                  </div>
                </div>

                <div className={styles.feature}>
                  <h4>{t('features.jsonFormatting.validation.title')}</h4>
                  <p>{t('features.jsonFormatting.validation.description')}</p>
                  <ul>
                    <li>{t('features.jsonFormatting.validation.items.0')}</li>
                    <li>{t('features.jsonFormatting.validation.items.1')}</li>
                    <li>{t('features.jsonFormatting.validation.items.2')}</li>
                  </ul>
                </div>
              </div>

              <div className={styles.featureDetail}>
                <h3>{t('features.typescript.title')}</h3>
                <div className={styles.feature}>
                  <h4>{t('features.typescript.autoInference.title')}</h4>
                  <p>{t('features.typescript.autoInference.description')}</p>
                  <div className={styles.example}>
                    <h5>{t('features.typescript.autoInference.jsonInput')}:</h5>
                    <pre>{`{
  "id": 1,
  "name": "홍길동",
  "active": true,
  "tags": ["개발자", "TypeScript"],
  "profile": {
    "email": "hong@example.com",
    "phone": "010-1234-5678"
  }
}`}</pre>
                    <h5>{t('features.typescript.autoInference.generatedInterface')}:</h5>
                    <pre>{`interface MyInterface {
  id: number
  name: string
  active: boolean
  tags: string[]
  profile: {
    email: string
    phone: string
  }
}`}</pre>
                  </div>
                </div>

                <div className={styles.feature}>
                  <h4>{t('features.typescript.customization.title')}</h4>
                  <p>{t('features.typescript.customization.description')}</p>
                  <ul>
                    <li>{t('features.typescript.customization.items.0')}</li>
                    <li>{t('features.typescript.customization.items.1')}</li>
                    <li>{t('features.typescript.customization.items.2')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>🔧 실무 활용 예시</h2>
              
              <div className={styles.useCase}>
                <h3>API 응답 데이터 타입 정의</h3>
                <p>백엔드 API에서 받은 응답 데이터를 바탕으로 프론트엔드에서 사용할 TypeScript 인터페이스를 생성합니다.</p>
                <div className={styles.example}>
                  <h4>시나리오:</h4>
                  <p>사용자 정보 API 응답 데이터 처리</p>
                  <pre>{`// API 응답 JSON
{
  "success": true,
  "data": {
    "user": {
      "id": 123,
      "username": "developer",
      "email": "dev@example.com",
      "profile": {
        "firstName": "개발",
        "lastName": "자",
        "avatar": "https://example.com/avatar.jpg"
      },
      "permissions": ["read", "write"],
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  }
}`}</pre>
                  <h4>생성된 인터페이스를 활용한 TypeScript 코드:</h4>
                  <pre>{`// 생성된 인터페이스 사용
interface ApiResponse {
  success: boolean
  data: {
    user: {
      id: number
      username: string
      email: string
      profile: {
        firstName: string
        lastName: string
        avatar: string
      }
      permissions: string[]
      lastLogin: string
    }
  }
}

// 실제 사용 예시
const fetchUserData = async (): Promise<ApiResponse> => {
  const response = await fetch('/api/user');
  return response.json();
};`}</pre>
                </div>
              </div>

              <div className={styles.useCase}>
                <h3>설정 파일 구조 분석</h3>
                <p>복잡한 설정 파일의 구조를 이해하고 TypeScript 타입을 생성합니다.</p>
                <div className={styles.example}>
                  <h4>package.json 구조 분석:</h4>
                  <pre>{`{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}`}</pre>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>💡 팁 & 트릭</h2>
              
              <div className={styles.tips}>
                <div className={styles.tip}>
                  <h3>🎯 효율적인 사용법</h3>
                  <ul>
                    <li><strong>키보드 단축키:</strong> Ctrl+A로 전체 선택 후 붙여넣기</li>
                    <li><strong>브라우저 북마크:</strong> 자주 사용하는 경우 북마크에 추가</li>
                    <li><strong>테스트 데이터:</strong> 개발 시 샘플 데이터로 활용</li>
                  </ul>
                </div>

                <div className={styles.tip}>
                  <h3>🔍 디버깅 팁</h3>
                  <ul>
                    <li><strong>오류 메시지 확인:</strong> 빨간색 오류 메시지를 자세히 읽어보세요</li>
                    <li><strong>단계별 검증:</strong> 복잡한 JSON은 부분적으로 나누어 검증</li>
                    <li><strong>따옴표 주의:</strong> 문자열은 반드시 큰따옴표 사용</li>
                  </ul>
                </div>

                <div className={styles.tip}>
                  <h3>⚡ 성능 최적화</h3>
                  <ul>
                    <li><strong>대용량 데이터:</strong> 10MB 이하 권장</li>
                    <li><strong>깊은 중첩:</strong> 너무 깊은 객체 구조는 피하세요</li>
                    <li><strong>배열 처리:</strong> 배열의 첫 번째 요소로 타입 추론</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>⚠️ 주의사항</h2>
              <div className={styles.warnings}>
                <div className={styles.warning}>
                  <h3>JSON 형식 규칙</h3>
                  <ul>
                    <li>문자열은 큰따옴표(")만 사용</li>
                    <li>마지막 요소 뒤에 쉼표 없음</li>
                    <li>주석 사용 불가</li>
                    <li>undefined 값 사용 불가 (null 사용)</li>
                  </ul>
                </div>
                <div className={styles.warning}>
                  <h3>개인정보 보호</h3>
                  <ul>
                    <li>민감한 정보는 입력하지 마세요</li>
                    <li>API 키나 비밀번호 제거 후 사용</li>
                    <li>실제 사용자 데이터 대신 더미 데이터 사용</li>
                  </ul>
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