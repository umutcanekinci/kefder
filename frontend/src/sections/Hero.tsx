"use client"
import { Info, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'

export default function Hero() {
  const { t } = useLanguage()

  const title2Words = t('hero.title2').split(' ')
  const firstWord = title2Words[0]
  const restWords = title2Words.slice(1).join(' ')

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-16 lg:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#333333] leading-tight">
              {t('hero.title1')}
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-primary">{firstWord}</span>{' '}
              <span className="text-[#333333]">{restWords}</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {t('hero.description')}
          </p>

          {/* Main Action Cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
            <Link
              href="/about"
              className="group relative flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-orange-100"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#333333] mb-3">{t('hero.aboutBtn')}</h3>
              <p className="text-gray-500 text-sm">{t('hero.aboutDesc')}</p>
              <div className="mt-6 text-orange-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('hero.discover')} <span>→</span>
              </div>
            </Link>

            <Link
              href="/activities"
              className="group relative flex flex-col items-center text-center p-8 bg-orange-500 rounded-3xl shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('hero.calendarBtn')}</h3>
              <p className="text-orange-50 text-sm">{t('hero.calendarDesc')}</p>
              <div className="mt-6 text-white font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                {t('hero.examine')} <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </section>
  )
}
