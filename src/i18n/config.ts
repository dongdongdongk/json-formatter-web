export const locales = ['en', 'ko', 'ja'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  ko: '한국어',
  ja: '日本語'
} as const;

export const localeFlags = {
  en: '🇺🇸',
  ko: '🇰🇷',
  ja: '🇯🇵'
} as const;