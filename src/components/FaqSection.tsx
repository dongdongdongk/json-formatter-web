'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import styles from './FaqSection.module.scss'

interface FaqItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'technical' | 'troubleshooting'
}

const faqData: FaqItem[] = [
  {
    id: '1',
    question: 'JSON 포맷터는 무료로 사용할 수 있나요?',
    answer: '네, 완전히 무료입니다. 회원가입 없이 모든 기능을 무제한으로 사용할 수 있습니다.',
    category: 'general'
  },
  {
    id: '2',
    question: '입력한 JSON 데이터는 어디에 저장되나요?',
    answer: '입력한 데이터는 브라우저에서만 처리되며, 서버로 전송되지 않습니다. 페이지를 새로고침하면 모든 데이터가 삭제됩니다.',
    category: 'general'
  },
  {
    id: '3',
    question: '최대 얼마나 큰 JSON 파일을 처리할 수 있나요?',
    answer: '브라우저의 메모리 제한에 따라 달라지지만, 일반적으로 10MB 이하의 JSON 파일을 권장합니다. 더 큰 파일의 경우 브라우저가 느려질 수 있습니다.',
    category: 'technical'
  },
  {
    id: '4',
    question: 'TypeScript 인터페이스가 정확하지 않게 생성되는 경우가 있나요?',
    answer: '네, 몇 가지 제한사항이 있습니다. 배열의 경우 첫 번째 요소의 타입을 기준으로 추론하므로, 다양한 타입이 섞인 배열은 정확하지 않을 수 있습니다. 또한 null 값이 포함된 경우 옵셔널 타입으로 처리되지 않을 수 있습니다.',
    category: 'technical'
  },
  {
    id: '5',
    question: '생성된 TypeScript 인터페이스를 수정할 수 있나요?',
    answer: '현재 버전에서는 자동 생성된 인터페이스를 직접 수정할 수 없습니다. 복사 후 코드 에디터에서 필요에 따라 수정해주세요.',
    category: 'technical'
  },
  {
    id: '6',
    question: 'JSON 구문 오류가 발생하는데 어떻게 해결하나요?',
    answer: '일반적인 JSON 구문 오류는 다음과 같습니다: 1) 문자열에 큰따옴표 사용 2) 마지막 요소 뒤 쉼표 제거 3) 괄호 짝 맞추기 4) 주석 제거. 오류 메시지를 참고하여 해당 위치를 확인해보세요.',
    category: 'troubleshooting'
  },
  {
    id: '7',
    question: '복사 기능이 작동하지 않아요.',
    answer: '브라우저의 클립보드 권한이 필요합니다. HTTPS 연결에서만 정상 작동하며, 일부 구형 브라우저에서는 지원되지 않을 수 있습니다. 수동으로 선택하여 복사해주세요.',
    category: 'troubleshooting'
  },
  {
    id: '8',
    question: '모바일에서도 사용할 수 있나요?',
    answer: '네, 반응형 디자인으로 모바일 브라우저에서도 사용할 수 있습니다. 다만 큰 JSON 파일의 경우 모바일 성능 제한으로 느려질 수 있습니다.',
    category: 'general'
  },
  {
    id: '10',
    question: '특수 문자나 이모지가 포함된 JSON도 처리할 수 있나요?',
    answer: '네, UTF-8 인코딩을 지원하므로 한글, 특수 문자, 이모지가 포함된 JSON도 정상적으로 처리됩니다.',
    category: 'technical'
  },
  {
    id: '11',
    question: '중첩된 객체가 매우 깊은 경우에도 TypeScript 인터페이스가 생성되나요?',
    answer: '네, 중첩 깊이에 제한은 없지만, 너무 깊은 중첩은 가독성이 떨어질 수 있습니다. 필요에 따라 별도의 인터페이스로 분리하는 것을 권장합니다.',
    category: 'technical'
  },
  {
    id: '12',
    question: '브라우저 호환성은 어떻게 되나요?',
    answer: '모던 브라우저(Chrome, Firefox, Safari, Edge)에서 모두 사용 가능합니다. Internet Explorer는 지원하지 않습니다.',
    category: 'technical'
  }
]

export default function FaqSection() {
  const t = useTranslations('faq')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const categories = [
    { id: 'all', name: t('categories.all') },
    { id: 'general', name: t('categories.general') },
    { id: 'technical', name: t('categories.technical') },
    { id: 'troubleshooting', name: t('categories.troubleshooting') }
  ]

  const filteredFaqs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory)

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className={styles.faqSection}>
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.faqList}>
        {filteredFaqs.map(faq => (
          <div key={faq.id} className={styles.faqItem}>
            <button
              onClick={() => toggleItem(faq.id)}
              className={styles.faqQuestion}
            >
              <span className={styles.questionText}>{t(`questions.${faq.id}.question`)}</span>
              <span className={`${styles.icon} ${openItems.has(faq.id) ? styles.open : ''}`}>
                ↓
              </span>
            </button>
            {openItems.has(faq.id) && (
              <div className={styles.faqAnswer}>
                <p>{t(`questions.${faq.id}.answer`)}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <div className={styles.contact}>
        <h3>{t('contact.title')}</h3>
        <p>{t('contact.description')}</p>
      </div> */}
    </div>
  )
}