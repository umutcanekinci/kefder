"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaFacebook as Facebook, FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa';
import { Globe, ChevronDown, Menu, X, CalendarDays } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const getNavItems = (t: (key: string) => string) => [
  { label: t('nav.home'), href: '/' },
  { 
    label: t('nav.about'), 
    href: '/about', 
    dropdown: [
      { label: t('nav.about.mission'), href: '/about#mission' },
      { label: t('nav.about.team'), href: '/about#team' },
      { label: t('nav.about.reports'), href: '/about#reports' },
      { label: t('nav.about.rules'), href: '/about#rules' },
      { label: t('nav.about.networks'), href: '/about#networks' },
    ]
  },
  { 
    label: t('nav.activities'), 
    href: '/activities', 
    dropdown: [
      { label: t('nav.activities.calendar'), href: '/activities#calendar' },
      { label: t('nav.activities.past'), href: '/activities#past' },
      { label: t('nav.activities.archive'), href: '/activities#archive' },
      { label: t('nav.activities.gallery'), href: '/activities#gallery' },
    ]
  },
  { label: t('nav.news'), href: '/haberler' },
  { label: t('nav.membership'), href: '/volunteer' },
  { label: t('nav.contact'), href: '/contact' },
]

export default function Header({ settings }: { settings?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  const navItems = getNavItems(t)
  const { socialLinks } = settings || {}

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="KEFDER Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-[#333333] leading-tight">KEFDER</h1>
              <p className="text-[10px] lg:text-xs text-gray-500 leading-tight">
                {language === 'tr'
                  ? 'Kültürel Etkileşim ve Farkındalık Derneği'
                  : 'Cultural Interaction and Awareness Association'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-full">
            {navItems.map((item) => (
              <div key={item.label} className="relative group h-full flex items-center">
                <Link
                  href={item.href}
                  className={"px-3 xl:px-4 h-full flex items-center gap-1 text-sm font-medium transition-colors " + (pathname === item.href ? 'text-primary' : 'text-[#333333] hover:text-primary')}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 z-50 cursor-default">
                    <div className={"bg-white shadow-xl rounded-xl border border-gray-100 p-2 flex gap-4 " + (item.label === t('nav.activities') ? 'w-[450px] p-4' : 'w-56')}>
                      <div className="flex-1 flex flex-col gap-1">
                        {item.dropdown.map(subItem => (
                          <Link key={subItem.label} href={subItem.href} className="px-3 py-2 text-sm text-[#333333] hover:text-primary hover:bg-orange-50 rounded-md transition-colors block">
                            {subItem.label}
                          </Link>
                        ))}
                      </div>

                      {/* Graphic component for Activities mega-menu */}
                      {item.label === t('nav.activities') && (
                        <div className="w-[180px] bg-orange-50/50 rounded-lg p-3 flex flex-col items-center text-center border border-orange-100">
                          <div className="w-full h-24 mb-3 relative rounded-md overflow-hidden bg-white flex items-center justify-center">
                            <img src="/images/asset_1.jpg" alt="Calendar Graphic" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
                            <CalendarDays className="relative z-10 w-8 h-8 text-primary drop-shadow-md" />
                          </div>
                          <span className="text-xs font-semibold text-[#333333]">Bu ayki etkinliklerimizi kaçırmayın!</span>
                          <Link href="/activities#calendar" className="mt-3 text-[11px] font-medium bg-primary text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition-colors w-full">Takvime Git</Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#333333] hover:text-primary transition-colors border border-gray-200 rounded-full hover:border-orange-200 bg-white"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'tr' ? 'English' : 'Türkçe'}</span>
            </button>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-1">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-orange-50 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                  className={"flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all " + (pathname === item.href ? 'text-primary bg-orange-50' : 'text-[#333333] hover:text-primary hover:bg-orange-50/50')}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </Link>
                
                {/* Mobile Dropdown Subitems */}
                {item.dropdown && (
                  <div className="pl-6 pr-4 py-2 flex flex-col gap-1 border-l-2 border-orange-100 ml-6 mt-1">
                    {item.dropdown.map(subItem => (
                      <Link 
                        key={subItem.label} 
                        href={subItem.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-2 text-sm text-gray-500 hover:text-primary"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center justify-center gap-4 pt-6 pb-2 border-t border-gray-100 mt-4">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-orange-50 rounded-full transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
