import { Info, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const title2Words = t('hero.title2').split(' ')
  const firstWord = title2Words[0]
  const restWords = title2Words.slice(1).join(' ')

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              {t('hero.title1')}
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-orange-500">{firstWord}</span>{' '}
              <span className="text-gray-800">{restWords}</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
            >
              <Info className="w-5 h-5" />
              {t('hero.aboutBtn')}
            </a>
            <a
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-50 text-orange-600 font-semibold rounded-xl transition-all duration-200 border-2 border-orange-200 hover:border-orange-300 hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              {t('hero.calendarBtn')}
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/10 rounded-full blur-3xl -z-10" />
    </section>
  )
}
