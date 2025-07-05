# JSON 포맷터 구현 가이드

## 📋 프로젝트 개요

JSON 포맷터 & TypeScript 인터페이스 생성기는 압축된 JSON을 깔끔하게 정리하고 TypeScript 인터페이스를 자동으로 생성하는 웹 애플리케이션입니다.

## 🏗️ 기술 스택

### 핵심 기술
- **프레임워크**: Next.js 15.3.5 (App Router)
- **언어**: TypeScript
- **스타일링**: SCSS with CSS Modules
- **다국어**: next-intl
- **분석**: Vercel Analytics
- **배포**: Vercel (https://jsonformatter.roono.net)

### 의존성 패키지
```json
{
  "next": "15.3.5",
  "react": "19.0.0", 
  "next-intl": "^3.29.0",
  "@vercel/analytics": "^1.4.0",
  "sass": "^1.83.0"
}
```

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── [locale]/              # 다국어 라우팅 (en, ko, ja)
│   │   ├── layout.tsx         # 루트 레이아웃 + Analytics
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── about/             # 소개 페이지
│   │   ├── guide/             # 가이드 페이지
│   │   └── faq/               # FAQ 페이지
│   ├── sitemap.ts             # SEO 사이트맵
│   └── robots.ts              # 검색엔진 설정
├── components/
│   ├── JsonFormatter.tsx      # 핵심 JSON 처리 로직
│   ├── JsonFormatterClient.tsx # SSR 이슈 해결 래퍼
│   ├── Header.tsx             # 로고 아이콘 포함 헤더
│   └── LanguageSelector.tsx   # 언어 전환
├── i18n/
│   └── config.ts              # 다국어 설정
├── messages/
│   ├── en.json                # 영어 번역
│   ├── ko.json                # 한국어 번역
│   └── ja.json                # 일본어 번역
├── styles/
│   └── globals.scss           # 전역 스타일
└── middleware.ts              # next-intl 라우팅
```

## 🌍 다국어 지원 구현

### 1. 언어 설정 (src/i18n/config.ts)
```typescript
export const locales = ['en', 'ko', 'ja'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',     // 🇺🇸
  ko: '한국어',       // 🇰🇷  
  ja: '日本語'        // 🇯🇵
} as const;
```

### 2. 라우팅 구조
```
/                  → 영어로 리다이렉트 (/en)
/en                → 영어 (기본)
/ko                → 한국어
/ja                → 일본어
```

### 3. 미들웨어 설정 (src/middleware.ts)
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'  // 모든 언어가 경로에 포함
});
```

### 4. 번역 파일 예시 (src/messages/ko.json)
```json
{
  "nav": {
    "logo": "JSON 포맷터",
    "home": "홈",
    "about": "소개", 
    "guide": "사용법",
    "faq": "FAQ"
  },
  "hero": {
    "title": "JSON 포맷터 & TypeScript 인터페이스 생성기",
    "subtitle": "압축된 JSON을 깔끔하게 정리하고 TypeScript 인터페이스를 자동으로 생성합니다"
  },
  "formatter": {
    "inputLabel": "JSON 입력",
    "interfaceName": "인터페이스 이름",
    "formatButton": "포맷하기",
    "copyButton": "복사",
    "clearButton": "지우기",
    "downloadButton": "다운로드",
    "jsonOutput": "포맷된 JSON",
    "typescriptInterface": "TypeScript 인터페이스"
  }
}
```

## 🔧 핵심 컴포넌트 구현

### 1. JSON 포맷터 로직 (JsonFormatter.tsx)

#### 주요 기능
- 실시간 JSON 검증 및 포맷팅
- TypeScript 인터페이스 자동 생성
- 에러 처리 및 사용자 피드백
- 원클릭 복사 및 다운로드

#### 핵심 로직
```typescript
const formatJson = useCallback((input: string, name: string) => {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    setFormattedJson(formatted);
    
    // TypeScript 인터페이스 생성
    const tsInterface = generateTypeScriptInterface(parsed, name);
    setTypescriptInterface(tsInterface);
    setError('');
  } catch (err) {
    setError(err instanceof Error ? err.message : 'JSON 파싱 오류');
  }
}, []);

const generateTypeScriptInterface = (obj: any, name: string): string => {
  const getType = (value: any, depth = 0): string => {
    const indent = '  '.repeat(depth);
    
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const itemType = getType(value[0], depth);
      return `${itemType}[]`;
    }
    if (typeof value === 'object') {
      const properties = Object.entries(value)
        .map(([key, val]) => `${indent}  ${key}: ${getType(val, depth + 1)};`)
        .join('\n');
      return `{\n${properties}\n${indent}}`;
    }
    return typeof value;
  };

  return `interface ${name} ${getType(obj)}`;
};
```

### 2. SSR 이슈 해결 (JsonFormatterClient.tsx)
```typescript
const JsonFormatter = dynamic(() => import('./JsonFormatter'), {
  loading: () => <div>JSON 포맷터를 로딩 중...</div>,
  ssr: false  // 클라이언트에서만 렌더링
});

export default function JsonFormatterClient() {
  return <JsonFormatter />;
}
```

### 3. 헤더 컴포넌트 (Header.tsx)
```typescript
export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;

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
          {/* 네비게이션 링크들 */}
        </nav>
      </div>
    </header>
  );
}
```

## 🎨 디자인 시스템

### 색상 팔레트 (라이트 모드 전용)
```scss
:root {
  --primary-bg: #FFFFFF;      // 주 배경색
  --secondary-bg: #F8F9FA;    // 보조 배경색
  --accent-light: #6C757D;    // 연한 강조색
  --accent-dark: #212529;     // 진한 강조색
  --text-primary: #212529;    // 주 텍스트
  --text-secondary: #6C757D;  // 보조 텍스트
  --border-light: #E9ECEF;    // 테두리
}
```

### 반응형 디자인
```scss
// 모바일 최적화
@media (max-width: 768px) {
  .tools {
    grid-template-columns: 1fr;  // 세로 배치
  }
  
  .navLinks {
    flex-direction: column;       // 햄버거 메뉴
    position: absolute;
  }
}
```

## 🚀 성능 최적화

### 1. Next.js App Router 활용
- 서버 사이드 렌더링 (SSR)
- 자동 코드 분할
- 정적 생성 및 캐싱

### 2. 동적 임포트
```typescript
// 필요할 때만 로드
const JsonFormatter = dynamic(() => import('./JsonFormatter'), {
  ssr: false
});
```

### 3. 이미지 최적화
```typescript
// Next.js Image 컴포넌트 사용
<Image 
  src="/icon.png"
  width={32} 
  height={32}
  alt="JSON Formatter Icon"
/>
```

## 📊 분석 및 모니터링

### Vercel Analytics 설정
```typescript
// layout.tsx에 Analytics 추가
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🔍 SEO 최적화

### 1. 동적 메타데이터
```typescript
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      url: `https://jsonformatter.roono.net/${params.locale}`,
    },
  };
}
```

### 2. 사이트맵 생성 (src/app/sitemap.ts)
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jsonformatter.roono.net';
  
  return locales.flatMap(locale => 
    pages.map(page => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1 : 0.8,
    }))
  );
}
```

## 🚨 주요 해결된 이슈

### 1. 수화(Hydration) 에러
**문제**: 서버/클라이언트 HTML 불일치  
**해결**: JsonFormatterClient 래퍼로 `ssr: false` 설정

### 2. 무한 리다이렉트
**문제**: 루트 페이지와 미들웨어 충돌  
**해결**: 루트 page.tsx 제거, 미들웨어가 라우팅 처리

### 3. 인터페이스 이름 입력 지연
**문제**: 상태 업데이트 지연으로 인한 UX 문제  
**해결**: 함수 매개변수 직접 사용 (`formatJson(input, name)`)

### 4. 언어 지원 복잡성
**문제**: 7개 언어 관리의 복잡성  
**해결**: 3개 언어로 단순화 (English, 한국어, 日本語)

## 🛠️ 개발 워크플로우

### 개발 명령어
```bash
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버
npm run lint    # 코드 린팅
```

### 배포 프로세스
1. **자동 배포**: GitHub main 브랜치 push → Vercel 자동 배포
2. **도메인**: https://jsonformatter.roono.net
3. **모니터링**: Vercel Analytics로 실시간 추적

## 🎯 초보자를 위한 핵심 포인트

### 1. Next.js App Router
- 파일 시스템 기반 라우팅
- `[locale]` 폴더로 다국어 URL 지원
- 자동 코드 분할 및 최적화

### 2. TypeScript
- 컴파일 타임 에러 검출
- 안전한 타입 시스템
- IDE 자동완성 지원

### 3. next-intl
- URL 기반 언어 전환
- JSON 번역 파일 관리
- 서버/클라이언트 모두 지원

### 4. SCSS + CSS Modules
- 컴포넌트별 스타일 격리
- CSS 변수로 일관된 디자인
- 반응형 디자인 구현

---

이 문서는 JSON 포맷터 웹 애플리케이션의 전체 구현을 초보자도 이해할 수 있도록 정리했습니다. 각 기술의 역할과 구현 방법을 참고하여 프로젝트를 이해하고 확장할 수 있습니다.