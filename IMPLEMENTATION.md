# JSON 포맷터 구현 방법 문서

## 📋 프로젝트 개요

이 문서는 JSON 포맷터 & TypeScript 인터페이스 생성기의 구현 방법과 아키텍처를 상세히 설명합니다.

## 🏗️ 아키텍처

### 기술 스택
- **프레임워크**: Next.js 15.3.5 (App Router)
- **언어**: TypeScript
- **스타일링**: SCSS with CSS Modules
- **다국어**: next-intl
- **배포**: Vercel

### 디렉토리 구조
```
src/
├── app/
│   ├── [locale]/              # 다국어 라우팅
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── about/             # 소개 페이지
│   │   ├── guide/             # 가이드 페이지
│   │   └── faq/               # FAQ 페이지
│   ├── sitemap.ts             # 사이트맵 생성
│   └── robots.ts              # robots.txt
├── components/                # 재사용 컴포넌트
├── i18n/                      # 다국어 설정
├── messages/                  # 번역 파일
├── styles/                    # 전역 스타일
└── middleware.ts              # 다국어 미들웨어
```

## 🎨 디자인 시스템

### 색상 팔레트 (라이트 모드만 지원)

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

> 참고: 이 프로젝트는 깔끔한 라이트 모드만 지원합니다. 다크 모드 기능은 제거되었습니다.

## 🌍 다국어 지원 구현

### 1. next-intl 설정

#### 설치
```bash
npm install next-intl
```

#### 설정 파일 (`src/i18n/config.ts`)
```typescript
export const locales = ['en', 'ko', 'zh', 'es', 'hi', 'ar', 'ja'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',     // 🇺🇸
  ko: '한국어',       // 🇰🇷  
  zh: '中文',        // 🇨🇳
  es: 'Español',     // 🇪🇸
  hi: 'हिन्दी',        // 🇮🇳
  ar: 'العربية',      // 🇸🇦
  ja: '日본語'        // 🇯🇵
} as const;
```

### 2. 라우팅 구조

```
/                  → 영어로 리다이렉트 (/en)
/en                → 영어 (기본)
/ko                → 한국어
/zh                → 중국어
/es                → 스페인어
/hi                → 힌디어
/ar                → 아랍어
/ja                → 일본어
```

### 3. 미들웨어 설정 (`src/middleware.ts`)
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'  // 모든 언어가 경로에 포함됨
});
```

### 4. 번역 파일 구조

각 언어별로 JSON 파일 생성:
- `src/messages/ko.json` (한국어)
- `src/messages/en.json` (영어)
- `src/messages/zh.json` (중국어)
- 등등...

#### 번역 파일 예시 (`src/messages/ko.json`)
```json
{
  "nav": {
    "home": "홈",
    "about": "소개",
    "guide": "사용법",
    "faq": "FAQ"
  },
  "hero": {
    "title": "JSON 포맷터 & TypeScript 인터페이스 생성기",
    "subtitle": "압축된 JSON을 깔끔하게 정리하고..."
  }
}
```

## 🔧 핵심 컴포넌트 구현

### 1. JSON 포맷터 (`JsonFormatter.tsx`)

#### 주요 기능
- 실시간 JSON 검증
- TypeScript 인터페이스 자동 생성
- 원클릭 복사 기능

#### 핵심 로직
```typescript
const formatJson = useCallback((input: string) => {
  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, 2);
    setFormattedJson(formatted);
    
    // TypeScript 인터페이스 생성
    const tsInterface = generateTypeScriptInterface(parsed, interfaceName);
    setTypescriptInterface(tsInterface);
  } catch (err) {
    setError(err.message);
  }
}, [interfaceName]);

const generateTypeScriptInterface = (obj: any, name: string): string => {
  const getType = (value: any): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const itemType = getType(value[0]);
      return `${itemType}[]`;
    }
    if (typeof value === 'object') {
      const properties = Object.entries(value)
        .map(([key, val]) => `  ${key}: ${getType(val)}`)
        .join('\\n');
      return `{\\n${properties}\\n}`;
    }
    return typeof value;
  };

  return `interface ${name} ${getType(obj)}`;
};
```

### 2. 언어 선택기 (`LanguageSelector.tsx`)

#### 구현 방법
```typescript
const handleLanguageChange = (locale: Locale) => {
  // 현재 언어와 동일한 경우 아무것도 하지 않음
  if (locale === currentLocale) {
    return
  }
  
  // 현재 경로에서 언어 코드 제거
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  
  // 새로운 언어로 경로 생성 (모든 언어가 경로에 포함됨)
  const newPath = `/${locale}${pathWithoutLocale}`
  
  // 페이지 이동
  window.location.href = newPath
};
```

### 3. 다국어 지원 구현 요약

#### 주요 특징
- 7개 언어 완전 지원
- 영어가 기본 언어 (루트 경로 접속 시 `/en`으로 리다이렉트)
- 모든 언어가 경로에 포함됨: `/en`, `/ko`, `/zh` 등
- Header 로고도 언어별로 번역됨
- 완전한 페이지 새로고침으로 상태 일관성 보장
- 언어 변경 로직이 단순하고 명확함

## 📱 반응형 디자인

### 브레이크포인트
- 모바일: `max-width: 768px`
- 태블릿: `769px - 1024px`
- 데스크톱: `1024px+`

### 모바일 최적화
```scss
@media (max-width: 768px) {
  .tools {
    grid-template-columns: 1fr;  // 모바일에서는 세로 배치
  }
  
  .navLinks {
    flex-direction: column;       // 네비게이션 세로 배치
    position: absolute;           // 햄버거 메뉴
  }
}
```

## 🚀 성능 최적화

### 1. Next.js App Router 활용
- 서버 사이드 렌더링 (SSR)
- 정적 생성 (Static Generation)
- 스트리밍

### 2. 코드 분할
```typescript
// 동적 임포트를 통한 코드 분할
const JsonFormatter = dynamic(() => import('@/components/JsonFormatter'), {
  loading: () => <div>Loading...</div>
});
```

### 3. CSS 최적화
- CSS Modules로 스타일 격리
- CSS 변수로 테마 관리
- SCSS로 중첩 및 변수 활용

## 🔍 SEO 최적화

### 1. 메타데이터 설정
```typescript
export const metadata: Metadata = {
  title: 'JSON 포맷터 & TypeScript 인터페이스 생성기',
  description: 'JSON을 깔끔하게 포맷하고...',
  keywords: ['JSON formatter', 'TypeScript interface'],
  openGraph: {
    title: 'JSON 포맷터',
    description: '...',
    type: 'website',
  },
};
```

### 2. 구조화된 데이터
```typescript
// JSON-LD 스키마 마크업
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "JSON 포맷터 & TypeScript 인터페이스 생성기",
  "applicationCategory": "DeveloperApplication"
}
```

### 3. 사이트맵 및 robots.txt
- `src/app/sitemap.ts`: 자동 사이트맵 생성
- `src/app/robots.ts`: 검색엔진 크롤링 설정

## 🛠️ 개발 워크플로우

### 1. 개발 명령어
```bash
npm run dev     # 개발 서버 시작
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 시작
npm run lint    # 코드 린팅
```

### 2. Git 워크플로우
1. 기능별로 브랜치 생성
2. 기능 구현 후 커밋
3. Pull Request 생성
4. 코드 리뷰 후 메인 브랜치에 병합

### 3. 배포 과정
1. Vercel에 연결
2. `main` 브랜치 push 시 자동 배포
3. 프리뷰 배포로 테스트 후 프로덕션 배포

## 🧪 테스트 전략

### 1. 단위 테스트
- JSON 파싱 로직 테스트
- TypeScript 인터페이스 생성 로직 테스트

### 2. 통합 테스트
- 컴포넌트 간 상호작용 테스트
- 다국어 전환 테스트

### 3. E2E 테스트
- 사용자 시나리오 기반 테스트
- 브라우저 호환성 테스트

## 📊 모니터링

### 1. 성능 모니터링
- Core Web Vitals 추적
- 번들 사이즈 최적화

### 2. 에러 추적
- 클라이언트 에러 모니터링
- 서버 에러 로깅

### 3. 사용자 분석
- 페이지 방문 통계
- 기능 사용 패턴 분석

---

이 문서는 프로젝트의 구현 방법과 아키텍처를 이해하는 데 도움이 되며, 향후 기능 추가나 유지보수 시 참고 자료로 활용할 수 있습니다.