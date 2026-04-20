"use client"
import { useState, useEffect } from 'react'
import { FaFacebook as Facebook, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa';
import { MapPin, Phone, Mail, MoreVertical, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onAdminClick: () => void
  settings?: any
}

export default function Footer({ onAdminClick, settings }: FooterProps) {
  const { t, language } = useLanguage()
  const { socialLinks, contactInfo } = settings || {}
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLang = mounted ? language : 'tr'

  const quickLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.activities'), href: '/activities' },
    { label: t('nav.news') || 'Haberler', href: '/haberler' },
  ]

  const exploreLinks = [
    { label: t('footer.volunteer'), href: '/volunteer' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('nav.activities.work') || 'Çalışmalarımız', href: '/activities#work' },
    { label: t('nav.activities.archive') || 'Dosya Arşivi', href: '/activities#archive' },
  ]

  return (
    <footer className="bg-[#2D2D2D] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex-shrink-0">
                <img 
                  src="/images/logo.png" 
                  alt="KEFDER Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">KEFDER</h2>
                <p className="text-[10px] text-gray-400">
                  {currentLang === 'tr' ? 'Kültürel Etkileşim ve Farkındalık Derneği' : 'Cultural Interaction and Awareness Association'}
                </p>
              </div>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              {currentLang === 'tr' 
                ? '2012 yılından beri İzmir\'de kültürel etkileşim ve farkındalık oluşturmak için çalışıyoruz.'
                : 'Since 2012, we have been working to create cultural interaction and awareness in Izmir.'}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks?.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-lg transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-lg transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-lg transition-all duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">{mounted ? t('footer.quickLinks') : 'Hızlı Bağlantılar'}</h3>
            <ul className="space-y-3">
              {mounted && quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">{mounted ? t('footer.explore') : 'Keşfet'}</h3>
            <ul className="space-y-3">
              {mounted && exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">{mounted ? t('footer.contact') : 'İletişim'}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  {contactInfo?.address || (mounted ? t('footer.address') : 'İzmir, Türkiye')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href={`tel:${contactInfo?.phone?.replace(/\s+/g, '') || '02329992929'}`} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {contactInfo?.phone || '0232 999 29 29'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href={`mailto:${contactInfo?.email || 'info@kefder.org'}`} className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  {contactInfo?.email || 'info@kefder.org'}
                </a>
              </li>
              {contactInfo?.workingHours && (
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">
                    {contactInfo.workingHours[currentLang] || contactInfo.workingHours.tr}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 KEFDER. {mounted ? t('footer.rights') : 'Tüm hakları saklıdır.'}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-orange-400 transition-colors">
                {mounted ? t('footer.privacy') : 'Gizlilik Politikası'}
              </a>
              <span>|</span>
              <a href="/terms" className="hover:text-orange-400 transition-colors">
                {mounted ? t('footer.terms') : 'Kullanım Koşulları'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Button - Bottom Left */}
      <button
        onClick={onAdminClick}
        className="fixed bottom-4 left-4 w-10 h-10 bg-gray-800 hover:bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-40"
        title="Admin Panel"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </footer>
  )
}
