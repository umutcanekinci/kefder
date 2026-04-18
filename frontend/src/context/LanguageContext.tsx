"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Language = 'tr' | 'en'

type Translations = Record<string, string>

const translations: Record<Language, Translations> = {
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.about.mission': 'Amaç ve Değerler',
    'nav.about.team': 'Ekip',
    'nav.about.reports': 'Faaliyet Raporları',
    'nav.about.rules': 'Tüzük',
    'nav.about.networks': 'Üyesi Olduğumuz Ağlar',
    'nav.activities': 'Faaliyetler',
    'nav.activities.calendar': 'Güncel Takvim',
    'nav.activities.past': 'Geçmiş Etkinlikler',
    'nav.activities.archive': 'Dosya Arşivi',
    'nav.activities.gallery': 'Anlarımız',
    'nav.news': 'Haberler',
    'nav.membership': 'Üyelik ve Destekçilik',
    'nav.contact': 'İletişim',

    'hero.title1': 'Kültürel Etkileşim ve',
    'hero.title2': 'Farkındalık Derneği',
    'hero.description': 'Kültürel farkındalık, dayanışma ve toplumsal etkileşim için birlikte çalışıyoruz.',
    'hero.aboutBtn': 'Hakkımızda',
    'hero.calendarBtn': 'Etkinlik Takvimi',

    'volunteer.title': 'Üye Ol',
    'volunteer.breadcrumb': 'Ana Sayfa / Üyelik',
    'volunteer.stats.members': 'Aktif Üye',
    'volunteer.stats.projects': 'Yıllık Proje',
    'volunteer.stats.participants': 'Katılımcı',
    'volunteer.stats.experience': 'Yıllık Deneyim',
    'volunteer.why.badge': 'Neden Üyelik?',
    'volunteer.why.title': 'KEFDER Ailesine Katılın',
    'volunteer.why.desc': 'KEFDER olarak üyelerimize sosyal, kültürel ve kişisel gelişim alanlarında katkı sağlıyoruz. Siz de bu topluluğun bir parçası olun.',
    'volunteer.why.list1': 'Toplumsal katkı sağlayın',
    'volunteer.why.list2': 'Yeni insanlarla tanışın',
    'volunteer.why.list3': 'Etkinliklere katılın',
    'volunteer.why.list4': 'Kendinizi geliştirin',
    'volunteer.form.title': 'Üyelik Başvuru Formu',
    'volunteer.form.name': 'Ad Soyad',
    'volunteer.form.email': 'E-posta',
    'volunteer.form.phone': 'Telefon',
    'volunteer.form.message': 'Kendinizden kısaca bahsedin...',
    'volunteer.form.submit': 'Başvuruyu Gönder',

    'news.pageTitle': 'Haberler',
    'about.pageTitle': 'Hakkımızda',
    'contact.pageTitle': 'İletişim',
    'contact.breadcrumb': 'Ana Sayfa / İletişim',
    'contact.badge': 'Bize Ulaşın',
    'contact.title': 'İletişime Geçin',
    'contact.desc': 'Sorularınız, önerileriniz veya işbirliği talepleriniz için bize ulaşabilirsiniz.',
    'contact.info.title': 'İletişim Bilgileri',
    'contact.info.desc': 'Size daha iyi hizmet verebilmek için aşağıdaki kanallardan bize ulaşabilirsiniz.',
    'contact.info.address': 'Adres',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-posta',
    'contact.info.hours': 'Çalışma Saatleri',
    'contact.info.hours.detail': 'Hafta İçi: 09:00 - 18:00',
    'contact.social.title': 'Sosyal Medya',
    'contact.social.desc': 'Bizi sosyal medya hesaplarımızdan takip edebilirsiniz.',
    'contact.form.title': 'Bize Yazın',
    'contact.form.name': 'Ad Soyad',
    'contact.form.email': 'E-posta',
    'contact.form.subject': 'Konu',
    'contact.form.message': 'Mesajınız',
    'contact.form.submit': 'Mesaj Gönder',

    'footer.quickLinks': 'Hızlı Bağlantılar',
    'footer.explore': 'Keşfet',
    'footer.contact': 'İletişim',
    'footer.volunteer': 'Gönüllü Ol',
    'footer.press': 'Basın',
    'footer.faq': 'SSS',
    'footer.events': 'Etkinlikler',
    'footer.address': 'İzmir, Türkiye',
    'about.hero.subtitle': 'Kültürel farkındalık ve toplumsal dayanışma için 2012\'den beri yoldayız.',
    'about.mission.badge': 'Vizyon & Misyon',
    'about.mission.title': 'Geleceği Birlikte İnşa Ediyoruz',
    'about.mission.label': 'Misyonumuz',
    'about.vision.label': 'Vizyonumuz',
    'about.experience.label': 'Yıllık Tecrübe',
    'about.team.title': 'Yönetim Kurulumuz ve Ekibimiz',
    'about.team.subtitle': 'Değişim için emek veren, profesyonel ve gönüllü kadromuz ile toplumsal fayda üretiyoruz.',
    'about.team.empty': 'Henüz ekip üyesi eklenmemiş.',
    'about.reports.title': 'Faaliyet Raporları',
    'about.reports.empty': 'Henüz rapor yüklenmemiş.',
    'about.documents.title': 'Kurumsal Belgeler & Tüzük',
    'about.documents.empty': 'Henüz belge yüklenmemiş.',
    'about.networks.badge': 'İşbirliklerimiz',
    'about.networks.title': 'Üyesi Olduğumuz Ağlar ve Ortaklıklar',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.about.mission': 'Mission & Values',
    'nav.about.team': 'Team',
    'nav.about.reports': 'Annual Reports',
    'nav.about.rules': 'Bylaws',
    'nav.about.networks': 'Our Networks',
    'nav.activities': 'Activities',
    'nav.activities.calendar': 'Event Calendar',
    'nav.activities.past': 'Past Events',
    'nav.activities.archive': 'Document Archive',
    'nav.activities.gallery': 'Our Memories',
    'nav.news': 'News',
    'nav.membership': 'Membership & Support',
    'nav.contact': 'Contact',

    'hero.title1': 'Cultural Interaction and',
    'hero.title2': 'Awareness Association',
    'hero.description': 'We work together for cultural awareness, solidarity and social interaction.',
    'hero.aboutBtn': 'About Us',
    'hero.calendarBtn': 'Event Calendar',

    'volunteer.title': 'Become a Member',
    'volunteer.breadcrumb': 'Home / Membership',
    'volunteer.stats.members': 'Active Members',
    'volunteer.stats.projects': 'Annual Projects',
    'volunteer.stats.participants': 'Participants',
    'volunteer.stats.experience': 'Years of Experience',
    'volunteer.why.badge': 'Why Join Us?',
    'volunteer.why.title': 'Join the KEFDER Family',
    'volunteer.why.desc': 'At KEFDER, we contribute to the social, cultural, and personal development of our members. Become a part of this community.',
    'volunteer.why.list1': 'Contribute to society',
    'volunteer.why.list2': 'Meet new people',
    'volunteer.why.list3': 'Participate in events',
    'volunteer.why.list4': 'Improve yourself',
    'volunteer.form.title': 'Membership Application Form',
    'volunteer.form.name': 'Full Name',
    'volunteer.form.email': 'Email',
    'volunteer.form.phone': 'Phone',
    'volunteer.form.message': 'Briefly tell us about yourself...',
    'volunteer.form.submit': 'Submit Application',

    'news.pageTitle': 'News',
    'about.pageTitle': 'About Us',
    'contact.pageTitle': 'Contact',
    'contact.breadcrumb': 'Home / Contact',
    'contact.badge': 'Contact Us',
    'contact.title': 'Get In Touch',
    'contact.desc': 'You can reach us for your questions, suggestions, or collaboration requests.',
    'contact.info.title': 'Contact Information',
    'contact.info.desc': 'You can reach us through the following channels so we can serve you better.',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Working Hours',
    'contact.info.hours.detail': 'Weekdays: 09:00 - 18:00',
    'contact.social.title': 'Social Media',
    'contact.social.desc': 'You can follow us on our social media accounts.',
    'contact.form.title': 'Write to Us',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',

    'footer.quickLinks': 'Quick Links',
    'footer.explore': 'Explore',
    'footer.contact': 'Contact',
    'footer.volunteer': 'Volunteer',
    'footer.press': 'Press',
    'footer.faq': 'FAQ',
    'footer.events': 'Events',
    'footer.address': 'Izmir, Türkiye',
    'about.hero.subtitle': 'We have been on the road since 2012 for cultural awareness and social solidarity.',
    'about.mission.badge': 'Vision & Mission',
    'about.mission.title': 'Building the Future Together',
    'about.mission.label': 'Our Mission',
    'about.vision.label': 'Our Vision',
    'about.experience.label': 'Years of Experience',
    'about.team.title': 'Our Board and Team',
    'about.team.subtitle': 'We produce social benefit with our professional and volunteer staff working for change.',
    'about.team.empty': 'No team members added yet.',
    'about.reports.title': 'Annual Reports',
    'about.reports.empty': 'No reports uploaded yet.',
    'about.documents.title': 'Corporate Documents & Bylaws',
    'about.documents.empty': 'No documents uploaded yet.',
    'about.networks.badge': 'Our Collaborations',
    'about.networks.title': 'Networks and Partnerships We Belong To',
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
    if (typeof window === 'undefined') return 'tr'
    const saved = localStorage.getItem('kefder_language')
    return saved === 'tr' || saved === 'en' ? saved : 'tr'
  })

  useEffect(() => {
    localStorage.setItem('kefder_language', language)
    document.documentElement.lang = language
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