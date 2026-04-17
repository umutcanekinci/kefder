import { MapPin, Phone, Mail, Facebook, Instagram, MoreVertical } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface FooterProps {
  onAdminClick: () => void
}

export default function Footer({ onAdminClick }: FooterProps) {
  const { t, language } = useLanguage()

  const quickLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.activities'), href: '/activities' },
    { label: t('footer.events'), href: '/events' },
  ]

  const exploreLinks = [
    { label: t('footer.volunteer'), href: '/volunteer' },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('footer.press'), href: '/press' },
    { label: t('footer.faq'), href: '/faq' },
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
                  {language === 'tr' ? 'Kültürel Etkileşim ve Farkındalık Derneği' : 'Cultural Interaction and Awareness Association'}
                </p>
              </div>
            </a>
            <p className="text-sm text-gray-400 leading-relaxed">
              {language === 'tr' 
                ? '2012 yılından beri İzmir\'de kültürel etkileşim ve farkındalık oluşturmak için çalışıyoruz.'
                : 'Since 2012, we have been working to create cultural interaction and awareness in Izmir.'}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/18A2bMLZXm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-lg transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/kefder_org_ciaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-lg transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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
            <h3 className="text-base font-semibold text-white mb-4">{t('footer.explore')}</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
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
            <h3 className="text-base font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:02329992929" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  0232 999 29 29
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@kefder.org" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">
                  info@kefder.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 KEFDER. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <a href="/privacy" className="hover:text-orange-400 transition-colors">
                {t('footer.privacy')}
              </a>
              <span>|</span>
              <a href="/terms" className="hover:text-orange-400 transition-colors">
                {t('footer.terms')}
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
