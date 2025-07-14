# 다국어 사이트 SEO 중복 페이지 문제 해결 가이드

## 문제 상황
Google Search Console에서 "페이지 색인이 생성되지 않음: 사용자가 선택한 표준이 없는 중복 페이지" 오류가 발생했습니다.

### 문제 원인
다국어 웹사이트에서 같은 내용의 페이지가 여러 언어로 존재할 때, Google이 어떤 페이지를 기본(canonical)으로 설정해야 할지 모르기 때문입니다.

예시:
- `/en` (영어 버전)
- `/ko` (한국어 버전) 
- `/ja` (일본어 버전)

## 해결 방법

### 1. Canonical URL 및 Hreflang 메타데이터 추가

**파일:** `src/app/[locale]/layout.tsx`

기존 코드에서 메타데이터 부분을 수정했습니다:

```typescript
// 추가된 코드
const baseUrl = 'https://jsonformatter.roono.net'

const alternates: Record<string, string> = {}
locales.forEach(loc => {
  alternates[loc] = `${baseUrl}/${loc}`
})

return {
  title,
  description,
  keywords: ['JSON formatter', 'JSON 포맷터', 'TypeScript interface generator', 'JSON to TypeScript', 'JSON validator', 'JSON beautifier'],
  authors: [{ name: 'JSON Formatter Web' }],
  
  // 🆕 새로 추가된 부분
  alternates: {
    canonical: `${baseUrl}/en`,  // 영어 버전을 기본으로 설정
    languages: alternates        // 모든 언어 버전 명시
  },
  
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'JSON Formatter',
    locale: locale === 'ko' ? 'ko_KR' : locale === 'ja' ? 'ja_JP' : 'en_US',
    url: `${baseUrl}/${locale}`, // 🆕 현재 페이지 URL 명시
  },
  // ... 나머지 코드
}
```

**효과:**
- `canonical`: Google에게 `/en`이 기본 페이지임을 알려줌
- `languages`: 다른 언어 버전들을 hreflang으로 연결
- HTML에서는 다음과 같이 출력됩니다:

```html
<link rel="canonical" href="https://jsonformatter.roono.net/en" />
<link rel="alternate" hreflang="en" href="https://jsonformatter.roono.net/en" />
<link rel="alternate" hreflang="ko" href="https://jsonformatter.roono.net/ko" />
<link rel="alternate" hreflang="ja" href="https://jsonformatter.roono.net/ja" />
```

### 2. 루트 경로 리디렉션 설정

**파일:** `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  
  // 🆕 새로 추가된 부분
  async redirects() {
    return [
      {
        source: '/',           // 루트 경로(/)로 접근하면
        destination: '/en',    // 영어 페이지(/en)로 리디렉션
        permanent: true,       // 301 리디렉션 (SEO에 좋음)
      },
    ]
  },
}
```

**효과:**
- 사용자가 `https://jsonformatter.roono.net/`로 접근하면 자동으로 `https://jsonformatter.roono.net/en`으로 이동
- 301 리디렉션으로 SEO 점수 유지

### 3. 루트 페이지 파일 생성

**파일:** `src/app/page.tsx` (새로 생성)

```typescript
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
}
```

**효과:**
- Next.js 라우팅 차원에서도 루트 경로를 영어 페이지로 리디렉션
- `next.config.js`의 리디렉션과 이중 보장

## 작동 원리

### Before (문제 상황)
```
https://jsonformatter.roono.net/en  ← Google이 혼란스러워함
https://jsonformatter.roono.net/ko  ← 어떤 게 기본인지 모름
https://jsonformatter.roono.net/ja  ← 중복으로 인식
```

### After (해결 후)
```
https://jsonformatter.roono.net/en  ← canonical (기본 페이지)
https://jsonformatter.roono.net/ko  ← alternate (한국어 버전)
https://jsonformatter.roono.net/ja  ← alternate (일본어 버전)
```

## 핵심 개념 설명

### 1. Canonical URL이란?
- 중복된 내용의 페이지들 중 **"이게 원본이야!"**라고 검색엔진에 알려주는 URL
- 검색 결과에는 canonical URL이 우선적으로 노출됨

### 2. Hreflang이란?
- 같은 내용의 다른 언어 버전 페이지들을 서로 연결해주는 속성
- "이 페이지는 한국어 버전이고, 영어 버전은 여기 있어"라고 알려줌

### 3. 301 리디렉션이란?
- 영구적으로 페이지가 이동했다고 알려주는 HTTP 상태 코드
- SEO 점수가 새 URL로 완전히 이전됨

## 결과 확인 방법

1. **브라우저 개발자 도구**에서 Network 탭을 열고 사이트 접속
2. **Google Search Console**에서 URL 검사 도구 사용
3. **사이트맵 재제출** 후 색인 상태 모니터링

이제 Google이 페이지들을 중복이 아닌 다국어 버전으로 올바르게 인식할 것입니다!

---

# 프로젝트 다국어 처리 가이드 (next-intl)

이 문서는 우리 프로젝트의 다국어 처리(국제화, i18n)가 어떻게 동작하는지 설명합니다. 우리는 `next-intl` 라이브러리를 사용하여 사용자의 언어 설정에 맞는 웹페이지를 보여줍니다.

## 📂 핵심 파일 및 폴더 구조

다국어 처리를 이해하기 위해 알아야 할 주요 파일들은 다음과 같습니다.

```
/
├── src/
│   ├── app/
│   │   └── [locale]/       # (1) 언어별 페이지 라우팅
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/         # (4) 번역이 사용되는 컴포넌트
│   │   └── HeroSection.tsx
│   ├── i18n/
│   │   ├── config.ts       # (3) 지원 언어 목록 설정
│   │   └── request.ts      # (2) 서버에서 번역 파일 로드
│   ├── messages/           # (5) 실제 번역 텍스트 파일
│   │   ├── en.json
│   │   └── ko.json
│   └── middleware.ts       # (1) URL 기반 언어 감지
├── next.config.js          # `next-intl` 플러그인 설정
└── package.json            # `next-intl` 라이브러리 의존성 추가
```

## ⚙️ 동작 원리 (단계별 설명)

사용자가 우리 웹사이트에 접속했을 때, 다음과 같은 순서로 다국어 처리가 이루어집니다.

### 1단계: 언어 감지 및 URL 설정 (`middleware.ts`)

-   사용자가 `https://our-site.com`에 접속하면, `src/middleware.ts` 파일이 가장 먼저 실행됩니다.
-   이 미들웨어는 URL에 언어 코드가 있는지 확인합니다.
    -   **언어 코드가 없다면?** (`/`) → 기본 언어인 `ko`를 URL에 붙여 `https://our-site.com/ko`로 자동 리디렉션합니다.
    -   **언어 코드가 있다면?** (`/en`, `/ja`) → 해당 언어 페이지로 안내합니다.
-   이 덕분에 모든 페이지 URL은 `/[locale]/...` 형태를 유지하며, 서버는 어떤 언어의 페이지를 보여줘야 할지 명확히 알 수 있습니다.

### 2단계: 서버에서 올바른 번역 파일 로드 (`i18n/request.ts`)

-   URL을 통해 `ko` 또는 `en`과 같은 언어(`locale`)가 결정되면, `src/i18n/request.ts` 파일이 동작합니다.
-   이 파일은 결정된 `locale` 값에 따라 `src/messages/ko.json` 또는 `src/messages/en.json` 파일을 찾아 서버에서 미리 읽어들입니다.
-   이렇게 서버에서 미리 번역을 준비하기 때문에, 페이지가 사용자에게 보여질 때 번역이 완료된 상태로 나타나며, 번역 전 텍스트가 깜빡이는 현상이 없습니다. (SEO에도 유리합니다!)

### 3단계: 지원하는 언어 목록 관리 (`i18n/config.ts`)

-   `src/i18n/config.ts` 파일에는 우리 웹사이트가 지원하는 전체 언어 목록(`locales`)과 기본 언어(`defaultLocale`)가 정의되어 있습니다.
-   새로운 언어를 추가하고 싶다면 이 파일을 수정하면 됩니다.

### 4단계: 컴포넌트에서 번역 사용하기 (`components/HeroSection.tsx`)

-   페이지나 컴포넌트에서 실제 번역된 텍스트를 사용하기 위해 `useTranslations` 훅을 호출합니다.
-   `const t = useTranslations('hero')`와 같이 사용하면, `ko.json` 파일의 `hero` 객체 안에 있는 값들을 `t('title')`, `t('subtitle')`과 같은 형태로 가져와 화면에 보여줄 수 있습니다.

    ```tsx
    // src/components/HeroSection.tsx
    'use client'

    import { useTranslations } from 'next-intl'

    export default function HeroSection() {
      const t = useTranslations('hero') // 'hero' 네임스페이스 지정

      return (
        <h1>{t('title')}</h1> // hero.title 값을 가져옴
      )
    }
    ```

### 5단계: 번역 텍스트 관리 (`messages/en.json`)

-   모든 번역 텍스트는 `src/messages/` 폴더 안의 `.json` 파일에 저장됩니다.
-   파일은 언어별로 관리되며, 그 안의 내용은 객체 형태로 구조화할 수 있습니다.

    ```json
    // src/messages/ko.json
    {
      "hero": {
        "title": "JSON 포맷터",
        "subtitle": "JSON 데이터를 즉시 검증하고, 쉽게 읽을 수 있도록 포맷하세요."
      },
      "footer": {
        "copyright": "© 2025. 모든 권리 보유."
      }
    }
    ```

## 📝 새로운 번역 추가하는 방법

1.  **번역 파일에 텍스트 추가**:
    -   `src/messages/en.json`, `src/messages/ko.json` 등 모든 언어 파일에 동일한 구조로 새로운 키와 번역문을 추가합니다.
    -   예: `footer` 객체에 `privacy` 키 추가하기

        ```json
        // src/messages/ko.json
        {
          "footer": {
            "copyright": "...",
            "privacy": "개인정보처리방침"
          }
        }
        ```

2.  **컴포넌트에서 사용**:
    -   번역을 사용할 컴포넌트에서 `useTranslations` 훅을 호출하고, `t()` 함수로 값을 가져옵니다.

        ```tsx
        // src/components/Footer.tsx
        import { useTranslations } from 'next-intl';

        export default function Footer() {
          const t = useTranslations('footer');

          return (
            <footer>
              <p>{t('copyright')}</p>
              <a href="/privacy">{t('privacy')}</a>
            </footer>
          );
        }
        ```

이것으로 끝입니다! 이 가이드를 통해 우리 프로젝트의 다국어 처리 방식을 쉽게 이해하고 기여할 수 있기를 바랍니다.
