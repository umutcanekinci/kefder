import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Globe, Facebook, Instagram, ChevronDown, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const getNavItems = (t: (key: string) => string) => [
  { label: t('nav.home'), href: '/' },
  { label: t('nav.about'), href: '/about', hasDropdown: true },
  { label: t('nav.activities'), href: '/activities', hasDropdown: true },
  { label: t('nav.news'), href: '/haberler' },
  { label: t('nav.membership'), href: '/volunteer' },
  { label: t('nav.contact'), href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const navItems = getNavItems(t)

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FDF6F0]/95 backdrop-blur-sm border-b border-orange-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="KEFDER Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-gray-800 leading-tight">KEFDER</h1>
              <p className="text-[10px] lg:text-xs text-gray-500 leading-tight">
                {language === 'tr'
                  ? 'Kültürel Etkileşim ve Farkındalık Derneği'
                  : 'Cultural Interaction and Awareness Association'}
              </p>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                    isActive
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                  }`
                }
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors border border-gray-200 rounded-lg hover:border-orange-200"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'tr' ? 'EN' : 'TR'}</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              <a
                href="https://www.facebook.com/share/18A2bMLZXm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/kefder_org_ciaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-orange-100">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-4">
              <a
                href="https://www.facebook.com/share/18A2bMLZXm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/kefder_org_ciaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
