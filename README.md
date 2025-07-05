# JSON 포맷터 & TypeScript 인터페이스 생성기

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-1.89.2-pink?style=flat-square&logo=sass)](https://sass-lang.com/)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=flat-square&logo=vercel)](https://vercel.com/)

JSON을 깔끔하게 포맷하고 TypeScript 인터페이스를 자동으로 생성하는 웹 애플리케이션입니다.

## 🎯 주요 기능

### 핵심 기능
- **JSON 포맷팅 및 검증**: 압축된 JSON을 읽기 쉽게 정리하고 실시간으로 유효성을 검사합니다.
- **TypeScript 인터페이스 자동 생성**: JSON 구조를 분석하여 TypeScript 타입 정의를 자동으로 생성합니다.
- **실시간 처리**: 입력과 동시에 결과를 표시하여 빠른 피드백을 제공합니다.

### 부가 기능
- **원클릭 복사**: 포맷된 JSON과 생성된 인터페이스를 클릭 한 번으로 복사할 수 있습니다.
- **다크/라이트 모드**: 개발자 친화적인 테마를 지원합니다.
- **반응형 디자인**: 모바일과 데스크톱 모든 환경에서 사용 가능합니다.

## 🚀 빠른 시작

### 사전 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/json-formatter-web.git
cd json-formatter-web

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

개발 서버가 시작되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── about/             # 소개 페이지
│   ├── guide/             # 사용 가이드
│   ├── faq/               # FAQ 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── sitemap.ts         # 사이트맵
│   └── robots.ts          # robots.txt
├── components/            # 재사용 가능한 컴포넌트
│   ├── Header.tsx         # 네비게이션 헤더
│   ├── Footer.tsx         # 푸터
│   ├── HeroSection.tsx    # 히어로 섹션
│   ├── JsonFormatter.tsx  # JSON 포맷터 메인 컴포넌트
│   ├── ThemeToggle.tsx    # 다크/라이트 모드 토글
│   └── FaqSection.tsx     # FAQ 섹션
├── styles/                # 전역 스타일
│   └── globals.scss       # 전역 SCSS 스타일
├── types/                 # TypeScript 타입 정의
└── utils/                 # 유틸리티 함수
```

## 🛠️ 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run start

# 코드 린팅
npm run lint
```

## 🎨 기술 스택

- **프레임워크**: Next.js 15.3.5 (App Router)
- **언어**: TypeScript
- **스타일링**: SCSS
- **배포**: Vercel

## 🌟 주요 기능 상세

### JSON 포맷팅
- 압축된 JSON을 읽기 쉬운 형태로 정리
- 실시간 JSON 유효성 검사
- 구문 오류 위치 정확히 표시

### TypeScript 인터페이스 생성
- JSON 구조 분석하여 TypeScript 타입 정의 생성
- 중첩 객체, 배열 타입 정확히 처리
- 인터페이스 이름 커스터마이징

### 사용자 경험
- 실시간 처리로 즉각적인 피드백
- 원클릭 복사 기능
- 다크/라이트 모드 지원
- 모바일 최적화

## 📱 페이지 구성

- **메인 페이지 (/)**: 핵심 기능 제공 및 히어로 섹션
- **소개 페이지 (/about)**: 서비스 소개 및 차별화 포인트
- **사용 가이드 (/guide)**: 기능별 상세 사용법과 실무 활용 예시
- **FAQ 페이지 (/faq)**: 자주 묻는 질문과 문제 해결 가이드

## 🔧 개발 가이드

### 새로운 기능 추가
1. `src/components/` 디렉토리에 컴포넌트 생성
2. 필요한 경우 `src/utils/`에 유틸리티 함수 추가
3. 스타일은 `.module.scss` 파일로 관리

### 스타일링
- CSS 변수를 사용한 테마 관리
- 색상 팔레트: #FFFDF6, #FAF6E9, #DDEB9D, #A0C878
- 반응형 디자인 (모바일 퍼스트)

## 📊 SEO 최적화

- Next.js App Router를 활용한 서버 사이드 렌더링
- 구조화된 데이터 마크업 (JSON-LD)
- 사이트맵 및 robots.txt 자동 생성
- 메타 태그 최적화

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원

- 문제 신고: [GitHub Issues](https://github.com/your-username/json-formatter-web/issues)
- 문의사항: [GitHub Discussions](https://github.com/your-username/json-formatter-web/discussions)

---

**JSON 포맷터 & TypeScript 인터페이스 생성기**로 개발 효율성을 높여보세요! 🚀