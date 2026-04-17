import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Language = 'tr' | 'en'

type Translations = Record<string, string>

const translations: Record<Language, Translations> = {
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.activities': 'Faaliyetler',
    'nav.news': 'Haberler',
    'nav.membership': 'Üyelik',
    'nav.contact': 'İletişim',

    'hero.title1': 'Kültürel Etkileşim ve',
    'hero.title2': 'Farkındalık Derneği',
    'hero.description': 'Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.',
    'hero.aboutBtn': 'Hakkımızda',
    'hero.calendarBtn': 'Etkinlik Takvimi',

    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.explore': 'Keşfet',
    'footer.contact': 'İletişim',
    'footer.volunteer': 'Gönüllü Ol',
    'footer.press': 'Basın',
    'footer.faq': 'SSS',
    'footer.events': 'Etkinlikler',
    'footer.address': 'İzmir, Türkiye',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.activities': 'Activities',
    'nav.news': 'News',
    'nav.membership': 'Membership',
    'nav.contact': 'Contact',

    'hero.title1': 'Cultural Interaction and',
    'hero.title2': 'Awareness Association',
    'hero.description': 'We work together for cultural awareness, solidarity and social interaction.',
    'hero.aboutBtn': 'About Us',
    'hero.calendarBtn': 'Event Calendar',

    'footer.quickLinks': 'Quick Links',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.volunteer': 'Volunteer',
    'footer.press': 'Press',
    'footer.faq': 'FAQ',
    'footer.events': 'Events',
    'footer.address': 'Izmir, Türkiye',
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kefder_language')
    return saved === 'tr' || saved === 'en' ? saved : 'tr'
  })

  useEffect(() => {
    localStorage.setItem('kefder_language', language)
  }, [language])

  const t = (key: string): string => {
    const value = translations[language][key]
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}