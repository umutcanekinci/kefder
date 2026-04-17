"use client"
import { useLanguage } from '@/context/LanguageContext'

export default function NewsPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-3xl font-bold">
      {t('news.pageTitle')}
    </div>
  )
}
