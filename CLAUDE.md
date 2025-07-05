# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
JSON 포맷터 & TypeScript 인터페이스 생성기는 JSON 데이터를 포맷하고 TypeScript 인터페이스를 자동 생성하는 웹 애플리케이션입니다.

## Architecture
- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS with CSS modules
- **Deployment**: Vercel

## Development Commands
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

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── guide/             # Guide page  
│   ├── faq/               # FAQ page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Key Components
- **JsonFormatter**: Main JSON formatting and TypeScript interface generation component
- **Header**: Navigation with theme toggle
- **ThemeToggle**: Dark/light mode switcher
- **HeroSection**: Landing page hero section
- **FaqSection**: Collapsible FAQ component

## Styling
- Uses CSS custom properties for theming
- Color palette: #FFFDF6, #FAF6E9, #DDEB9D, #A0C878
- Responsive design with mobile-first approach
- Dark/light mode support

## Features
- Real-time JSON validation and formatting
- TypeScript interface generation from JSON
- One-click copy functionality
- Theme switching (dark/light mode)
- SEO optimization with structured data


## Rules
- 프레임워크 : NEXT.js
- SCSS 사용
- 배포 : vercel
- 구현 방법 Readme로 이해하기 쉽게 정리 
- 문서화 자동 생성
- 기능 하나를 구현 후 커밋 푸시
- 문서 등 모두 한글로 진행 